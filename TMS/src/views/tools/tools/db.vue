<template>
    <div class="db">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <Card class='interval'>
                    <div class="title">
                        <Icon type="ios-grid" size="18"/>
                        <span class="span_mar">选择项</span>
                    </div>
                    <div class="env">
                        环境：
                        <RadioGroup  @on-change="setEnv" v-model="env"  type="button" >
                            <div class="radio">
                                <Radio class='radio_width' label="T1"></Radio>
                                <Radio class='radio_width' label="T2"></Radio>
                                <Radio class='radio_width' label="T3"></Radio>
                                <Radio class='radio_width' label="P1"></Radio>
                                <Radio class='radio_width' label="D1"></Radio>
                                <Radio class='radio_width' label="D2"></Radio>
                            </div>
                        </RadioGroup>
                    </div>
                    <div class="env">
                        产品：
                        <RadioGroup  @on-change="setProduct" v-model="product"  type="button" >
                            <div class="radio">
                                <Radio class='radio_width' label="立即贷"></Radio>
                                <Radio class='radio_width' label="畅借款"></Radio>
                                <Radio class='radio_width' label="好借款"></Radio>
                                <Radio class='radio_width' label="2345借款"></Radio>
                                <Radio class='radio_width' label="黄金屋"></Radio>
                            </div>
                        </RadioGroup>
                    </div>
                    <div class="env" style="line-height:50px;">
                        手机号：
                        <Input v-model="phone" placeholder="请输入手机号" :maxlength="11" style="width: auto" />
                    </div>
                </Card>
                <Card class='interval_button'>
                    <div class="title">
                        <Icon type="ios-grid" size="18"/>
                        <span class="span_mar">更改状态</span>
                    </div>
                       <div class="desc_info">
                        <div class="desc_left">
                            <div class="desc">更改逾期：</div>
                        </div>
                        <div class="button_right">
                            <div>
                                <span style="margin-left:10px;" v-if=" product != '2345借款'">产品天数：
                                    <Input v-model="period" disabled placeholder="请输入手机号" style="width: auto" /> 
                                </span>
                                <span style="margin-left:10px;" v-else>当前期数：
                                    <Input v-model="period" disabled style="width: auto" /> 
                                </span>
                                <span style="margin-left:10px;">
                                    借款天数：
                                <Input v-model="day" number style="width: auto" />
                                </span>
                                <Button type="primary" :disabled=" this.product == '2345借款' ? true : false " @click="changeOverdue()"> 更改逾期 </Button>
                            </div>
                        </div>
                    </div>
                    <div class="desc_info">
                        <div class="desc_left">
                            <div class="desc">运营商：</div>
                        </div>
                        <div class="button_right">
                           <div>
                                <Button type="primary" @click="change(0,'operator')"> 认证运营商 </Button>
                                <Button type="info" @click="change(1,'operator')"> 不认证运营商 </Button>
                            </div>
                        </div>
                    </div>
                    <div class="desc_info">
                        <div class="desc_left">
                            <div class="desc">信用卡：</div>
                        </div>
                        <div class="button_right">
                            <div>
                                <Button type="primary" @click="change(0,'card')"> 认证信用卡 </Button>
                                <Button type="info" @click="change(1,'card')"> 不认证信用卡 </Button>
                            </div>
                        </div>
                    </div>
                    <div class="desc_info">
                        <div class="desc_left">
                            <div class="desc">orc通道：</div>
                        </div>
                        <div class="button_right">
                            <div>
                                <Button type="primary" @click="change(0,'ocr')">   微众WZ   </Button>
                                <Button type="primary" @click="change(1,'ocr')">   FACE++   </Button>
                            </div>
                        </div>
                    </div>
                    <div class="desc_info">
                        <div class="desc_left">
                            <div class="desc">验证码：</div>
                        </div>
                        <div class="button_right">
                            <div>
                                <Button type="primary" @click="clearRedis()">   清除验证码缓存   </Button>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card class='interval'>
                    <div class="title">
                        <Icon type="ios-grid" size="18"></Icon>
                        <span class="span_mar">操作记录</span>
                    </div>
                    <div class="operate_code">
                        <!-- <Button type="success" @click="operate()"> 操作记录</Button> -->
                        <p v-if="this.hasData">暂无操作记录</p>
                        <p v-else v-for="item in codeList" :key="item.id" >{{ item.operate_time }}&nbsp;&nbsp;【&nbsp;{{ item.user_name }}&nbsp;】设置【&nbsp;{{ item.product }}&nbsp;】的用户【&nbsp;{{ item.phone }}&nbsp;】的【&nbsp;{{ item.project }}&nbsp;】为【&nbsp;{{ item.option }}&nbsp;】</p>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
 
</template>
<script>

    import {change, operate, changeoverdue, clearredis} from "@/api/tools";
import { constants } from 'fs';
    // import { constants } from 'fs';
    export default {
        data() {
            return {
                env: window.localStorage.getItem('env') || 'T1',
                product: window.localStorage.getItem('product') || '2345借款',
                phone: '',
                hasData: false,
                day: null,
                value1: null,
                hidden: true,
                project: null,
                dbNum: window.localStorage.getItem('dbNum'),
                period: window.localStorage.getItem('period') || 14,
                codeList1:[
                    {
                        username: 'xiaosong',
                        product: '立即贷',
                        project: '运营商',
                        option:'认证'
                    },
                    {
                        username: 'xiaosong',
                        product: '立即贷',
                        project: '运营商',
                    },
                    {
                        username: 'xiaosong',
                        product: '立即贷',
                        project: '运营商',
                    },
                ],
                codeList:[],
            }
        },
        created() {
            this.fetchData()
        },
        methods:{
            fetchData() {
            this.listLoading = true
            this.operate()
            },
            change(num, way){
                console.log(this.env)
                if(this.phone && this.phone.length == 11 && !isNaN(this.phone)){
                    change(this.phone, num, this.env, way, this.product).then(response => {
                        console.log(response.data.message)
                        if (response.data.status){
                            this.$Notice.success({title: '请求成功', desc: response.data.message});
                        }
                        else{
                            this.$Notice.error({title: '提示', desc: response.data.message});
                        }
                        this.operate()
                    })
                }
                else{
                    this.$Notice.error({title: '提示', desc: "请填写正确的手机号"});
                }
            },
            sethidden(){
                console.log(this.value1)
                this.hidden = false
            },
            setEnv(){
              this.$router.push({name: 'tools_dbtools',params:{"env":this.env}})
              window.localStorage.setItem('env', this.env)
              this.tableLoading=true
              this.operate()
            },
            setProduct(){
              window.localStorage.setItem('product', this.product)
              if(this.product == '2345借款'){
                  window.localStorage.setItem('period', 1)
                  this.period = 1
                  window.localStorage.setItem('dbNum', 9)
                  this.dbNum = 9
              }else{
                  window.localStorage.setItem('period', 14)
                  this.period = 14
                  window.localStorage.setItem('dbNum', 15)
                  this.dbNum = 15
              }
              this.tableLoading=true
            },
            operate(){
                operate(this.env).then(response =>{
                    console.log(this.env)
                    if (response.data.data.length == 0){
                        this.hasData = true
                    }else{
                        this.codeList = response.data.data
                        console.log(this.codeList)
                        this.hasData = false
                    }
                    console.log(this.hasData)
                    }
                )
            },
            changeOverdue(){
                if(this.day == null || this.phone == ''){
                    this.$Notice.error({title:'提示',desc:"请输入手机号和借款天数"})
                }else{
                    changeoverdue(this.phone, this.env, this.day, this.product, this.period).then(response =>{
                    console.log(response.data)
                    if(response.data.status){
                        this.$Notice.success({title:'提示',desc:response.data.message})
                    }else{
                        this.$Notice.error({title:'提示',desc:response.data.message})
                    }    
                })
                }
            },
            clearRedis(){
                if(this.phone == ''){
                    this.$Notice.error({title:'提示',desc:"请填写正确的手机号"})
                }
                else{
                    clearredis(this.env, this.dbNum, this.phone, '借款验证码', this.product).then(response =>{  
                    if (response.data.data){
                        this.$Notice.error({title:'提示',desc:response.data.data})
                    }
                    else{
                        this.$Notice.success({title:'提示',desc:response.data.message})
                    }
                    })
                }
                
            }
        }
    }
</script>

<style lang="less">
    .db{
        Button{
            width: 200px;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 12px;
            padding: 8px 50px;
            // line-height: 30px;
        }
        .span_mar{
            margin-left: 10px;
            margin-right: 10px;
            font-size: 12px;
        }
        .env{
            margin-left: 50px;
            text-align: left;
            .radio{
                line-height: 50px;
                .radio_width {
                width: 100px;
                }
            }
        }
        // .ivu-radio-group-button .ivu-radio-wrapper:hover .ivu-radio {
        //     background-color:  cyan;
        // }
        // .ivu-radio-group-button .ivu-radio-wrapper-checked {
        //         background: cyan;
        // }
        .interval{
            margin-bottom: 20px;
        }
        .title{
            line-height: 30px;
        }
        .operator{
            margin-bottom: 20px;
            margin-left: 200px;
            text-align: left;;
            line-height: 50px;
            // margin-left: 200px;
            font-size: 15px;
            // height: 300px;
        }
        .operate_code{
            text-align: left;
            line-height: 50px;
            font-size: 15px;
            padding: 10px 30px;
        }
        .interval_button{
            margin-bottom: 20px; 
            .desc_info{
                line-height: 50px;
                margin-bottom: 20px;
                .desc_left{
                display: inline-block;
                width: 10%;
                text-align: left;
                margin: 0 50px;
                font-size: 14px;
                .desc{
                    padding-left: 0%;
                    }
                }
                .button_right{
                    position: absolute;
                    display: inline-block;
                    width: 70%;
                }
            }
        }
    }
</style>
