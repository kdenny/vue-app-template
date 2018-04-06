<template>
  <div class="container geography-container" v-on:click="navTo('pageviews/referrer')">
    <div class="section-header">
      Top Referrers
    </div>
    <div class="row">
      <bootstrap-table
        style="width: 65%; margin-bottom: 40px; margin-left: 15%;"
        :tableFields="dashboardTables.referrerFields"
        :tableRows="topReferrers"
        :hideButtons="true"
      ></bootstrap-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BootstrapTable from '../../tables/BootstrapTable.vue'

  export default {
    name: 'dashboard',
    components: {
      BootstrapTable
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
        'topReferrers': 'topReferrers',
        'dashboardTables': 'dashboardTables'
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
      navTo (loc) {
        this.$router.push({ path: loc })
      }
//      ...mapActions([
//        'closeMenu',
//        'toggleSidebar',
//        'isToggleWithoutAnimation',
//        'loadTuningData',
//        'loadDashboardData'
//      ]),
//
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
