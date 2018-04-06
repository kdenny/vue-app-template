<template>
  <div class="dashboard">
    <div v-if="loaded">
      <div style="font-weight: 200; font-size: 2.25rem; margin-top: 20px; height: 100px; display: inline-block;" class="publisher-header">
        Piano Scale CMS
        <!--<tuning_status_card :vitalsData="tuningData" v-on:submit="loadReport"></tuning_status_card>-->
      </div>
      <dashboard-info-widgets v-if="!isSwitching" :current="averageHourPageviews"></dashboard-info-widgets>
      <div class="row" v-if="!isSwitching">
        <div class="col-9">
          <libraries></libraries>
          <tags></tags>
          <!--<content_analytics></content_analytics>-->
        </div>
        <div class="col-3">
          <metric_status></metric_status>
          <!--<device_panel></device_panel>-->
          <metric_views></metric_views>
          <charts></charts>
        </div>
      </div>
    </div>
    <div v-if="!loaded" style="margin: 50px 500px">
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
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import { mapActions, mapGetters } from 'vuex'
  import TuningStatusCard from '../vitals-dashboard/tuning/TuningStatusCard.vue'
  import {ScalingSquaresSpinner} from 'epic-spinners'
  import BootstrapTable from '../tables/BootstrapTable.vue'
  import * as d3 from 'd3'
  import Libraries from './panels/Libraries.vue'
  import Tags from './panels/Tags.vue'
  import MetricStatus from './panels/MetricStatus.vue'
  import MetricViews from './panels/MetricViews.vue'
  import Charts from './panels/Charts.vue'

  export default {
    name: 'dashboard',
    components: {
      DashboardInfoWidgets,
      tuning_status_card: TuningStatusCard,
      ScalingSquaresSpinner,
      BootstrapTable,
      libraries: Libraries,
      tags: Tags,
      metric_status: MetricStatus,
      metric_views: MetricViews,
      charts: Charts
    },
    data () {
      return {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        loaded: true
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
      }
//      averageHourPageviews () {
//        let ah = null
//        this.temporalData.dashboardData[0].data.forEach(d => {
//          if (d.hour === this.hourNow.id && d.day === this.dayNow.id) {
//            ah = d
//          }
//        })
//        let delta = Math.floor((this.viewCount - ah.pageviews) / ah.pageviews * 100) / 10
//        if (delta < 0) {
//          ah.direction = 'lower'
//          ah.delta = delta * -1
//        } else {
//          ah.direction = 'higher'
//          ah.delta = delta
//        }
//        return ah
//      }
    },
    mounted () {
      this.$store.dispatch('switchApp', {
        app: 'pageviews'
      })
      this.loadReport()
      this.loadDashboardData()
    },
    methods: {
      ...mapActions([
        'closeMenu',
        'toggleSidebar',
        'isToggleWithoutAnimation',
        'loadTuningData',
        'loadDashboardData'
      ]),
      selectPub (pub) {
        this.$store.dispatch('switchClient', {
          client: pub
        })
      },
      switchComposer: function () {
        this.$store.dispatch('switchApp', {
          app: 'composer'
        })
      },
      switchClient: function () {
        this.$store.dispatch('switchClient', {
          client: 'mq4ucQHSOB'
        })
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
      },
      switchTimeframe: function () {
        if (this.currentTimeframe.id === 'hour') {
          this.$store.dispatch('switchTimeframe', {
            timeframe: {name: 'Past month', id: 'month'}
          })
        } else {
          this.$store.dispatch('switchTimeframe', {
            timeframe: {name: 'Past hour', id: 'hour'}
          })
        }
      },
      loadReport () {
        this.loadTuningData()
      },
      loadTimeData () {
        this.loadDashboardData()
      },
      navTo (loc) {
        this.$router.push({ path: loc })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
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
