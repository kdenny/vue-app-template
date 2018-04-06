<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="tf in tableFields" class="table-head-row">{{ tf }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rowd in tableRows">
        <!--<td v-for="tg in tableFields">{{ rowd[tg.name] }}</td>-->
        <td v-for="tg in tableFields">{{ rowd[tg] }}</td>
      </tr>
    </tbody>
  </table>

</template>

<script>
  /* eslint-disable */
  export default {
    name: 'bootstrap-table',
    components: {
    },
    props: ['tableFields', 'tableRows'],
//    computed: {
//      parsedRows () {
//        let l = this.tableRows.map(d => {
//          return d
//        })
//        return l
//      }
//    },
    mounted () {
      console.log(this.tableFields)
      console.log(this.tableRows)
    },
    methods: {
//      isUp (row) {
//        if (row.vector === 'increasing') {
//          return true
//        }
//      },
//      isDown (row) {
//        if (row.vector === 'decreasing' && row.diff !== 0) {
//          return true
//        }
//      }
    }
  }
</script>

<style scoped>
  /*@import "../../sass/_variables.scss";*/
  table {
    table-layout: auto;
  }
  .circle {
    width: .75rem;
    height: .75rem;
    border-radius: 50%;
    display: inline-block;
  }

  /*td:nth-child(4){*/
    /*&:after{*/
      /*content: "\0025";*/
    /*}*/
  /*}*/

  /*.up td:nth-child(5){*/
    /*color: #8BD389;*/
    /*&:before{*/
      /*content:'';*/
      /*display: inline-block;*/
      /*width: 0;*/
      /*height: 0;*/
      /*border-style: solid;*/
      /*border-width: 0 5px 6px 5px;*/
      /*border-color: transparent transparent #8BD389 transparent;*/
      /*margin: 0px 5px 3px 10px;*/
    /*}*/
  /*}*/
  /*.down td:nth-child(5){*/
    /*color: #e83737;*/
    /*&:before{*/
      /*content:'';*/
      /*display: inline-block;*/
      /*width: 0;*/
      /*height: 0;*/
      /*border-style: solid;*/
      /*transform: rotate(180deg);*/
      /*border-width: 0 5px 6px 5px;*/
      /*border-color: transparent transparent #e83737 transparent;*/
      /*margin: 0px 5px 3px 10px;*/
    /*}*/
  /*}*/

  .table-head-row {
    color: darkgray;
  }
</style>
