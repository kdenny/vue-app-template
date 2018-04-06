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

import * as d3 from 'd3'

export default {
  /* eslint-disable */
  mounted: function() {
    var el = d3.select(this.$el).select("#svg");

//    this.height = +el.attr('height');
//    this.width = +el.attr('width');

    this.chartWidth = this.width - this.margin.left - this.margin.right;
    this.chartHeight = this.height - this.margin.top - this.margin.bottom;

//    this.x = d3.scale.ordinal()
//      .domain(["Z-Index: Total Offers", "Z-Index: Offer Index", "Z-Index: Conversion Index", "Z-Index: Total Conversions"])
//      .range([25, 275, 525, 750]);

//    this.x = d3.scale.ordinal().rangeRoundBands([0, this.chartWidth], .05);
//    this.y = d3.scale.linear().range([this.chartHeight, 0]);

    this.x = d3.scaleBand().rangeRound([0, this.chartWidth], 5)

    this.y = d3.scaleLinear().range([this.chartHeight, 0])

    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y);

//    this.xAxis = d3.svg.axis()
//      .scale(this.x)
//      .orient("bottom");

//    this.yAxis = d3.svg.axis()
//      .scale(this.y)
//      .orient("left")
//      .ticks(10);

    this.svg = el
      .attr("width", this.width)
        .attr("viewBox", " 0 0 " + this.width + " " + this.height)
        .attr("preserveAspectRatio", "xMidYMid")
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // console.log(this.chartData)
    // console.log(this.xVar)

    this.drawChart(this.chartData);

  },
  watch: {
    chartData(newTree) {
      this.clearChart()
//      this.etl()
//      this.renderChart()
      this.drawChart()
    }
  },
  props: ['width', 'height', 'margin', 'apiLoc', 'xVar', 'yVar', 'chartData', 'selectedBar'],
  methods: {
    drawChart: function(data) {

      var me = this;

      me.y.domain([0, d3.max(me.chartData, function(d) { return d[me.yVar]; })]);
      me.x.domain(['1 mo', '2 mo', '3-6 mo', '6-12 mo', '1 yr', '2 yr', '> 3 yr'])
//      me.x.domain(me.chartData.map(function(d) { return d[me.xVar]; }));


      me.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + me.chartHeight + ")")
        .call(me.xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

      me.svg.append("g")
        .attr("class", "y axis")
        .call(me.yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -me.chartHeight/2)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Conversions");

      me.svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .on("click", function(d) {
          if (d3.select(this).attr("class") =='bar') {
            d3.select(this).attr("class", "active")
          }
          else {
            d3.select(this).attr("class", "bar")
          }

          me.barClicked(d)
        })
        .attr("x", function(d) {
          return me.x(d[me.xVar]);
        })
        .attr("width", (me.x.bandwidth()-5))
        .attr("y", function(d) { return me.y(d[me.yVar]); })
        .attr("height", function(d) { return me.chartHeight - me.y(d[me.yVar]); });

    },
    barClicked: function(bar) {
      this.$emit('barClicked', bar)
    },
    clearChart: function() {
      this.svg.selectAll('g').remove()
    }
  }
}
</script>
<style scoped>
  .bar {
    fill: gray;
  }
  .bar:hover {
    cursor: pointer;
  }

  .active {
    fill: orange;
  }
</style>
