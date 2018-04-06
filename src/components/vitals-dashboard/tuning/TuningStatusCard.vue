<template>
  <div>
    <div class="card" style="display: inline-block; position: absolute; right: 150px; margin-top: -60px; width: 375px; cursor: pointer;" v-if="status=='good'" v-on:click="showDetail()">
      <div class="card-body" style="padding: 20px; background-color: rgba(0, 255, 0, 0.15);">
        <h4>Tuning Status: Good</h4>
        <h6 class="card-subtitle mb-2 text-muted">No issues identified at this time!</h6>
      </div>
    </div>
    <div class="card" style="display: inline-block; position: absolute; right: 150px; margin-top: -60px; width: 375px; cursor: pointer;" v-if="status=='none'" v-on:click="loadVitals()">
      <div class="card-body" style="padding: 20px; background-color: lightgray;">
        <h4>Tuning Status Unknown</h4>
        <h6 class="card-subtitle mb-2 text-muted">Click to check status of Piano integration</h6>
      </div>
    </div>
    <div class="card" style="display: inline-block; position: absolute; right: 150px; margin-top: -60px; width: 375px; cursor: pointer;" v-if="status=='loading'" v-on:click="loadVitals()">
      <div class="card-body" style="padding: 20px; background-color: lightgray;">
        <h4>Loading tuning data... </h4>
      </div>
    </div>
    <div class="card" style="display: inline-block; position: absolute; right: 150px; margin-top: -60px; width: 375px; cursor: pointer;" v-if="status=='bad'" v-on:click="showDetail()">
      <div class="card-body" style="padding: 20px; background-color: rgba(255, 0, 0, 0.15);">
        <h4>Tuning Status: Attention Required</h4>
        <h6 class="card-subtitle mb-2 text-muted">2 issues identified with your Piano integration. <br><br></h6>
        <button class="btn btn-clear btn-sm" style="display: inline-block"><router-link to="tuning-detail">Click here for more</router-link></button>
      </div>
    </div>

  </div>

</template>

<script>
import router from '../../../router/index'
export default {
  name: 'TuningStatus',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    status () {
      if (this.vitalsData) {
        return 'good'
      } else {
        if (!this.loading) {
          return 'none'
        } else {
          return 'loading'
        }
      }
    }
  },
  props: ['vitalsData'],
  mounted () {
//      this.parseData()
  },
  methods: {
    showDetail () {
      router.push({name: 'TuningDetail'})
      console.log(this.status)
    },
    loadVitals () {
      this.loading = true
      this.$emit('submit')
    }
//      parseData () {
//        console.log(this.rawData)
//        this.rawData.forEach(d => {
//          this.totalPageviews += d.pageviews
//          this.uniqueUsers += d.users
//
//          // sum pageviews for date
//          if (this.pageviewTransform.date[d.date]) {
//            this.pageviewTransform.date[d.date].count += d.pageviews
//          } else {
//            this.pageviewTransform.date[d.date] = {
//              count: d.pageviews,
//              adblockDisabled: 0,
//              registered: 0
//            }
//          }
//
//          // sum pageviews for resource
//    //        if (this.resourceViews[d.accessedResources]) {
//    //          this.resourceViews[d.accessedResources].views += d.pageviews
//    //          this.resourceViews[d.accessedResources].users += d.users
//    //        } else {
//    //          this.resourceViews[d.accessedResources] = {
//    //            views: d.pageviews,
//    //            users: d.users
//    //          }
//    //        }
//
//          // sum pageviews for device
//          if (this.pageviewTransform.device[d.platform]) {
//            this.pageviewTransform.device[d.platform].views += d.pageviews
//            this.pageviewTransform.device[d.platform].users += d.users
//          } else {
//            this.pageviewTransform.device[d.platform] = {
//              views: d.pageviews,
//              users: d.users
//            }
//          }
//
//          // sum pageviews for adblock and logged in
//          if (d.adblock === 'disabled') {
//            this.parsedData.adblockDisabled.count += d.pageviews
//            this.pageviewTransform.date[d.date].adblockDisabled += d.pageviews
//          }
//          if (d.loggedIn === 'True') {
//            this.parsedData.registered.count += d.pageviews
//            this.pageviewTransform.date[d.date].registered += d.pageviews
//          }
//        })
//        this.userCount.forEach(d => {
//          this.activeUsers += d.users
//          if (d.newsletter === 1) {
//            this.parsedData.newsletter.count += d.pageviews
//          }
//        })
//        this.parsedData.adblockDisabled.percent = Math.floor((this.parsedData.adblockDisabled.count / this.totalPageviews) * 10000) / 100
//        this.parsedData.registered.percent = Math.floor((this.parsedData.registered.count / this.totalPageviews) * 10000) / 100
//        this.parsedData.newsletter.percent = Math.floor((this.parsedData.newsletter.count / this.uniqueUsers) * 10000) / 100
//
//        this.lineChartData = []
//        for (var property in this.pageviewTransform.date) {
//          if (this.pageviewTransform.date.hasOwnProperty(property)) {
//            let l = this.pageviewTransform.date[property]
//            l.date = property
//            this.lineChartData.push(l)
//          }
//        }
//
//        this.devicePageviews = []
//        for (var p2 in this.pageviewTransform.device) {
//          if (this.pageviewTransform.device.hasOwnProperty(p2)) {
//            let l = this.pageviewTransform.device[p2]
//            if (p2 !== 'other' && p2 !== 'dmr') {
//              l.device = p2
//              this.devicePageviews.push(l)
//            }
//          }
//        }
//      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
