<template>
  <div>
    <h1>User Agent</h1>

    <div class="row">
      <div class="col-lg-12 col-xl-4" v-if="deviceData">
        <h3>Devices</h3>
        <bootstrap-table
          :tableFields="table1Fields"
          :tableRows="deviceData"
          :hideButtons="true"
        ></bootstrap-table>

      </div>
      <div class="col-lg-12 col-xl-4" v-if="deviceData">

        <h3>Operating system</h3>
        <bootstrap-table
          :tableFields="table2Fields"
          :tableRows="osData"
          :hideButtons="true"
        ></bootstrap-table>

      </div>
      <div class="col-lg-12 col-xl-4" v-if="deviceData">
        <h3>Browser data</h3>
        <bootstrap-table
          :tableFields="table3Fields"
          :tableRows="browserData"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
    </div>


  </div>

</template>

<script>
  import VuesticChart from '../../vuestic-components/vuestic-chart/VuesticChart.vue'
  import DataTable from '../../vuestic-components/vuestic-datatable/VuesticDataTable.vue'
  import Vue from 'vue'
  import BadgeColumn from '../../tables/BadgeColumn.vue'
  import FieldsDef from './fields-definition'
  import BootstrapTable from '../../tables/BootstrapTable.vue'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'content-tab',
    components: {
      DataTable,
      VuesticChart,
      BootstrapTable
    },
    data () {
      return {
        apiMode: false,
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
        console.log(this.$store.getters.formattedResult)
        return this.$store.getters.formattedResult
      },
      viewCount () {
        return this.$store.getters.pageviewCount
      },
      statCards () {
        return this.$store.getters.statCards
      },
      deviceData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        console.log(l)
        if (l) {
          l['userAgent.platform'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['userAgent.platform']
        } else {
          return null
        }
      },
      osData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['userAgent.operatingSystem'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['userAgent.operatingSystem']
        } else {
          return null
        }
      },
      browserData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['userAgent.browser'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['userAgent.browser']
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
</style>
