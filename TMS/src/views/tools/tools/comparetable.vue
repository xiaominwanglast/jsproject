<template>
  <div class="ende">
    <Row :gutter="10">
      <Col :md="24" :lg="24">
        <Card class="ende_interval">
          <div class="ende_title">
            <Icon type="ios-grid" size="18"/>
            <span class="span_mar">SQL</span>
          </div>
          <div class="ende_input">
            <label style="float: left;width:110px;padding-top: 5px">选择数据库类型</label>
            <Select v-model="model1" style="float: left;width:100px;margin-bottom: 4px" >
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="value1" placeholder="填写数据库名称" style="width: 200px;margin-left: 5px" />
            <Input v-model="text1" type="textarea" :rows="3" placeholder="请输入SQL语句......" />
          </div>
          <hr />
          <div class="ende_input">
            <label style="float: left;width:110px;padding-top: 5px">选择数据库类型</label>
            <Select v-model="model2" style="float: left;width:100px;margin-bottom: 4px" >
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="value2" placeholder="填写数据库名称" style="width: 200px;margin-left: 5px" />
            <Input v-model="text2" type="textarea" :rows="3" placeholder="请输入SQL语句......" />
          </div>
          <Button class="easy_button" type='primary' @click="easydecrypt()">对比</Button>
        </Card>
        <Card class="ende_interval">
          <div class="ende_title">
            <Icon type="ios-grid" size="18"/>
            <span class="span_mar">结果</span>
          </div>
          <div class="ende_input" v-if="this.ret">
            <Input v-model="ret" type="textarea" :autosize="{minRows:20}"/>
          </div>
          <div style="text-align: center" v-else>
            {{text1}}+{{text2}}
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
    import {easydecrypt, endecrypt} from "@/api/tools";
    // import { try } from 'q';
    export default {
        data(){
            return{
                text1:'',
                text2:'',
                ret:'',
                cityList: [
                    {
                        value: 'hive',
                        label: 'hive'
                    },
                    {
                        value: 'mysql',
                        label: 'mysql'
                    },
                    {
                        value: 'clickhouse',
                        label: 'clickhouse'
                    },
                ],
                model1:"",
                model2:"",
                value1:"",
                value2:"",
            }
        },
        methods:{
            easydecrypt(){
                if (this.text == ''){
                    this.$Notice.error({title:'提示', desc:'请输入加解密的内容'})
                }else{
                    console.log(111,this.text)
                    easydecrypt(this.text).then(response => {
                        console.log(response.status,response.data.data)
                        this.ret = response.data.data
                    })
                }
            },
            endecrypt(type){
                // this.ret =''
                console.log(type)
                if (this.text == ''){
                    this.$Notice.error({title:'提示', desc:'请输入加解密的内容'})
                }else{
                    endecrypt(this.text, type).then(response => {
                        console.log(response.status,response.data.data)
                        this.ret = response.data.data
                        console.log("222",this.ret)
                    },error =>{
                        console.log("1111",this.ret)
                        this.ret = "失败"
                    })
                }
            }
        }
    }
</script>


<style lang="less" scoped>
  .ende{
    .ende_interval{
      margin-bottom: 20px;
      padding-bottom: 10px;
      .ende_title{
        .span_mar{
          margin-left: 10px;
        }
      }
      .ende_input{
        margin: 20px 50px;;

      }
      .ende_buttonList{
        margin-left: 100px;
        .easy_button{
          // background: blue;
        }
        .en_button{
          margin-left: 20px;
        }
        .intervel_10{
          // margin-left: 10px;
        }
      }
    }
  }
</style>

