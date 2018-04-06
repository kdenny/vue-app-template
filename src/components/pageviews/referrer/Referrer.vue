<template>
  <div>
    <h1>Referrer</h1>

    <div class="row">
      <div class="col-lg-12 col-xl-6" v-if="referralData">
        <h3>Referral segments</h3>
        <bootstrap-table
          :tableFields="table1Fields"
          :tableRows="referralData"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
      <div class="col-lg-12 col-xl-6" v-if="rawReferralData">
        <h3>Raw referral data</h3>
        <bootstrap-table
          :tableFields="table2Fields"
          :tableRows="rawReferralData"
          :hideButtons="true"
        ></bootstrap-table>
      </div>
    </div>


  </div>

</template>

<script>
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
      BootstrapTable
    },
    data () {
      return {
        apiMode: false,
        sortFunctions: FieldsDef.sortFunctions,
        onEachSide: 1,
        table1Fields: FieldsDef.table1Fields,
        table2Fields: FieldsDef.table2Fields,
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
          '#bbc49a'
        ]
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
      referralData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['referrer'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['referrer']
        } else {
          return null
        }
      },
      rawReferralData () {
        let co = 0
        let l = this.$store.getters.formattedResult
        if (l) {
          l['rawReferrer'].map(cs => {
            cs.color = this.colors[co]
            co++
            return cs
          })
          return l['rawReferrer']
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
