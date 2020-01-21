<template>
  <div>
    <Table border ref="selection" :columns="columns4" :data="data1" @on-selection-change="selectpymodule" style="min-height: 600px">
      <div slot="header">
        <Button type="primary" size="small" style="float: left;margin-left: 10px;margin-top: 13px" @click="runner()">执行</Button>
        <Select v-model="model1" size="small" style="margin-left: 10px;width:100px" placeholder="请选择环境">
          <Option v-for="item in envList" :value="item" :key="item">{{ item}}</Option>
        </Select>
        <Select v-model="model2" size="small" style="margin-left: 10px;width:100px" placeholder="请选择类型" @on-change="selectFactorType">
          <Option v-for="item in typeList" :value="item" :key="item">{{ item}}</Option>
        </Select>
      </div>
    </Table>
    <div style="margin: 5px;overflow: hidden">
      <div style="float: right">
        <Page :total="total" :current.sync="current" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
    import {GetFactorList,getFactorTypeCase,runfactor} from "@/api/autotest";
    export default {
    data () {
      return {
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
            {
                title: '用例名称',
                key: 'factorCase',
            },
          {
            title: '因子编码',
            key: 'factorName',
            width: 200,
          },
          {
            title: '因子名称',
            key: 'factorDesc',
            width: 200,
          },
          {
              title: '因子类型',
              key: 'factorType',
              width: 150,
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
          typeList:[
              '全部类型',
              '接口传参',
              '同盾',
              '集奥',
              '评分',
              '汇法',
              '前海',
              '鹏元',
              '富数'
          ],
          model2:'',
          testSuit:[],
          model1: '',
          data1: [],
          offset: 0,
          limit :10,
          current:1,
          total :0,
          tag:false,
          typeOption:'',
      }
    },
    methods: {
        runner(){
            if(this.model1==''){
                this.$Notice.error({title:'提示',desc:'请选择环境'})
            }else if (this.model2==''){
                this.$Notice.error({title:'提示',desc:'请选择因子类型'})
            }else {
            let factorCaseList=[];
            getFactorTypeCase(this.typeOption).then(res =>{
                let factorData= res.data.data;
                factorData.forEach(element =>{
                    factorCaseList.push(element['factorName'])
                });
                if (factorCaseList.length==0){
                    this.$Notice.error({title:'提示',desc:'当前类型用例为空'})
                }else {
                    runfactor(this.$route.params.id,this.model1,factorCaseList).then(res =>{
                        let runData=res.data
                        console.log(runData)
                        console.log(this.$router)
                        this.$router.push({name:'autotest_result', params:{'id':this.$route.params.id}})
                    })
                }
            });
            }
        },
      selectpymodule(selection){
        if(selection.length){
            this.tag=true
        }else {
            this.tag=false
        }
      },
        selectFactorType(option){
          this.typeOption=option;
            GetFactorList(option,this.limit,this.offset).then(res => {
                this.total = res.data.count
                this.data1= res.data.data
                this.data1.forEach(element =>{
                    element._checked=true
                })
            });
        },
        changePage(page) {
            // console.log(page)
            this.offset = (page - 1) * 10;
            this.GetFactorList()
        },
        GetFactorList() {
            GetFactorList(this.model2,this.limit,this.offset).then(res => {
                this.total = res.data.count
                this.data1= res.data.data
                this.data1.forEach(element =>{
                    if (this.typeOption){
                        element._checked=true
                    }else{
                        element._checked=this.tag
                    }
                })
            });
        },
    },
      created: function () {
          this.GetFactorList()
      },
  }
</script>
<style scoped>

</style>