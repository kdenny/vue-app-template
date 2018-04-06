<template>
  <div>
    <svg width="500" height="325"></svg>
  </div>

</template>

<script>
  /* eslint-disable */
  import * as d3 from 'd3'
  import * as moment from 'moment'
//  import * as d3Sankey from 'd3-sankey'

  export default {
    name: 'traffic-line-chart',
    props: ['lineData', 'dateRange', 'timeType'],
    watch: {
      lineData: function () {
        console.log("Line data changed")
        this.clearChart()
        this.renderChart()
      }
    },
    computed: {
      xScale () {
        if (this.$store.getters.currentDatasource === 'websocket') {
          let g = this.$store.getters.pageviewsArray.hour
          let rg = {
            start: moment().subtract(g.length, 'minutes').format('LT'),
            end: moment().format('LT')
          }
          return rg
        } else {
          let rg = {
            start: this.dateRange.startDate,
            end: this.dateRange.endDate
          }
          return rg
        }
      },
      timeSeriesData () {
        let hourData = this.$store.getters.pageviewsArray.hour
        const start = moment().subtract(hourData.length, 'minutes')
        let ts = []
        let i = 1
        hourData.forEach(r => {
          let og = {
            date: start.add(1, 'minute').format('LT'),
            count: r
          }
          i++
          ts.push(og)
        })
        console.log(ts)
        return ts
      }
    },
    mounted () {
      if (this.timeType) {
        if (this.timeType === 'month') {
          this.parseDate = d3.timeParse("%Y-%m-%d")
        }
      } else {
        this.parseDate = d3.timeParse("%I:%M %p")
      }

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
        var me = this
        this.x.domain([me.parseDate(this.xScale.start), me.parseDate(this.xScale.end)])
        this.y.domain([0, d3.max(this.timeSeriesData, function(d) { return d.count; })]);

        this.valueline = d3.line()
          .x(function(d, i) {
            return me.x(me.parseDate(d.date));
          })
          .y(function(d) {
            return me.y(d.count);
          });

        this.line = this.svg.select('g')
          .append("path")
          .data([this.timeSeriesData])
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
