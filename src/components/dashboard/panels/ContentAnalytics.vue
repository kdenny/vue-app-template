<template>
  <div class="container content-analytics" v-on:click="navTo('pageviews/content-analytics')">
    <div class="section-header">
      Content Analytics
    </div>
    <div class="row" style="margin-top: 30px">
      <div class="col-7">
        <div class="subheader">
          Top Articles by URL
        </div>
        <bootstrap-table
          :tableFields="dashboardTables.articleFields"
          :tableRows="topArticles"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
      <div class="col-5">
        <div class="subheader">
          Top Content Sections
        </div>
        <bootstrap-table
          style="width: 65%; margin-left: 20%; "
          :tableFields="dashboardTables.contentSection"
          :tableRows="contentSections"
          :hideButtons="true"
        ></bootstrap-table>
        <div class="subheader">
          Top Authors
        </div>
        <bootstrap-table
          style="width: 65%; margin-left: 20%; "
          :tableFields="dashboardTables.authorFields"
          :tableRows="topAuthors"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BootstrapTable from '../../tables/BootstrapTable.vue'

  export default {
    name: 'content-panel',
    components: {
      BootstrapTable
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        'contentSections': 'topContentSections',
        'topArticles': 'topArticles',
        'topAuthors': 'topAuthors',
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
