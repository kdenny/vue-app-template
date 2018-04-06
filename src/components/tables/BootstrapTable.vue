<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="!hideButtons"></th>
        <th v-for="tf in tableFields" class="table-head-row">{{ tf.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rowd in parsedRows" v-bind:class="{ up: isUp(rowd), down: isDown(rowd) }">
        <th v-if="!hideButtons"><span class="circle badge-warning" style="background-color: blue" :style="{'background-color': rowd.color}"></span></th>
        <!--<td v-for="tg in tableFields">{{ rowd[tg.name] }}</td>-->
        <td v-for="tg in tableFields">{{ rowd[tg.name] }}</td>
      </tr>
    </tbody>
  </table>

</template>

<script>

  export default {
    name: 'bootstrap-table',
    components: {
    },
    props: ['tableFields', 'tableRows', 'hideButtons'],
    computed: {
      parsedRows () {
        let l = this.tableRows.map(d => {
          if (!isNaN(Math.abs(d.diff))) {
            d.diff = Math.abs(d.diff)
          }
          return d
        })
        return l
      }
    },
    mounted () {
    },
    methods: {
      isUp (row) {
        if (row.vector === 'increasing' && !this.hideButtons) {
          return true
        }
      },
      isDown (row) {
        if (row.vector === 'decreasing' && row.diff !== 0 && !this.hideButtons) {
          return true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  table {
    table-layout: auto;
  }
  .circle {
    width: .75rem;
    height: .75rem;
    border-radius: 50%;
    display: inline-block;
  }

  td:nth-child(3){
    &:after{
      content: "\0025";
    }
  }

  .up td:nth-child(5){
    color: #8BD389;
    &:before{
      content:'';
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 5px 6px 5px;
      border-color: transparent transparent #8BD389 transparent;
      margin: 0px 5px 3px 10px;
    }
  }
  .down td:nth-child(5){
    color: #e83737;
    &:before{
      content:'';
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      transform: rotate(180deg);
      border-width: 0 5px 6px 5px;
      border-color: transparent transparent #e83737 transparent;
      margin: 0px 5px 3px 10px;
    }
  }

  .table-head-row {
    color: darkgray;
  }
</style>
