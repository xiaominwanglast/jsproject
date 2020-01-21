<style scoped>

  .breadcrumb{
    text-align: center;
  }
  .table_key{
    font-weight:bold;
    background: black;
  }
</style>

<template>
  <div>
    <Breadcrumb class=breadcrumb :style="{margin: '16px 0'}">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Layout</BreadcrumbItem> -->
      <RadioGroup   @on-change="setEnv" v-model="env"  type="button" style="margin-right: 50px">
        <Radio label="T1"></Radio>
        <Radio label="T2"></Radio>
        <Radio label="T3"></Radio>
        <Radio label="P1"></Radio>
        <Radio label="D1"></Radio>
        <Radio label="D2"></Radio>
      </RadioGroup>

      <RadioGroup @on-change="setEnv" v-model="dept" type="button">
        <!--<Radio label="全部服务"></Radio>-->
        <Radio label="消费金融"></Radio>
        <Radio label="金融服务"></Radio>
        <Radio label="风控系统"></Radio>
        <Radio label="后台系统"></Radio>
        <Radio label="公用服务"></Radio>
        <Radio label="前端项目"></Radio>
        <Radio label="全部服务"></Radio>
      </RadioGroup>
    </Breadcrumb>

  <Table border :columns="columns12" :data="data6" :loading="tableLoading">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.package_name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button v-if="(row.jar_type=='jar' ||row.jar_type=='war') && row.server_status!=0" type="primary" size="small" style="margin-right: 5px" @click="startServer(index)"  >重启</Button>
           <Button v-if="(row.jar_type=='jar' ||row.jar_type=='war') && row.server_status==0" type="primary" size="small" style="margin-right: 5px" @click="startServer(index)" disabled >重启</Button>
            <Button v-if="row.jar_type=='jar' ||row.jar_type=='war'" type="error" size="small" style="margin-right: 5px" @click="modalUp(index)"  :loading="row.loading1"  >停止</Button>
          <!--<Button v-if="(row.jar_type=='jar' ||row.jar_type=='war')&&row.loading1==true" type="error" size="small" style="margin-right: 5px" @click="modalUp(index)"  loading >停止</Button>-->
          <!--<Button v-if="(row.jar_type=='jar' ||row.jar_type=='war')" type="error" size="small" style="margin-right: 5px" @click="modalUp(index)"   >停止</Button>-->
           <Button v-if="row.jar_type=='zip' " type="primary" size="small" style="margin-right: 5px" @click="startServer(index)">部署</Button>
          <Button type="info" size="small" @click="getStartInfo(index)">日志</Button>
        </template>

        <template slot-scope="{ row, index }" slot="server_status">
         <span v-if="row.server_status==1"  > <Tag type="dot"  color="success">正常</Tag></span>
          <span v-if="row.server_status==0 && row.jar_type!='zip'  " > <Tag type="dot" color="warning">启动中</Tag></span>
          <Tooltip :content="tipContent" @on-popper-show="getTips(row)" placement="top-start">
          <span v-if="row.server_status==2" > <Tag type="dot"  color="error">停止</Tag></span>
          </Tooltip>
          <Tooltip :content="tipContent" @on-popper-show="getTips(row)" placement="top-start">
          <span v-if="row.server_status==3" > <Tag type="dot"  color="error">异常</Tag></span>
          </Tooltip>
          <span v-if="row.server_status==4" > <Tag type="dot"  color="error">未检查</Tag></span>
          <span v-if="row.jar_type=='zip'" > <Tag type="dot"  color="success">无状态</Tag></span>
        </template>
    </Table>

        <Modal
          v-model="modal"
          title="停止"
          @on-ok="ok"
          @on-cancel="cancel">
          <p>你确定要停止服务么</p>

        </Modal>

        <Modal
          v-model="modal_log"
          :title="modal_title"
          width="96% !important;"

          >
          <p style="white-space: pre-line">{{modal_body}}</p>
          <div slot="footer" >
            <Button type="info" :loading="modal_loading" @click="getScriptLog(server_name)">启动脚本日志</Button>
            <Button type="info"  :loading="modal_loading" @click="getServerLog(server_name)">服务器倒数500行日志</Button>
          </div>
        </Modal>

  </div>
</template>

<script>

import {getAllServers} from "@/api/devops";
import {startSever} from "@/api/devops";
import {stopServer} from "@/api/devops";
import {checkStatus} from "@/api/devops";
import {sleep} from "@/lib/utils";
import {getLastLog} from "@/api/devops";
import {getTips} from "@/api/devops";
import {getServerLog} from "@/api/devops";
export default {
        data () {
            return {
                columns12: [
                    {
                      title: '服务名',
                      key: 'package_name',
                      width:220,
                      align: 'center',
                      slot: 'name',
                    },
                    {
                        title: '分支',
                        key: 'branch',
                      align: 'center',
                      minWidth:220,
                    },
                    {
                        title: 'git版本',
                        key: 'git_version',
                       width:170,
                      align: 'center'
                    },
                    {
                      title: 'http端口',
                      key: 'port',
                      width:100,
                      align: 'center'
                    },

                    {
                      title: 'dubbo端口',
                      key: 'dubbo_port',
                      width:100,
                      align: 'center'
                    },

                    {
                      title: '上次启动时间',
                      key: 'last_up_time',
                      align: 'center',
                      minWidth:100,
                    },
                  {
                    title: '上次打包时间',
                    key: 'last_package_time',
                    align: 'center',
                    minWidth:100,
                  },
                  {
                    title: '状态',
                    slot: 'server_status',
                    width:130,
                    align: 'center'
                  },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 200,
                        align: 'center'
                    }
                ],
                data6: [

                ],
              env:'T1',
              time_ineterval:"", //实现循环访问
              loading:false,
              modal:false,
              index:"",
              modal_title:"",
              modal_body:"",
              modal_log:false,
              dept:"消费金融",  //部门
              tableLoading:true, //table是否loading
              tipContent:"",
              //日志新加
              server_name:"", //得到servername
              script_log:"",
              fullscreen:false,
              modal_loading:false

            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[devops].name}<br>Age：${this.data6[devops].age}<br>Address：${this.data6[devops].address}`
                })
            },
            remove (index) {
                this.data6.splice(devops, 1);
            },
          //notice
            info (nodesc) {
              this.$Notice.info({
                title: '启动中',
                desc: nodesc ? nodesc : '开始启动中 '
              });
            },

            genTableData(){

              getAllServers({env:this.env,dept:this.dept}).then(res=>{
                //console.log(res)
               // console.log(res.data.data)
                this.data6=res.data.data
                this.tableLoading=false
              })

            },
            setEnv(){
              //console.log("ssss")
              this.$router.push({name: 'devops_server_list',params:{"env":this.env,"dept":this.dept}})
              this.tableLoading=true //切换时候
              getAllServers({env:this.env,dept:this.dept}).then(res=>{

                this.data6=res.data.data
                this.tableLoading=false
              })
            },
            //确认现在是开启还是关闭状态
           check_interval(index){
             var server_name = this.data6[index].server_name
             checkStatus({env: this.env, server_name: server_name}).then(res => {
               //console.log(this.data6)
               if(res.data.data.server_status==1||res.data.data.server_status==2){
                 this.data6[index].server_status = res.data.data.server_status
                 clearInterval(this.time_ineterval);
                 //this.loading=false
                 //this.data6[this.index].loading1=false
               }
             })
           },
           startServer(index) {
              //给notice
              this.info(this.data6[index].server_name+"开始启动.......")
             //逻辑开始
             var server_name = this.data6[index].server_name
             //console.log(this.data6[index].server_name)
             startSever({env: this.env, server_name: server_name}).then(res => {
              // console.log(res)
               this.data6[index].server_status = res.data.data.server_status
               this.data6[index].last_up_time = res.data.data.last_up_time
             })
             //sleep
             sleep(20000).then(() => {
               this.time_ineterval=setInterval(this.check_interval,5000,index);
             })
           // this.time_ineterval=setInterval(this.check_interval,5000,index);
          },
          stopServer(){
            var server_name = this.data6[this.index].server_name
            //console.log(this.data6[index].server_name)
            //this.data6[this.index].loading1=true
            this.loading=true
            console.log(this.data6)
            stopServer({env: this.env, server_name: server_name}).then(res => {
              console.log(res)
              this.time_ineterval=setInterval(this.check_interval,5000,this.index);

            })
           // this.time_ineterval=setInterval(this.check_interval,5000,index);
          },
          //model用
          ok () {
            this.stopServer()
          },
          cancel () {
           //pass
          },
          modalUp(index){
              this.modal_title="停止"
              this.modal_body="你确定要停服务么"
              //循环给data6赋值
            //   for(var i=0,l=this.data6.length;i<l;i++){
            //     this.data6[i].loading1=false
            //     console.log("xxx")
            // }
            //this.data6[index].loading1=true
              this.index=index
              this.modal=true
          },

          //info log
          getStartInfo(index){
            var server_name = this.data6[index].server_name
             getLastLog({env: this.env, server_name: server_name}).then(res=>{
               this.modal_body=res.data.data.script_log
               this.modal_title=server_name
               this.modal_log=true
               //给server_name值
               this.server_name=server_name
               this.script_log=res.data.data.script_log
             })
          },
          getTips(row){
            var server_name=row.server_name
            getTips({env: this.env, server_name: server_name}).then(res=>{
              console.log(res)
              this.tipContent=res.data.data.error_message
            })

          },
          //脚本日志
          getScriptLog(server_name){
            this.modal_body=this.script_log
          },
          getServerLog(server_name){
              this.modal_loading=true
              getServerLog({env: this.env, server_name: server_name}).then(res=>{
              //console.log(res)

              this.modal_body=res.data.data.script_log
                this.modal_loading=false
            })

          }


        },


        mounted() {
          this.env=this.$route.params.env
          this.dept=this.$route.params.dept
          this.genTableData()
        }
}
</script>
