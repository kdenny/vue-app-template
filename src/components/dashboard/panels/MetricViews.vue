<template>
  <div class="container device-container" v-on:click="navTo('pageviews/user-agent')">
    <div class="section-header">
      12 views created for 4 metrics
      <button class="btn btn-primary btn-small" style="margin-left: 15px">Add New +</button>
    </div>
    <div class="row" style="height: 200px; margin-top: 40px;">
      <div class="col-4">
        <span style-="display: inline-block">Complete Metrics</span>
        <span style-="display: inline-block">2</span>
      </div>
      <div class="col-4">
        <span style-="display: inline-block">Pending Metrics</span>
        <span style-="display: inline-block">2</span>
      </div>
      <div class="col-4">
        <span style-="display: inline-block">Incomplete Metrics</span>
        <span style-="display: inline-block">2</span>
      </div>
    </div>
    <!--<scale_chart :width="scaleChart.width" :height="scaleChart.height" :margin="scaleChart.margins" :chartData="deviceData" :dataType="'realtime'"></scale_chart>-->
    <!--<bootstrap-table-->
      <!--style="width: 65%; margin-top: -30px; margin-bottom: 40px; margin-left: 15%;"-->
      <!--:tableFields="dashboardTables.device"-->
      <!--:tableRows="deviceData"-->
    <!--&gt;</bootstrap-table>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
//  import ScaleChart from './viz/ScaleChart.vue'
  import BootstrapTable from '../../tables/BootstrapTable.vue'

  export default {
    name: 'device-panel',
    components: {
//      scale_chart: ScaleChart,
      BootstrapTable
    },
    computed: {
      ...mapGetters({
        'dashboardTables': 'dashboardTables',
        'scaleChart': 'scaleChart',
        'colors': 'colors'
      }),
      deviceData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        let newl = []
        if (l) {
          l['userAgent.platform'].map(cs => {
            cs.color = this.colors[co]
            co++
            if (cs.rel_percent > 1) {
              newl.push(cs)
            }
            return cs
          })
          return newl
        } else {
          return null
        }
      }
    },
    mounted () {
    },
    methods: {
      navTo (loc) {
        this.$router.push({ path: loc })
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
