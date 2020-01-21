<template>
  <div>
    <Row :gutter="20">
      <Col :xs="8" :md="8" :lg="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`"
           style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </Col>
    </Row>
<!--    <Row :gutter="20" style="margin-top: 10px;">-->
<!--      <Col :md="24" :lg="10" style="margin-bottom: 20px;">-->
<!--        <Card shadow>-->
<!--          <chart-pie style="height: 300px;" :value="pieData" text="最频繁失败用例"></chart-pie>-->
<!--        </Card>-->
<!--      </Col>-->
<!--      <Col :md="24" :lg="12" style="margin-bottom: 20px;">-->
<!--        <Card shadow>-->
<!--          <chart-bar style="height: 300px;" :value="barData" text="每月用例增减情况"/>-->
<!--        </Card>-->
<!--      </Col>-->
<!--    </Row>-->

  </div>
</template>

<script>
  import InforCard from '_c/info-card'
  import CountTo from '_c/count-to'
  import {getCharts,getTj} from '@/api/autotest.js'
  import {METHODS} from 'http';
  import {setTimeout} from 'timers';
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/line'
  import chartPie from '@/components/charts/pie'
  import chartBar from '@/components/charts/bar'


  export default {
    name: 'overview',
    components: {
      InforCard,
      CountTo,
      chartPie,
      chartBar,
    },
    data() {
      return {
        inforCardData: [],
        pieData: [],
        barData: {},
      }
    }, 
    created() {
        this.fetchData() 
        this.fetchTjdata()
    },
    methods: {
      fetchData() {
        getCharts(this.$route.params.id).then(response => {
          let chartslist = response.data.data
          this.pieData = chartslist.failcase         
          this.barData = chartslist.addnum
        })
      },
      fetchTjdata() {
        getTj(this.$route.params.id).then(response =>{
          let Tjlist = response.data.data
          this.setValue(Tjlist);
        })
      }, 
      setValue(valueList){
        this.inforCardData = []//初始化數組
        this.inforCardData.push({title: '测试用例总数', icon: 'md-folder', count: valueList.count_yl_all, color: '#2d8cf0'})
        this.inforCardData.push({title: '可自动化用例总数', icon: 'logo-angular', count: valueList.count_zx_times, color: '#19be6b'})
        this.inforCardData.push({title: '非自动化用例总数', icon: 'ios-backspace', count: valueList.count_addnum, color: '#ff9900'})
        // this.inforCardData.push({title: '本月用例执行数', icon: 'md-share', count: valueList.count_lc_all, color: '#ed3f14'})
        // this.inforCardData.push({title: '用例执行总数量', icon: 'md-chatbubbles', count: valueList.count_zx_all, color: '#E46CBB'})
        // this.inforCardData.push({title: '用例执行成功率(%)', icon: 'md-map', count: Number((valueList.count_zx_pass)*100), color: '#9A66E4'})
      }
    },
    watch:{
      '$route'(to,from){
        console.log("路由地址是:",to.path)
        this.fetchTjdata()
        this.fetchData()
      }
    }
  }
</script>

<style>
  .count-style {
    font-size: 50px;
  }
</style>