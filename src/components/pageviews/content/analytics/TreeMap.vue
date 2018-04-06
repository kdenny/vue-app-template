<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div v-if="treeData">
    <svg width="850" height="550"></svg>
  </div>

</template>

<script>
/* eslint-disable */
import * as d3 from 'd3'


const timeout = d3.timeout(function() {
    d3.select("input[value=\"sumByCount\"]")
        .property("checked", true)
        .dispatch("change");
  }, 2000)

export default {
  name: 'tree-map',
  data () {
    return {
      line: '',
      tree: [],
      parsedTree: {},
      selected: null,
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
  props: ['treeData'],
  watch: {
//    treeData(newTree) {
//      if (!this.selected) {
//        this.clearChart()
//        this.etl()
//        this.renderChart()
//      }
////      this.renderChart()
//    }
  },
  mounted () {

    this.etl()
    if (this.parsedTree) {
      this.renderChart()
    }
  },
  methods: {
    clearChart() {
      this.svg.selectAll("g").remove()
    },
    renderChart () {
      var me = this
      this.svg = d3.select(this.$el).select('svg')
      let width = +this.svg.attr('width')
      let height = +this.svg.attr("height")

      const fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); }
      const color = d3.scaleOrdinal(d3.schemeCategory20.map(fader))


      const format = d3.format(",d")

      this.treemap = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([width, height])
        .round(true)
        .paddingInner(3)

      this.root = d3.hierarchy(this.parsedTree)
        .eachBefore(function(d) {
          d.data.id = d.data.name;
        })
        .sum(this.sumBySize)
        .sort(function(a, b) {
          return b.height - a.height || b.value - a.value;
        })

      this.treemap(this.root)

      this.cell = this.svg.selectAll("g")
        .data(this.root.leaves())
        .enter().append("g")
        .on("click", function (d) {
          if (d3.select(this).attr("class") !== 'active' || !(d3.select(this).attr("class"))) {
            console.log("Active now")
            d3.select(this).attr("class","active")
            me.cellClicked(d, this)
            d3.select(this).selectAll("text").attr("class","text")
          }
          else {
            me.cellClicked(d)
            d3.select(this).attr("class","not")
            d3.select(this).selectAll("text").attr("class","text")
          }
        })
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })

      this.cell.append("rect")
        .attr("id", function(d) { return d.data.id; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("fill", function(d) {
          return d.data.color;
        });

      this.cell.append("clipPath")
        .attr("id", function(d) {
          return "clip-" + d.data.id; })
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.data.id; })

      this.cell.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
        .selectAll("tspan")
        .data(function(d) {
          let g =  d.data.percent + '%'
          //        return d.data.id.split(/(?=[A-Z][^A-Z])/g);
          return [d.data.id, ' '];
        })
        .enter().append("tspan")
        .attr("x", 4)
        .attr("y", function(d, i) { return 13 + i * 10; })
        .text(function(d) { return d; });

      this.cell.append("title")
        .text(function(d) {
          return d.data.id + "\n" + format(d.value); })
    },
    etl () {
      var me = this
      let g = this.treeData
      let td = {
        children: [
        ]
      }

      let ct = 0
      let co = 0

      while (ct < g.length) {
        let dg = g[ct]
        if (co > 19) {
          co = 0
        }
        let ccolor = me.colors[co]
        let j = {
          id: dg.key,
          name: dg.key,
          children: [
            {
              count: dg.value.sumPageviews.sum,
              id: dg.key,
              name: dg.key,
              color: ccolor
            }
          ]
        }
        if (dg.value.sumPageviews.sum > 500000 && dg.key != 'US Homepage' && dg.value.count > 0) {
          td.children.push(j)
          co++
        }
        ct++
      }

      this.parsedTree = td
    },
    sumByCount (d) {
      return d.children ? 0 : 1
    },
    sumBySize (d) {
      return d.count
    },
    cellClicked (d, obh) {
      console.log(d)
      this.$emit('cellClicked', d.data)
      d3.select(obh).attr("class", "active")
    },
    changed (sum) {
      timeout.stop();

      treemap(root.sum(sum));

      cell.transition()
          .duration(750)
          .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
        .select("rect")
          .attr("width", function(d) { return d.x1 - d.x0; })
          .attr("height", function(d) { return d.y1 - d.y0; });
    }
  }
}
</script>

<style>
/*svg {*/
  /*margin: 25px;*/
/*}*/

/*path {*/
  /*fill: none;*/
  /*stroke: #76BF8A;*/
  /*stroke-width: 3px;*/
/*}*/

.active {
  stroke-width: 3;
  stroke: yellow;
}

.text {
  stroke-width: 0.25;
  stroke: black;
}

</style>


