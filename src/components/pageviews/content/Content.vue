<template>
  <div>
    <div style="font-weight: 200; font-size: 2.25rem; margin: 20px 0;" class="publisher-header">
      {{ currentPublisher.name }} Content Analytics
    </div>

    <div class="row">
      <div class="col-lg-12 col-xl-4" v-if="pubData">
        <h3>Content section</h3>
        <bootstrap-table
          :tableFields="table1Fields"
          :tableRows="contentSectionData"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
      <div class="col-lg-12 col-xl-4" v-if="pubData">
        <h3>Top authors</h3>
        <bootstrap-table
          :tableFields="table2Fields"
          :tableRows="authorData"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
      <div class="col-lg-12 col-xl-4" v-if="pubData">
        <h3>Top URLs</h3>
        <bootstrap-table
          :tableFields="table3Fields"
          :tableRows="urlData"
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
      contentSectionData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['contentSection'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['contentSection']
        } else {
          return null
        }
      },
      authorData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['author'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['author']
        } else {
          return null
        }
      },
      urlData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['topUrl'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['topUrl']
        } else {
          return null
        }
      },
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
      currentPublisher () {
        return this.$store.getters.currentPublisher
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
</style>
