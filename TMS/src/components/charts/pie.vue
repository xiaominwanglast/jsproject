<template>
<div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/lib/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPie',
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null,
      option: null,
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  watch: {
    value (value) {
      this.initCharts()
      console.log(this.option.series)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initCharts()
      on(window, 'resize', this.resize)
    })
  },
  methods: {
    initCharts () {
      let legend = this.value.map(_ => _.name)
      this.option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: legend
        // },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.value,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(this.option)
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
