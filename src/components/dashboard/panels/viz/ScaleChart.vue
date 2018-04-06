<!--

Based on:
  https://bl.ocks.org/shimizu/f90651541575f348a129444003a73467

Links:
  Props: https://vuejs.org/v2/guide/components.html#Passing-Data-with-Props
  Methods: https://vuejs.org/v2/guide/events.html#Method-Event-Handlers

-->

<template>
  <div>
    <!--<div id="legend"></div>-->
    <svg id="svg"></svg>
  </div>

</template>

<script>
  /* eslint-disable */
import * as d3 from 'd3'
//const d3tip = require('d3-tip');

export default {
  mounted: function() {
    var el = d3.select(this.$el).select("#svg");

    this.chartWidth = this.width - this.margin.left - this.margin.right;
    this.chartHeight = this.height - this.margin.top - this.margin.bottom;
    this.colors = {}

    var data = [
      {"date":"4/1854","total":155,"mobile":73,"desktop":5,"tablet":77}
      ];
    let l = {date: "4/1854", total: 0}
    var me = this
    this.chartData.forEach(d => {
//      if (d.id !== 'GAME_CONSOLE' && d.id != 'OTHER') {
//        l[d.id] = d.views
//      }
      me.colors[d.id] = d.color
      l[d.id] = d.count
      l.total += d.count
    })
    var la = []
    la.push(l)
    data = la;
    var stackKey = ["DESKTOP", "MOBILE", "TABLET","GAME_CONSOLE"];
    var parseDate = d3.timeParse("%m/%Y"),
    xScale = d3.scaleLinear().rangeRound([0, this.chartWidth]),
    yScale = d3.scaleBand().rangeRound([this.chartHeight, 0]).padding(0.1),
    color = [
      '#66c2a5',
      '#fc8d62',
      '#8da0cb',
      '#e78ac3',
      '#a6d854'
    ],
    xAxis = d3.axisBottom(xScale),
    yAxis =  d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b"))
    this.svg = el
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", " 0 0 " + this.width + " " + this.height)
      .attr("preserveAspectRatio", "xMidYMid")
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    var stack = d3.stack()
      .keys(stackKey)
      /*.order(d3.stackOrder)*/
      .offset(d3.stackOffsetNone);

    var layers= stack(data);
    data.sort(function(a, b) { return b.total - a.total; });
    yScale.domain(data.map(function(d) { return parseDate(d.date); }));
//    xScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();
    xScale.domain([0, l.total]);

    var layer = this.svg.selectAll(".layer")
      .data(layers)
      .enter().append("g")
      .attr("class", "layer")
      .style("fill", function(d, i) {return me.colors[d.key];});

    layer.selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("y", function(d) { return yScale(parseDate(d.data.date)); })
      .attr("x", function(d) { return xScale(d[0]); })
      .attr("height", yScale.bandwidth())
      .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) });

  },
//  watch: {
//    chartData(newTree) {
//      console.log(newTree)
//      console.log(this.chartData)
//      this.clearChart()
////      this.etl()
////      this.renderChart()
//      this.drawChart(this.chartData)
//    }
//  },
  props: ['width', 'height', 'margin', 'apiLoc', 'xVar', 'xScale', 'yVar', 'chartData', 'dataType'],
  methods: {
    drawChart: function(data) {

      var me = this;

    },
    barClicked: function(bar) {
      this.$emit('barClicked', bar)
    },
    clearChart: function() {
      this.svg.selectAll('g').remove()
      this.svg.selectAll('rect').remove()
    }
  }
}
</script>
<style>
  .bar {
    fill: black;
  }
  .bar:hover {
    cursor: pointer;
  }
</style>
