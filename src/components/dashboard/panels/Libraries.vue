<template>
  <div class="container traffic-container">
    <div class="section-header">
      Libraries
    </div>
    <div class="row" style="margin-top: 20px; min-height: 500px;">
      <div class="col-3" v-for="library in libraries">
        <div class="card" style="height: 150px; min-width: 180px; display: inline-block; margin-top: 20px;">
          <div class="card-body" >
            <div class="subheader" style="margin-bottom: 10px">
              Views by minute, past hour
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard',
    components: {
//      line_chart: LineChart,
//      time_heatmap: TimeHeatmap
    },
    data () {
      return {
        libraries: ['Conversions', 'Adblocking', 'Temporal Rythym', 'Another One']
      }
    },
    computed: {
      ...mapGetters({
        'colors': 'colors'
      })
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
