<template>
  <div>
    <svg width="550" height="450"></svg>
  </div>

</template>

<script>
  /* eslint-disable */
  import * as d3 from 'd3'
//  import * as d3Sankey from 'd3-sankey'

  export default {
    name: 'traffic-line-chart',
//    data () {
//      return {
//        timeframe: 'minute'
//      }
//    },
    props: ['lineData', 'dateRange', 'timeType'],
    watch: {
      lineData: function () {
        console.log("Line data changed")
        this.clearChart()
        this.renderChart()
      }
    },
    mounted () {
      this.parseDate = d3.timeParse("%Y-%m-%d")
      this.svg = d3.select(this.$el).select('svg')
      const width = +this.svg.attr('width')
      this.height = +this.svg.attr("height")


      this.x = d3.scaleTime().range([0, width - 30]);
      this.y = d3.scaleLinear().range([this.height - 40, 0]);

      var me = this;

      this.svg.append('g')

      this.renderChart()


    },
    methods: {
      renderChart () {
        console.log(this.lineData)
//        this.x.domain(d3.extent(this.lineData, function(d) {
//          console.log(d.date)
//          return d.date;
//        }));
        var me = this
        this.x.domain([me.parseDate(this.dateRange.startDate), me.parseDate(this.dateRange.endDate)])
        this.y.domain([0, d3.max(this.lineData, function(d) { return d.count; })]);

        this.valueline = d3.line()
          .x(function(d, i) {
            return me.x(me.parseDate(d.date));
          })
          .y(function(d) {
            return me.y(d.count);
          });

        console.log(this.lineData)

        this.line = this.svg.select('g')
          .append("path")
          .data([this.lineData])
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr("transform", "translate(65," + 0 + ")")
          .attr("d", this.valueline);



        // Add the X Axis
        this.xAxis = this.svg.append("g")
          .attr("transform", "translate(75," + (this.height-20) + ")")
          .call(d3.axisBottom(this.x));

        // Add the Y Axis
        this.yAxis = this.svg.append("g")
          .attr("transform", "translate(65," + 0 + ")")
          .call(d3.axisLeft(this.y));


      },
      clearChart() {
        this.line.remove();
        this.xAxis.remove();
        this.yAxis.remove();
      }
    }
  }
</script>

<style scoped>
</style>
