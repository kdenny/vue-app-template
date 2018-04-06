<template>
  <div class="hello" v-if="">
    <h3>Content Analytics - Interactive Dashboard</h3>
    <!--{{ contentData }}-->
    <div class="span"> {{ universeSize }} out of {{ formattedData.length }} records selected</div>
    <div class="container" style="width: 100%; background-color: white">
      <div class="row" style="margin-top: 25px">
        <!--<button class="btn" v-on:click="showData()" v-if="contentData">Click to show data</button>-->
        <div v-if="!rawTree" class="col-md-7" style="height: 650px">
          <div class="section-header">
            Content Sections
          </div>
        </div>
        <div v-if="rawTree" class="col-md-7">
          <div class="section-header">
            Content Sections
          </div>
          <tree-map :treeData="rawTree" v-on:cellClicked="cellClicked"></tree-map>
        </div>
        <div v-if="bdata" class="col-md-5">
          <div class="section-header">
            Content Age (By Month)
          </div>
          <bar_chart :width="width" :height="height" :margin="margin2"
                     :xVar="xVar" :yVar="yVar"
                     :apiLoc="apiLoc" :chartData="bdata"
                     v-on:barClicked="barClicked"
                     :selectedBar="selectedBar"
                     style="display: block; position: absolute; background-color: wheat; z-index: 2; margin-top: 75px; margin-left: 75px;"/>
        </div>
      </div>
      <div class="row" v-if="tableData">
        <div class="section-header">
          Top URLs
        </div>
        <div class="col-4">

        </div>
        <div class="col-8">
          <bootstrap_table
            :tableFields="tableHeaders"
            :tableRows="tableData"
          ></bootstrap_table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import * as d3 from 'd3'
  import * as universe from 'universe'
  import * as moment from 'moment'

  import TreeMap from './TreeMap.vue'
  import BarChart from './bar.vue'
  import BootstrapTable from './BootstrapTable.vue'
  import * as fileData from './out.js'
  import { mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  components: {
    TreeMap,
    bar_chart: BarChart,
    bootstrap_table: BootstrapTable
  },
  computed: {
    contentData () {
      if (this.$store.getters.contentData) {
        return this.$store.getters.contentData.contentData[0].data
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tdata: {},
      width: 450,
      height: 400,
      margin: {top: 50, right: 10, bottom: 100, left: 0},
      margin2: {top: 50, right: 10, bottom: 100, left: 80},
      xVar: "key",
      yVar: "pageviews",
      apiLoc: "http://nimbuscharts.pythonanywhere.com/sheets/1fVQ13aXacNsHOSIL85Jv1LTT9p3bao2kFh1mCEmsdPU/API_data/",
      chartData: null,
      treeData: {},
      bdata: null,
      rawTree: null,
      myUniverse: null,
      barQuery: null,
      selectedBar: null,
      tableHeaders: null,
      formattedData: [],
      tableData: null,
      uData: fileData.contentData,
      universeSize: null
    }
  },
  mounted () {
    this.loadReportData()
    var me = this;
    console.log(this.uData)
    let rawData = this.uData
    console.log(rawData)
    console.log(this.contentData)
    let index = 0
    this.formattedData = rawData.data.data.map(f => {
      f.pageviews = f['# of Pageviews']
      f.createdDate = me.parseDate(f.contentCreated)
      f.sessions = f['Unique Sessions']
      f.browsers = f['Unique Browsers']
      return f
    })
    const generatedColumns = {
      day: d => d3.timeFormat('%A')(d.createdDate),
      monthsAgo: d => this.monthsAgo(d.contentCreated)
    }
//    this.formattedData = this.contentData.map(f => {
//      console.log(f)
//      f.pageviews = f.pageviews
//      f.createdDate = me.parseDate(f.createdDate)
//      f.viewDate = me.parseDate(f.date)
//      f.author = f.contentAuthor
//      return f
//    })
    universe(this.formattedData, {
      generatedColumns: generatedColumns
    })
      .then(function(myUniverse){

        myUniverse.onFilter(me.pandemonium, 100);

        myUniverse.query({
          groupBy: 'contentSection',
          select: {
            $count: true, // Count the number of records
            sumPageviews: { // Create a custom 'quantity' column
              $sum: 'pageviews' // Sum the quantity column
            }
          },
          filter: {
            pageviews: {
              $gt: 2500
            }
          },
          chart: 'tree',
          displayName: 'Content Section'
        })
        .then(function(res) {
          const g = res.data
          me.rawTree = g

        })

        myUniverse.query({ groupBy: 'monthsAgo',
          select: {
            $count: true, // Count the number of records
            sumPageviews: { // Create a custom 'quantity' column
              $sum: 'pageviews' // Sum the quantity column
            }
          },
          chart: 'bar',
          displayName: 'Content Age'
        })
          .then(function(res) {
            let h  = res.data
            me.bdata = h.map(u => {
              u.pageviews = u.value.sumPageviews.sum
              return u
            })
          })


        me.barQuery = myUniverse
        return myUniverse

      }).then(function(myUniverse) {
      myUniverse.column('createdDate')
        .then(function(universe) {
          var dim = myUniverse.column.find('createdDate').dimension
          let g = dim.top(100)
          me.tableData = g
          me.tableHeaders = ['url', 'pageviews', 'contentAuthor', 'contentSection', 'contentCreated']
          me.universeSize = myUniverse.cf.size()
        })
    })


//    })
  },
  methods: {
    ...mapActions([
      'loadContentData'
    ]),
    loadReportData() {
      this.loadContentData()
    },
    parseDate (d) {
      let y = new Date(d.substring(0, 4),
        d.substring(5, 7),
        d.substring(8, 10))
      return y;
    },
    monthsAgo(d) {
      let h = moment(d, "YYYY-MM-DD").fromNow().replace(" ago","").replace("a ", "1 ")
      let bin = null
      if (h.includes('year')) {
        let df = h.substring(0,2)
        if (df == 1) {
          bin = "1 yr"
        }
        if (df == 2) {
          bin = "2 yr"
        }
        if (df >= 3) {
          bin = "> 3 yr"
        }
      } else {
        let df = Number(h.substring(0,2))
        if (df == 1) {
          bin = "1 mo"
        } else if (df == 2) {
          bin = "2 mo"
        } else if (df >= 3 && df <= 6) {
          bin = "3-6 mo"
        } else if (df >= 7 && df <= 12) {
          bin = "6-12 mo"
        }
      }
      return bin
    },
    barClicked (bar) {
      console.log(bar)
      this.rawTree = null
      let g = this.barQuery.filter("monthsAgo", bar.key, true).then(res => {
        console.log(res)
        this.barQuery = res;
      })
//      console.log(g)
//      console.log(this.barQuery)
    },
    cellClicked (cell) {
      console.log(cell)
      this.bdata = null
      let g = this.barQuery.filter("contentSection", cell.id, true).then(res => {
        this.barQuery = res;
      })
    },
    pandemonium () {
//      this.bdata = null
      var me = this
      me.tableData = null
      this.barQuery.query({
        groupBy: 'contentSection',
        select: {
          $count: true, // Count the number of records
          sumPageviews: { // Create a custom 'quantity' column
            $sum: 'pageviews' // Sum the quantity column
          }
        },
//        filter: {
//          pageviews: {
//            $gt: 2500
//          }
//        },
        chart: 'tree',
        displayName: 'Content Section'
      })
        .then(function(res) {
          const g = res.data
          me.rawTree = g
        })

      this.barQuery.query({ groupBy: 'monthsAgo',
        select: {
          $count: true, // Count the number of records
          sumPageviews: { // Create a custom 'quantity' column
            $sum: 'pageviews' // Sum the quantity column
          }
        },
        chart: 'bar',
        displayName: 'Content Age'
      })
        .then(function(res) {
          let h  = res.data
          me.bdata = h.map(u => {
            u.pageviews = u.value.sumPageviews.sum
            return u
          })
          console.log(me.bdata)

          return res.universe
        }).then(function(myUniverse) {
          myUniverse.column('createdDate')
            .then(function(universe) {
              var dim = universe.column.find('createdDate').dimension
              me.tableData = dim.top(100)
              me.tableHeaders = ['url', 'pageviews', 'contentAuthor', 'contentSection', 'contentCreated']
              console.log(me.tableData)
              console.log(me.tableHeaders)
              me.universeSize = dim.top(Infinity).length
            })

      })
    },
    showData () {
      console.log(this.contentData)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section-header {
    font-weight: 400;
    font-size: 1.75rem;
    text-align: left;
    position: relative;
    left: 125px;
    display: block;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
