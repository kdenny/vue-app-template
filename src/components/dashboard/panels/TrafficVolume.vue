<template>
  <div class="container traffic-container">
    <div class="section-header">
      Traffic Volume
    </div>
    <div class="row" style="margin-top: 20px">
      <div class="col-6">
        <div class="card" style="width: 540px; height: 400px;">
          <div class="card-body">
            <div class="subheader" style="margin-bottom: 10px">
              Views by minute, past hour
            </div>
            <line_chart></line_chart>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card" style="width: 540px; height: 400px;">
          <div class="card-body">
            <div class="subheader" style="margin-bottom: 10px; cursor: pointer;" v-on:click="loadTimeData()">
              Day/Time Heatmap
            </div>
            <time_heatmap v-if="temporalData" :sizing="heatmap" :hourNow="hourNow.id" :dayNow="dayNow.id" :data="temporalData" :current="averageHourPageviews"></time_heatmap>
            <span style="display: block; position: relative; left: 40px;">Typical traffic for <strong>{{ dayNow.name }}</strong> at <strong>{{ hourNow.name }}</strong>: Moderately Busy</span>
            <span style="display: block; position: relative; left: 40px;">Right Now: {{ averageHourPageviews.delta }}% {{ averageHourPageviews.direction }} than average</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LineChart from './viz/LineChart.vue'
  import TimeHeatmap from './viz/TimeHeatmap.vue'
  import * as d3 from 'd3'

  export default {
    name: 'dashboard',
    components: {
      line_chart: LineChart,
      time_heatmap: TimeHeatmap
    },
    data () {
      return {
        showLive: true,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }
    },
    watch: {
      currentPublisher () {
        console.log('Publisher changed')
        this.loadTimeData()
      }
    },
    computed: {
      ...mapGetters({
        'colors': 'colors',
        'contentSections': 'topContentSections',
        'topArticles': 'topArticles',
        'topAuthors': 'topAuthors',
        'topCountries': 'topCountries',
        'topCities': 'topCities',
        'tuningData': 'tuningData',
        'topReferrers': 'topReferrers',
        'topReferrerSegments': 'topReferrerSegments',
        'viewCount': 'pageviewCount',
        'currentPublisher': 'currentPublisher',
        'pageviewsHour': 'pageviewsArray',
        'currentTimeframe': 'currentTimeframe',
        'isLoaded': 'isLoaded',
        'isSwitching': 'isSwitching',
        'temporalData': 'dashboardData',
        'dashboardTables': 'dashboardTables',
        'scaleChart': 'scaleChart',
        'heatmap': 'heatmap'
      }),
      hourNow () {
        let hobj = {}
        const getHour = d3.timeFormat('%I')
        const getPM = d3.timeFormat('%p')
        hobj.id = Number(getHour(new Date()))
        if (getPM(new Date()) === 'PM') {
          hobj.id += 12
          hobj.name = (hobj.id - 12) + ' PM'
        } else {
          hobj.name = hobj.id + ' AM'
        }
        return hobj
      },
      dayNow () {
        let j = new Date().getDay()
        let dobj = {
          name: this.days[j]
        }
        if (j > 0) {
          dobj.id = j
        } else {
          dobj.id = 7
        }
        return dobj
      },
      averageHourPageviews () {
        let ah = null
        this.temporalData.dashboardData[0].data.forEach(d => {
          if (d.hour === this.hourNow.id && d.day === this.dayNow.id) {
            ah = d
          }
        })
        let delta = Math.floor((this.viewCount - ah.pageviews) / ah.pageviews * 100) / 10
        if (delta < 0) {
          ah.direction = 'lower'
          ah.delta = delta * -1
        } else {
          ah.direction = 'higher'
          ah.delta = delta
        }
        return ah
      }
    },
    mounted () {
//      this.$store.dispatch('switchApp', {
//        app: 'pageviews'
//      })
//      this.loadReport()
//      this.loadDashboardData()
    },
    methods: {
//      ...mapActions([
//        'closeMenu',
//        'toggleSidebar',
//        'isToggleWithoutAnimation',
//        'loadTuningData',
//        'loadDashboardData'
//      ]),
      navTo (loc) {
        this.$router.push({ path: loc })
      },
      parseAverageHour (data, pageviews, hour, day) {
        let ah = null
        data.forEach(d => {
          if (d.hour === hour && d.day === day) {
            ah = d
          }
        })
        let delta = Math.floor((pageviews - ah.pageviews) / ah.pageviews * 100) / 10
        if (delta < 0) {
          ah.direction = 'lower'
          ah.delta = delta * -1
        } else {
          ah.direction = 'higher'
          ah.delta = delta
        }
        return ah
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  h3 {
    text-align: center;
  }
  .section-header {
    font-weight: 400;
    font-size: 1.75rem;
    text-align: center;
    display: block;
  }
  .subheader {
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 5px;
    text-align: center;
  }
  .content-analytics {
    margin-top: 15px;
    margin-left: 0;
    width: 92%;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    border: 1px solid black;
  }
  .geography-container {
    margin-top: 15px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    border: 1px solid black;
  }

  .device-container {
    margin-top: 10px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    border: 1px solid black;
  }

  .traffic-container {
    margin-left: 0;
    width: 92%;
    background-color: rgba(255, 255, 255, 0.6);
    border: 1px solid black;
  }

  .switcher-link {
    color: $piano-navy!important;
    cursor: pointer!important;
  }
</style>
