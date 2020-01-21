<template>
  <div class="test">
    <Table border :columns="columns4" :data="suite" v-if="isSuite" highlight-row @on-selection-change="selectsuite">
      <div slot="header">
        <Button type="primary" size="small" style="float: left;margin-left: 10px;margin-top: 10px"
                @click="$router.go(-1);data_task=[] ">返回上一级
        </Button>
        <Button type="primary" size="small" style="float: left;margin-left: 10px;margin-top: 10px"
                @click="rfrun()">执行
        </Button>
        <Select :transfer="true" v-model="env" placeholder="请选择环境" size="small" style="width:120px" class="envselect" placement="top">
          <Option v-for="item in envList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <template slot-scope="{ row, column, index }" slot="slot_title">
        <router-link :to="{name: 'autotest_case', params: {id:project_id,suite_name:row.name}}">{{row.name}}</router-link>
      </template>
    </Table>
    <Table border ref="selection" :columns="columns5" :data="case1" v-else @on-selection-change="selectcase">
      <div slot="header">
        <Button type="primary" size="small" style="float: left;margin-left: 10px;margin-top: 10px"
                @click="$router.go(-1);data_task=[] ">返回上一级
        </Button>
        <Button type="primary" size="small" style="float: left;margin-left: 10px;margin-top: 10px"
                @click="rfrun()">执行
        </Button>
        <Select :transfer="true" v-model="env" placeholder="请选择环境" size="small" style="width:120px" class="envselect" placement="top">
          <Option v-for="item in envList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
    </Table>
  </div>
</template>
<script>
import {getsuitename, getcasename, rfrunner} from "@/api/autotest";
import { constants } from 'fs';
  export default {
    data() {
      return {
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'name',
            slot: 'slot_title',
          },
          {
            title: '用例数',
            width: 200,
            key: 'casenum',
          }
        ],
        project_id: this.$route.params.id,
        columns5: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'name',
          },
 
        ],
        envList: [
          'T1',
          'T2',
          'T3',
          'P1',
          'D1',
          'D2'
        ],
        env: null,
        suite:[],
        pitchsuiteTemp: [],
        pitchsuite: [],
        pitchcaseTemp: [],
        pitchcase: [],
        case1:[],
        isSuite: null,
        current_suite_name: null,
      }
    },
    created(){
      this.current_suite_name = this.$route.params.suite_name
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.isSuite = this.$route.params.suite_name ? false : true
        console.log('suite',this.isSuite)
        if (this.isSuite == false){
          this.getcasename(this.current_suite_name)
        }
        else{
          this.getsuitename()
        }
      },
      getsuitename(){
        getsuitename(this.$route.params.id).then(response =>{
          let suiteList = response.data.data
          suiteList.forEach(element => {
            this.suite.push({'name':element.suite_name, 'casenum':element.casenum})
          });
          console.log('this.suite',this.suite)
        })
      },
      getcasename(suite_name){
        this.case1 = []
        getcasename(this.$route.params.id, suite_name).then(response =>{
          let caseList = response.data.data
          console.log(caseList)
          caseList.forEach(element => {
            this.case1.push({'name':element.case_name})
          });
          console.log('this.case1',this.case1)
        })
      },
      rfrun(){
        if (this.isSuite){
          var status = this.getlocalsuitename()
          this.pitchcase = []
        }
        else{
          var status = this.getlocalcasename()
          this.pitchsuite = []
          this.pitchsuite.push(this.$route.params.suite_name)
        }
        if (status == true){
          rfrunner(this.$route.params.id, this.env, this.pitchsuite, this.pitchcase).then(response =>{
            console.log(response.data)
            this.$router.push({name:'autotest_result', params:{'id':this.project_id}})
          })
        }
      },
      getlocalsuitename(){
          console.log(this.pitchsuiteTemp)
          if (this.pitchsuiteTemp.length == 0){
            this.$Notice.error({title:'提示',desc:'请先选中suite'})
          }else{
            if (!this.env){
              this.$Notice.error({title:'提示',desc:'请选择环境'})
            }
            else{
              this.pitchsuite = []
              this.pitchsuiteTemp.forEach(element=>{
                this.pitchsuite.push(element['name'])
              })
              console.log(1111,this.pitchsuite)
              return true
            }
          }
          return false
      },
      getlocalcasename(){
        if (this.pitchcaseTemp.length == 0){
            this.$Notice.error({title:'提示',desc:'请先选中case'})
          }else{
            if (!this.env){
              this.$Notice.error({title:'提示',desc:'请选择环境'})
            }
            else{
              this.pitchcase = []
              this.pitchcaseTemp.forEach(element=>{
                this.pitchcase.push(element['name'])
              })
              console.log(1111,this.pitchcase)
              return true
            }
          }
          return false
      },
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status);
        console.log(1111,this.selection)
      },
      selectsuite(selection){
        this.pitchsuiteTemp = []
        this.pitchsuiteTemp = selection
      },
      selectcase(selection){
        this.pitchcaseTemp = []
        this.pitchcaseTemp = selection
      },
      test(row, index){
        // this.isSuite = false
        this.$router.push({name:'autotest_case', params:{'suite_name':row.name}})
        this.current_suite_name = row.name
      }
    },
    watch: {
      '$route'(to, from) {
        this.suite = []
        this.current_suite_name = this.$route.params.suite_name
        this.fetchData()
      },
    },
  }
</script>

<style lang="less" scoped>
  .test{
    margin-bottom: 50px;
    .envselect{
      margin-top: -6px;
      margin-left: 10px;
    }
  }
  
</style>
