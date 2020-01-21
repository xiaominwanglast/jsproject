<template>
  <div>
    <Table border ref="selection" :columns="columns4" :data="data1">
      <template slot-scope="{ row,column,index }" slot="slot_report">
        <a :href="getReportUrl(row.report)" :target="targetChange(row.report)" @click="targetMessage(row.report)">{{row.name}}</a>
      </template>
      <template slot-scope="{ row,column,index }" slot="slot_status">
        <div :style="{backgroundColor:bgChange(row.status) , borderRadius:'6px'}"  >
          <Icon type="ios-loading" size=15 class="demo-spin-icon-load" v-show="showReportStatus(row.status)"></Icon>
          <span style="color: white;padding-left: 5px;line-height: 25px;">{{row.status}}</span>
        </div>
      </template>
    </Table>
    <div style="margin: 5px;overflow: hidden">
      <div style="float: right">
        <Page :total="total" :current.sync="current" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import {GetTestResult,getProjectIdStatus} from "@/api/autotest";
  import {baseURL} from "../../config";
  export default {
    data() {
      return {
        columns4: [
          {
            title:'#',
            key:'id',
            width:70
          },
          {
            title: '项目名称',
            key: 'name',
            slot:"slot_report"
          },
          {
            title: '触发人员',
            key: 'user',
            width: 100
          },
          {
            title: '触发时间',
            key: 'create_time',
            width: 160
          },
          {
            title:'触发环境',
            key:'env',
            width:100,
            align: 'center'
          },
          {
            title:'执行数量',
            key:'count',
            width:110,
          },
          {
            title:'成功数',
            key:'pass_count',
            width:110,
          },
          {
            title:'失败数',
            key:'fail_count',
            width:110,
          },
          {
            title:'执行时长',
            key:'duration',
            width:110,
            align: 'center',
          },
          {
            title:'执行结果',
            key:'status',
            width:120,
            align: 'center',
            slot:"slot_status"
          },
        ],
        data1: [],
        offset: 0,
        limit :10,
        current:1,
        total :0,
        running_color:"#2db7f5",
        pass_color:"#19be6b",
        fail_color:"#ed4014",
        error_color:"#ff9900",
        other_color:"#2db7f5",
        running_status_list:[],
        running_flag:false
      }
    },
    methods: {
      getRunningReportStatus(){
        if(this.running_status_list.length!=0 && this.running_flag==true && this.offset==0){
          this.running_status_list.length=0
          this.GetTestResult()
          setTimeout(this.getRunningReportStatus,3000)
        }
      },
      bgChange(rpStatus){
        if(rpStatus=="Pass"){return this.pass_color}
        if(rpStatus=="Fail"){return this.fail_color}
        if(rpStatus=="Running"){return this.running_color}
        if(rpStatus=="error"){return this.error_color}
        return this.other_color
      },
      targetMessage(report){
        if(report==''){
          this.$Message.warning("用例执行中，报告未生成！")
        }
      },
      targetChange(report){
        if(report!=''){
          return '_blank'
        }else {
          return '_self'
        }
      },
      showReportStatus(status){
        if (status=="Running"){
          return true
        }else {
          return false
        }
      },
      changePage(page) {
        // console.log(page)
        this.offset = (page - 1) * 10;
        this.GetTestResult()
      },
      GetTestResult() {
        GetTestResult(this.$route.params.id,this.limit,this.offset).then(res => {
          this.total = res.data.count
          this.data1= res.data.data
          this.running_flag=true
          for (let i=0;i<res.data.data.length;i++){
            if(res.data.data[i].status=='Running'){
              this.running_status_list.push(res.data.data[i].status)
            }
          }
        });
      },
      getReportUrl(row){
        if (row ==""){
          return "#"
        }else {
          return baseURL+row+"/report.html"
        }
      }
    },
    created: function () {
      this.GetTestResult()
      setTimeout(this.getRunningReportStatus,3000)
    },
    destroyed: function (){
      this.running_flag=false
    }
  }
</script>
<style scoped>
  .demo-spin-icon-load{
    animation: ani-demo-spin 600ms linear infinite;
  }
</style>