<template>
  <div class="container traffic-container">
    <div class="section-header">
      Tags
    </div>
    <div class="row" style="margin-top: 20px; min-height: 200px;">
      <div class="card tag-card" style="height: 50px; max-width: 180px; display: inline-block; margin: 5px 20px; border: 1px solid black; border-radius: 10px;" v-for="tag in tags">
        <div class="card-body" style="padding: 3px 10px;">
          <div class="subheader">
            {{ tag }}
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
        tags: ['Conversions', 'Adblocking', 'Temporal Rythym', 'Another One', 'device']
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
    font-size: 1.1rem;
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
