<template>
  <div class='vuestic-chart'>
    <pie-chart :options="options" :data="chartData" v-if="type === 'pie'"></pie-chart>
    <donut-chart :options="options" :data="chartData" v-if="type === 'donut'"></donut-chart>
    <bubble-chart :options="options" :data="chartData" v-if="type === 'bubble'"></bubble-chart>
    <line-chart :options="options" :chartData="chartData" v-if="type === 'line'"></line-chart>
    <horizontal-bar-chart :options="options" :data="chartData" v-if="type === 'horizontal-bar'"></horizontal-bar-chart>
    <vertical-bar-chart :options="options" :data="chartData" v-if="type === 'vertical-bar'"></vertical-bar-chart>
  </div>
</template>

<script>
  import PieChart from './chart-types/PieChart'
  import BubbleChart from './chart-types/BubbleChart'
  import DonutChart from './chart-types/DonutChart'
  import HorizontalBarChart from './chart-types/HorizontalBarChart'
  import VerticalBarChart from './chart-types/VerticalBarChart'
  import LineChart from './chart-types/LineChart'

  export default {
    name: 'vuestic-chart',
    props: ['chartData', 'options', 'type'],
    components: {
      PieChart,
      LineChart,
      VerticalBarChart,
      HorizontalBarChart,
      DonutChart,
      BubbleChart
    },
    watch: {
      chartData (newData) {
        console.log('Data changed')
      }
    }
  }
</script>

<style lang='scss'>
  @import '../../../sass/_variables.scss';

  .vuestic-chart {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > * {
      height: 100%;
      width: 100%;
    }

    canvas {
      width: 100%;
      height: auto;
    }
  }
</style>
