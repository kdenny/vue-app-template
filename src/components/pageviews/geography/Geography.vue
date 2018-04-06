<template>
  <div>
    <h1>Geography</h1>
    <div class="row">
      <vuestic-widget class="col-sm-12 widget-viewport-height" headerText="Bubble Maps">
        <bubble-map v-bind:map-data="bubbleMapData" v-bind:bg="countryMapData"></bubble-map>
      </vuestic-widget>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xl-4" v-if="pubData">
        <h3>Countries</h3>
        <bootstrap-table
          :tableFields="table1Fields"
          :tableRows="countryData"
          :hideButtons="true"
        ></bootstrap-table>

      </div>
      <div class="col-lg-12 col-xl-4" v-if="pubData">

        <h3>Regions</h3>
        <bootstrap-table
          :tableFields="table2Fields"
          :tableRows="regionData"
          :hideButtons="true"
        ></bootstrap-table>

      </div>
      <div class="col-lg-12 col-xl-4" v-if="pubData">
        <!--<h3>Devices</h3>-->
        <!--<bootstrap-table-->
        <!--:tableFields="table1Fields"-->
        <!--:tableRows="deviceData"-->
        <!--&gt;</bootstrap-table>-->

        <h3>Cities</h3>
        <bootstrap-table
          :tableFields="table3Fields"
          :tableRows="cityData"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
    </div>
    <!--<div class="row">-->
      <!--<div class="col-md-4" v-if="pubData">-->
        <!--<data-table :apiMode="apiMode"-->
                    <!--:data="countryData"-->
                    <!--:tableFields="table1Fields"-->
                    <!--:itemsPerPage="itemsPerPage"-->
                    <!--:onEachSide="onEachSide"-->
                    <!--:paginationPath="paginationPath">-->
        <!--</data-table>-->
      <!--</div>-->
      <!--<div class="col-md-4" v-if="pubData">-->
        <!--<data-table :apiMode="apiMode"-->
                    <!--:data="regionData"-->
                    <!--:tableFields="table2Fields"-->
                    <!--:itemsPerPage="itemsPerPage"-->
                    <!--:onEachSide="onEachSide"-->
                    <!--:paginationPath="paginationPath">-->
        <!--</data-table>-->
      <!--</div>-->
      <!--<div class="col-md-4" v-if="pubData">-->
        <!--<data-table :apiMode="apiMode"-->
                    <!--:data="cityData"-->
                    <!--:tableFields="table3Fields"-->
                    <!--:itemsPerPage="itemsPerPage"-->
                    <!--:onEachSide="onEachSide"-->
                    <!--:paginationPath="paginationPath">-->
        <!--</data-table>-->
      <!--</div>-->
    <!--</div>-->
    <!--<dashboard-info-widgets></dashboard-info-widgets>-->
  </div>
</template>

<script>
  import VuesticChart from '../../vuestic-components/vuestic-chart/VuesticChart.vue'
  import DataTable from '../../vuestic-components/vuestic-datatable/VuesticDataTable.vue'
  import Vue from 'vue'
  import BadgeColumn from '../../tables/BadgeColumn.vue'
  import FieldsDef from './fields-definition'
  import BubbleMap from '../../maps/bubble-maps/BubbleMap'
  import BubbleMapData from '../../maps/bubble-maps/BubbleMapData'
  import BootstrapTable from '../../tables/BootstrapTable.vue'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'content-tab',
    components: {
      BubbleMap,
      DataTable,
      VuesticChart,
      BootstrapTable
    },
    data () {
      return {
        apiMode: false,
        bubbleMapData: BubbleMapData,
        sortFunctions: FieldsDef.sortFunctions,
        onEachSide: 1,
        table1Fields: FieldsDef.table1Fields,
        table2Fields: FieldsDef.table2Fields,
        table3Fields: FieldsDef.table3Fields,
        paginationPath: 'pagination',
        itemsPerPage: [
          {
            value: 5
          },
          {
            value: 6
          }
        ],
        colors: ['#f6a39f',
          '#5ecee9',
          '#fd9cba',
          '#90d1a4',
          '#eaa5c3',
          '#dbe9a8',
          '#dcb4e5',
          '#b1bf81',
          '#a4bfeb',
          '#f6d89e',
          '#79cac4',
          '#ecb489',
          '#9dede5',
          '#e3b298',
          '#c3f3ca',
          '#e7b2b7',
          '#a6cca7',
          '#ccba8f',
          '#e3e2b9',
          '#bbc49a']
      }
    },
    computed: {
      pubData () {
        return this.$store.getters.formattedResult
      },
      viewCount () {
        return this.$store.getters.pageviewCount
      },
      statCards () {
        return this.$store.getters.statCards
      },
      cityData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['geoData.city'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['geoData.city']
        } else {
          return null
        }
      },
      regionData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['geoData.region'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['geoData.region']
        } else {
          return null
        }
      },
      countryData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['geoData.country'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['geoData.country']
        } else {
          return null
        }
      },
      countryMapData () {
        let countryObj = {}
        this.countryData.forEach(u => {
          if (!countryObj[u.id]) {
            countryObj[u.id] = u.count
          }
        })
        let m = this.bubbleMapData.data
        let rdata = []
        m.map(md => {
          if (countryObj[md.name]) {
            md.value = countryObj[md.name]
            rdata.push(md)
          } else {
            md.value = 0
          }
        })
        console.log(rdata)
        return rdata
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
</style>
