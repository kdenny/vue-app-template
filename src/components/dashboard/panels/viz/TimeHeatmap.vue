<template>
  <div>
    <!--<div id="chart"></div>-->
    <svg width="500" height="260" id="svg"></svg>

  </div>

</template>

<script>
  /* eslint-disable */
  import * as d3 from 'd3'
  import * as moment from 'moment'
//  import * as d3Sankey from 'd3-sankey'

  export default {
    name: 'traffic-line-chart',
    props: ['data', 'dateRange', 'sizing', 'hourNow', 'dayNow', 'current'],
    watch: {
      data: function () {
        this.clearChart()
        if (this.data) {
          console.log(this.data)
          this.renderChart(this.data.dashboardData[0].data)
        }
      },
      chartData: function () {
        this.renderChart()
      }
    },
    data () {
      return {
        chartData: null
      }
    },
    computed: {
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
        return ts
      },
      fakeData () {
        let farray = []
        let day = 1
        let hour = 1
        while (day <= 7) {
          while (hour <= 24) {
            let fd = {
              day: day,
              hour: hour,
              value: Math.floor(Math.random() * 10)
            }
            farray.push(fd)
            hour++
          }
          hour = 1
          day++
        }
        return farray
      }
    },
    mounted () {
      var el = d3.select(this.$el).select("#svg")

      this.svg = el
        .append("g")
        .attr("transform", "translate(" + this.sizing.margin.left + "," + this.sizing.margin.top + ")");

      this.chartWidth = 455
      this.chartHeight = 160
      this.gridSize = Math.floor(455 / 24)
      this.days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      this.times = ["1am", "", "", "", "", "6a", "", "", "", "", "", "12pm", "", "", "", "", "", "6pm", "", "", "", "", "", "12am"]
      this.colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
      var me = this
      this.dayLabels = this.svg.selectAll(".dayLabel")
        .data(me.days)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", (d, i) => i * me.gridSize)
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + me.gridSize / 1.5 + ")")
        .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"));

      this.timeLabels = this.svg.selectAll(".timeLabel")
        .data(this.times)
        .enter().append("text")
        .text((d) => d)
        .attr("x", (d, i) => i * me.gridSize)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + me.gridSize / 2 + ", -6)")
        .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"));

      const type = (d) => {
        return {
          day: +d.day,
          hour: +d.hour,
          value: +d.value
        };
      };
      var me = this
      me.renderChart(this.data.dashboardData[0].data)
    },
    methods: {
      getData () {
        var me = this
      },
      renderChart (data) {
        var me = this
        const buckets = 6
        const legendElementWidth = me.gridSize

        const colorScale = d3.scaleQuantile()
          .domain([3000, buckets - 1, d3.max(data, (d) => d.average)])
          .range(me.colors)

        const svg2 = d3.select(me.$el)

        me.cards = me.svg.selectAll(".hour")
          .data(data, (d) => {
            return d.day+':'+d.hour
          });

        me.cards.append("title");

        me.cards.enter().append("rect")
          .attr("x", (d) => (d.hour) * me.gridSize)
          .attr("y", (d) => (d.day-1) * me.gridSize)
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("class", "hour bordered")
          .attr("width", me.gridSize)
          .attr("height", me.gridSize)
          .style("fill", me.colors[0])
          .merge(me.cards)
          .transition()
          .duration(1000)
          .style("fill", (d) => colorScale(d.average));

        const currentHour = me.svg.append("rect")
          .attr("x", (me.hourNow-1) * me.gridSize)
          .attr("y", (-me.gridSize/1.3))
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("width", me.gridSize)
          .attr("height", me.chartHeight)
          .style("fill", "none")
          .style("stroke", "gray")
          .style("stroke-width", "2")

        const currentDay = me.svg.append("rect")
          .attr("x", (-me.gridSize*1.1))
          .attr("y", (me.dayNow-1) * me.gridSize)
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("width", me.chartWidth)
          .attr("height", me.gridSize)
          .style("fill", "none")
          .style("stroke", "gray")
          .style("stroke-width", "2")

        const present = me.svg.append("rect")
          .attr("x", (me.hourNow-1) * me.gridSize)
          .attr("y", (me.dayNow-1) * me.gridSize)
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("width", me.gridSize)
          .attr("height", me.gridSize)
          .style("fill", "none")
          .style("stroke", "green")
          .style("stroke-width", "6")


        me.cards.select("title").text((d) => d.value);

        me.cards.exit().remove();

        me.legend = me.svg.selectAll(".legend")
          .data([0].concat(colorScale.quantiles()), (d) => d);

        me.legend_g = me.legend.enter().append("g")
          .attr("class", "legend");

        me.legend_g.append("rect")
          .attr("x", (d, i) => {
            return (legendElementWidth * i) + (34 * i)
          })
          .attr("y", me.chartHeight)
          .attr("width", legendElementWidth*2.2)
          .attr("height", me.gridSize / 2)
          .attr("transform", "translate(-15,0)")
          .style("fill", (d, i) => me.colors[i]);

        me.legend_g.append("text")
          .attr("class", "mono")
          .text((d) => me.parseLgNumber(Math.round(d)))
          .attr("x", (d, i) => {
            return (legendElementWidth * i) + (34 * i)

          })
          .attr("transform", "translate(-15,6)")
          .attr("y", me.chartHeight + me.gridSize)
          .style("font-size", "0.9rem");

        me.legend.exit().remove();
      },
      clearChart() {
        this.cards.remove();
        this.legend.remove();
        this.legend_g.remove();
      },
      parseLgNumber(nb) {
        if (nb > 1000 && nb < 1000000) {
          return Math.floor(nb / 100) / 10 + "k"
        } else if (nb > 1000000) {
          return Math.floor(nb / 100000) / 10 + "m"
        } else {
          return nb
        }
      }
    }
  }
</script>

<style scoped>
  .legend {
    margin-left: -20px;
  }
  .mono {
    font-size: 0.9rem;
  }
  .hour {
    opacity: 0.15;
  }
</style>
