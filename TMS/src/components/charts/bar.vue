<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/lib/tools'
import { watch } from 'fs';
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null,
      option:null
    }
  },
  watch: {
    value (value) {
      this.initCharts()
      // console.log(this.option.series)
    }
  },
  created(){
    this.$nextTick(() => {
    this.initCharts()
    on(window, 'resize', this.resize)
    })
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initCharts() {
      let xAxisData = Object.keys(this.value)
      let seriesData = Object.values(this.value)
      this.option = {
        tooltip: {
        trigger: 'axis',
        formatter:"{b}：{c}条",
        axisPointer: {
            type: 'shadow'
            }
        },
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(this.option)
      on(window, 'resize', this.resize)
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
  }
}
</script>
