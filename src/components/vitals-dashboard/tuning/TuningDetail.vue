<template>
  <div>
    <div class="container tuning-fix" style="width: 70%" v-if="metricDetail">
      <div style="font-weight: 200; font-size: 2.25rem; margin-top: 20px; height: 175px; display: block;" class="publisher-header">
        {{ metricDetail.name }}
        <button class="btn" v-on:click="metricDetail = null">Back to All Metrics</button>
      </div>
      <div class="row">
        <bootstrap-table
          :tableFields="vitalsTables[metricDetail.id]"
          :tableRows="results[metricDetail.id]"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
      <div class="row" style="height: 200px;">
        <div class="section-header">
          Show missing URLs here
        </div>
      </div>
      <div class="row" style="height: 200px">
        <div class="section-header">
          Show instructions to fix here
        </div>
      </div>
    </div>
    <div class="blah" v-if="!metricDetail && tuningData">
      <div class="container" style="width: 70%">
        <div style="font-weight: 200; font-size: 2.25rem; margin-top: 20px; height: 175px; display: block;" class="publisher-header" v-if="flagCount <= 1">
          You're all tuned up <br>
          All data is being collected properly from your site!
        </div>
        <div style="font-weight: 200; font-size: 2.25rem; margin-top: 20px; height: 175px; display: block; width: 75%" class="publisher-header" v-if="flagCount > 1">
          Tuning required! <br>
          There are items requiring your attention below - your integration may not be set up properly
        </div>
        <div class="container vitals-container" style="width: 100%">
          <div class="section-header">
            Missing fields
          </div>
          <div class="row">
            <div class="card" style="width: 40%; cursor: pointer; display: inline-block; margin-right: 75px;"v-for="pf in pageFields" v-if="checkFlag(pf).text=='Bad'">
              <div class="card-body" style="padding: 20px; min-height: 150px;" v-on:click="showFix(pf)">
                <div class="icon">
                  <i :class="checkIcon('glyphicon', pf.icon)" aria-hidden="true"></i>
                </div>
                <div class="subheader">
                  {{ pf.name }}
                  <div :class="iconClass(pf)">
                    <i :class="statusIcon('glyphicon', pf)" aria-hidden="true"></i>
                  </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted" style="top: 30px; left: 230px; position: relative;">{{ checkFlag(pf).percentMissing }}% missing</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="container vitals-container" style="width: 100%">
          <div class="section-header">
            OK fields
          </div>
          <div class="row">
            <div class="card" style="width: 40%; cursor: pointer; display: inline-block; margin-right: 75px;" v-for="pf in pageFields" v-if="checkFlag(pf).text=='Good'">
              <div class="card-body" style="padding: 20px; min-height: 150px;">
                <div class="icon">
                  <i :class="checkIcon('glyphicon', pf.icon)" aria-hidden="true"></i>
                </div>
                <div class="subheader">
                  {{ pf.name }}
                  <div :class="iconClass(pf)">
                    <i :class="statusIcon('glyphicon', pf)" aria-hidden="true"></i>
                  </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted" style="top: 30px; left: 230px; position: relative;">{{ checkFlag(pf).percentMissing }}% missing</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!tuningData" style="margin: 50px 500px">
      <div class="row">
        <span style="display: inline-block; font-size: 18px; margin-right: 45px;">Loading...</span>
        <scaling-squares-spinner
          :animation-duration="1250"
          :size="200"
          :color="'#1C2544'"
        />
      </div>
    </div>
  </div>

</template>

<script>
import { bToggle, bCard, bCardHeader, bCardBody } from 'bootstrap-vue'
import {ScalingSquaresSpinner} from 'epic-spinners'
import BootstrapTable from '../../tables/BootstrapTable.vue'

export default {
  name: 'Home',
  directives: {
    bToggle
  },
  components: {
    bCard,
    bCardHeader,
    bCardBody,
    ScalingSquaresSpinner,
    BootstrapTable
  },
  data () {
    return {
      fields: ['contentSection', 'tags', 'contentCreated', 'contentAuthor'],
      rawData: null,
      headers: null,
      results: null,
      flags: {},
      dateRange: {},
      pageFields: [
        {id: 'contentSection', name: 'Content Section', status: 'bad', pid: 'contentSection', icon: 'object-align-bottom'},
        {id: 'tags', name: 'Tags', status: 'bad', pid: 'tags', icon: 'tags'},
        {id: 'contentAuthor', name: 'Content Author', status: 'bad', pid: 'contentAuthor', icon: 'pencil'},
        {id: 'contentCreated', name: 'Content Created Date', status: 'bad', pid: 'contentCreated', icon: 'calendar'},
        {id: 'adblockerStatus', name: 'Adblocker Status', status: 'bad', pid: 'adblockerStatus', icon: 'remove-circle'},
        {id: 'zone', name: 'Zone', status: 'bad', pid: 'zone', icon: 'modal-window'}
      ],
      selected: null,
      flagCount: 0,
      flagged: false,
      metricDetail: false,
      text: `
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
        richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
        brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
        tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
        wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
        vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
        synth nesciunt you probably haven't heard of them accusamus labore VHS.
      `
    }
  },
  props: ['userCount', 'loggedIn', 'adblock', 'currentViews'],
  mounted () {
  },
  computed: {
    vitalsTables () {
      return this.$store.getters.vitalsTables
    },
    currentPublisher () {
      return this.$store.getters.currentPublisher
    },
    tuningData () {
      let g = this.$store.getters.tuningData
      if (g) {
        return this.parseData(this.$store.getters.tuningData)
      } else {
        return null
      }
    }
  },
  methods: {
    checkIcon (tset, icon) {
      return tset + ' ' + tset + '-' + icon + ' ' + 'lg'
    },
    iconClass (pf) {
      let flag = this.checkFlag(pf)
      let cg = ''
      if (flag.text === 'Bad') {
        cg = 'bad-icon'
      } else {
        cg = 'good-icon'
      }
      return cg
    },
    statusIcon (tset, pf) {
      console.log(pf)
      let flag = this.checkFlag(pf)
      let cg = ''
      console.log(flag)
      if (flag.text === 'Bad') {
        cg = 'remove'
      } else {
        cg = 'ok'
      }
      return tset + ' ' + tset + '-' + cg + ' ' + 'lg'
    },
    parseData (e) {
      console.log(e)
      let evt = e.tuningData
//        console.log(evt)
      this.rawData = {}
      this.headers = {}
      this.results = {}
      this.client = e.client
      var numFields = ['Nbr_Pageviews', 'Nbr_Users', 'NbrSessions', 'rel_percent']
      evt.forEach(d => {
        this.headers[d.key] = d.headers.map(m => {
          let y = {}
          y.label = m
          y.field = m
          y.id = m
          if ((numFields.indexOf(m) > -1)) {
            y.type = 'numeric'
          } else {
            y.type = 'string'
          }
          y.filterable = false
          return y
        })
        this.rawData[d.key] = d.data
        this.results[d.key] = d.data
        if (d.flag) {
          this.flags[d.key] = d.flag
          console.log(this.flags)
          if (d.flag.type === 'Bad' && !this.flagged) {
            this.flagCount += 1
          }
        }
        this.dateRange.startDate = d.startDate
        this.dateRange.endDate = d.endDate
      })
      this.flagged = true
      return e
    },
    checkFlag (c) {
      let ob = {
        style: this.flags[c.id].type,
        text: this.flags[c.id].type,
        percentMissing: this.flags[c.id].value
      }
      if (this.selected) {
        if (this.selected.id === c.id) {
          ob.selected = 'card flag selected'
        }
      }
      if (!ob.selected) {
        ob.selected = 'card flag'
      }
      if (this.flags[c.id].value === 0) {
        ob.text = 'None missing'
      }
      return ob
    },
    showFix (d) {
      this.metricDetail = d
    },
    toggle: function (index) {
      this.faqs[index].isCollapsed = !this.faqs[index].isCollapsed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
  margin-bottom: 50px;
}
.hello {
  width: 90%;
  text-align: left;
}

.report-btn {
  margin-left: 30%;
}

.report-header {
  font-size: 36px;
  margin-left: 15%;
  margin-bottom: 80px;
  display: block;
}
.section-header {
  font-weight: 400;
  font-size: 1.75rem;
  text-align: left;
  display: block;
  padding-bottom: 35px;
  padding-top: 5px;
}


h1, h2 {
  font-weight: normal;
}
span {
  margin: 25px;
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

.Bad {
  font-weight: bold;
  color: tomato;
  background-color: rgba(255, 99, 71, 0.15);
}

.Good {
  color: green;
  /*background-color: rgba(0, 255, 0, 0.15);*/
}

.flag {
  cursor: pointer;
  height: 35px;
  font-size: 18px;
}

.selected {
  border-bottom: 1px solid black;
}

.ui-icons {
    @import "../../../sass/icons-styles";
    .widget-body {
      padding: 1.9375rem 2.6875rem 1.9375rem 2.125rem;
    }
  }

.subheader {
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 5px;
    text-align: center;
  }

.lg {
  font-size: 40px;
  position: relative;
  top: 35px;
}

.good-icon {
  position: absolute;
  top: 25px;
  right: 50px;
  color: green;
}

.bad-icon {
  position: absolute;
  top: 25px;
  right: 50px;
  color: tomato;
}

.vitals-container {
  background-color: white;
  margin-bottom: 30px;
  margin-top: 30px;
}

</style>
