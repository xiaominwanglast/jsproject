<template>
    <div class="adduser">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <Card class='interval' :loading="cardLoading">
                    <div class="title">
                        <Icon type="ios-grid" size="18"/>
                        <span class="span_mar">选择项</span>
                    </div>
                    <div class="env1">
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
                    <div class="env1">
                        产品：
                        <RadioGroup  @on-change="setProduct" v-model="product"  type="button" >
                            <div class="radio">
                                <Radio class='radio_width' label="立即贷" disabled></Radio>
                                <Radio class='radio_width' label="畅借款"></Radio>
                                <Radio class='radio_width' label="好借款"></Radio>
                                <Radio class='radio_width' label="2345借款"></Radio>
                                <Radio class='radio_width' label="黄金屋"></Radio>
                            </div>
                        </RadioGroup>
                    </div>
                    <div class="env1">
                        开始：
                        <RadioGroup @on-change="updateButton" v-model="start"  type="button" >
                            <div class="radio">
                                <Radio  v-for="item in stepList" :key="item"  class='radio_width' :label='item'></Radio>
                            </div>
                        </RadioGroup>
                    </div>
                    <div class="env1">
                        结束：
                        <RadioGroup @on-change="updateButton" v-model="end"  type="button" >
                            <div class="radio">
                                <Radio  v-for="item in stepList" :key="item"  class='radio_width' :label='item'></Radio>
                            </div>
                        </RadioGroup>
                    </div>
                    <div class="env1">
                        手机号：
                        <Input class="radio" v-model="phone" :maxlength="11" placeholder="请输入手机号" style="width: auto" number/>
                        银行卡：
                        <span>
                            <Select v-model="bin" filterable clearable style="width: 110px">
                                <Option v-for="item in bankList" :value="item.bin" :key="item.id">{{ item.bankname }}({{ item.bin }})</Option>
                            </Select>
                        </span>
                        <Input class="radio" v-model="bankothercard" :maxlength="13" placeholder="卡号或银行名称" style="width: auto" />
                        注：可不填，即随机生成
                    </div>
                    <div class="submit">
                        <div class="success" v-if="this.successInfo" v-html="this.successInfo"></div>
                        <div class="error" v-if="this.interfaceInfo">
                            <div>报错接口:&nbsp;&nbsp;{{ this.url }}</div>
                            </br>
                            <div>报错信息:&nbsp;&nbsp;{{ this.interfaceInfo }}</div>
                        </div>
                        <div v-if="this.current_step" style="color: #a24949;">
                            【 用户：{{ this.current_phone }},uid:{{ this.uid }},cid:{{ this.cid }}&nbsp;&nbsp;&nbsp;&nbsp;正在进行:&nbsp;&nbsp;&nbsp;&nbsp;------------{{ this.current_step }}------------ 】     
                        </div>
                        <Button type='primary' :loading="buttonloading" @click="adduser()">{{ this.buttonText }}</Button>
                    </div>
                </Card>
                <Card class='interval'>
                    <div class="title">
                        <Icon type="ios-grid" size="18"></Icon>
                        <span class="span_mar" >操作记录</span>
                        <div class="isme">
                            <Button class="isme_button" @click="setme()">
                            {{ isme_text }}
                            </Button>
                        </div>
                    </div>
                    <div class="operator2">
                        <div v-if="this.hasData">暂无操作记录</div>
                        <div v-else v-for="item in codeList" :key="item.id" >{{ item.operate_time }}&nbsp;&nbsp;-{{ item.user_name }}-{{ item.product }}-【{{ item.phone }}】-到-{{ item.current_step }}-uid:{{ item.uid }}-cid:{{ item.cid }}-{{item.name}}-{{item.idcard}}-
                            <span v-if='item.status!="fail"'>{{item.status}}</span>
                             <span v-if='item.status=="fail"' class="span_mar" style="width:50%; margin: 0 0 0 -5px">
                                <Poptip trigger="hover">
                                <span style="font-size:15px">&nbsp;<u>{{ item.status }}</u></span>
                                <div style="color:red" slot="content">
                                    {{ item.url }}
                                    <br v-if="item.url">
                                    <br v-if="item.url">
                                    {{ item.errorinfo?item.errorinfo:'无信息' }}
                                </div>
                                </Poptip>
                            </span>
                            <span>
                                -<Button class="card_button" type="text" size="small" @click="queryCardInfo(item.name, item.idcard, item.phone)"> 显示身份证 >> </Button>
                            </span>
                        </div>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :page-size="20" :current.sync="current" @on-change="changePage"></Page>
                            </div>
                        </div>
                    </div>
                </Card> 
            </Col>
        </Row>
    </div>
    
 
</template>
<script>

import {change, getstep, adduser, getcurrentstep, accountoperate, getbankbin} from "@/api/tools";
import { constants, copyFile } from 'fs';
import {sleep} from "@/lib/utils";
import { setTimeout } from 'timers';
    // import { constants } from 'fs';
    export default {
        data() {
            return {
                env: window.localStorage.getItem('env') || 'T1',
                product: window.localStorage.getItem('product') || '2345借款',
                start: '',
                end:'',
                interfaceInfo:'',
                hasData: false,
                buttonText: '提交',
                buttonloading: false,
                total: 100,
                current: 1,
                bin:'',
                isme: false,
                isme_text: '' || '显示自己',
                bankothercard:'',
                bankList:[],
                productList:[
                    {
                        value: '畅借款',
                        label: 'cjk'
                    },
                    {
                        value: '立即贷',
                        label: 'ljd'
                    },
                    {
                        value: '2345借款',
                        label: '2345jk'
                    },
                    {
                        value: '黄金屋',
                        label: 'hjw'
                    },
                ],
                status:'',
                stepList:[],
                phone: '',
                hasData: false,
                codeList:[],
                cardLoading:false,
                successInfo:'',
                serial_num: 1557396338244,
                current_step:'',
                status:'',
                url:'',
                uid:'220000000000001768',
                cid:'220000000000001768',
                current_phone:'13412340001',
                current_step_index:0,

            }
        },
        created() {
            this.fetchData()
        },
        methods:{
            fetchData() {
            this.listLoading = true   
            this.getstep(this.product)
            this.accountoperate(1,20)
            this.getBankBin()
            },
            getBankBin(){
                getbankbin().then(reponse => {
                    console.log(reponse.data)
                    this.bankList = reponse.data.data
                })
            },
            changePage(){
                console.log('current',this.current)
                this.accountoperate(this.current, 20)
            },
            getstep(product){
                getstep(product).then(response => {
                    this.stepList = response.data.data
                    this.start = this.stepList[0]
                    console.log(this.stepList)
                })
            },
            getcurrentstep(){
                getcurrentstep(this.serial_num).then(response =>{
                    let data = response.data.data
                    this.uid = data.uid
                    this.cid = data.cid
                    this.current_phone = data.phone
                    console.log(this.end, data.current_step)
                    if (data.status == 'fail'){
                        this.interfaceInfo = data.errorinfo
                        this.url = data.url
                        this.current_step = ''
                        this.buttonText = '提交'
                        this.buttonloading = false
                        console.log(data)
                        this.accountoperate(1, 20)
                    }else if(this.end == data.current_step && data.status == 'success'){
                        console.log('成功？')
                        this.successInfo = '操作成功---phone:【' + this.current_phone + '】, uid:【' + this.uid + '】, cid:【' + this.cid + '】'
                        this.current_step = ''
                        this.buttonText = '提交'
                        this.buttonloading = false
                        this.accountoperate(1, 20)
                    }else {
                        this.current_step = data.current_step;
                        setTimeout(this.getcurrentstep, 1000);
                        console.log(data)
                    }
                })
            },
            adduser(){
                this.interfaceInfo = ''
                this.successInfo = ''
                let step = this.start + '-' + this.end
                let startIndex = this.stepList.indexOf(this.start)
                let endIndex = this.stepList.indexOf(this.end)
                if (this.end == ''){
                    this.$Notice.error({title: '提示', desc: '请选择结束步骤'})
                }
                else if(endIndex < startIndex ){
                    this.$Notice.error({title: '提示', desc: '结束步骤不能在开始步骤前面'})
                }
                else if (startIndex !=0 && this.phone == ''){
                    this.$Notice.error({title: '提示', desc: '该选择需填入手机号'});
                }else{
                    this.buttonText = '造号中'
                    this.buttonloading = true
                    this.cardLoading = true;
                    // sleep(10);
                    var date = new Date();
                    this.serial_num = date.getTime()
                    adduser(this.phone, this.stepList.indexOf(this.start), this.stepList.indexOf(this.end), this.env, this.product, this.serial_num, this.bin, this.bankothercard).then(response => {
                    })
                    this.getcurrentstep()
                    setTimeout(this.updateButton,2000)
                }
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
            setEnv(){
              window.localStorage.setItem('env', this.env)
              this.tableLoading=true
              this.updateButton() 
              this.accountoperate(1,20)
            },
            updateButton(){
              this.buttonloading = false  
              this.buttonText = '提交'
            },
            setProduct(){
              window.localStorage.setItem('product', this.product)
              this.tableLoading=true
              this.updateButton()  
              this.getstep(this.product)
            },
            accountoperate(pageNo,pageSize){
                accountoperate(this.env,pageNo,pageSize,this.isme).then(response =>{
                    console.log(this.env)
                    if (response.data.data.length == 0){
                        this.hasData = true
                    }else{
                        this.codeList = response.data.data.codeList
                        this.total = response.data.data.total
                        console.log(this.codeList)
                        this.hasData = false
                    }
                    console.log(this.hasData)
                    }
                )
            },
            queryCardInfo(name, idcard, phone){
                this.$router.push({ name:'tools_createcard',query:{'name': name, 'idcard':idcard, 'phone':phone} })
            },
            setme(){
                this.isme = !this.isme;
                if (this.isme == true){
                    this.isme_text="显示全部"
                }else{
                    this.isme_text="显示自己"
                }
                this.accountoperate(1, 20)
            }
        }
    }
</script>

<style lang="less">
    .adduser{
        .span_mar{
            margin-left: 10px;
            margin-right: 10px;
            font-size: 12px;
        }
        .isme{
            line-height: 30px;
            .isme_button{
                float: right;
                margin-right: 20px;
            }
        }
        .env1{
            text-align: left;
            padding: 10px 50px 0;
            .radio{
                line-height: 50px;
                .radio_width {
                width: 100px;
                }
            }
        }
        .submit{
            padding: 10px 20px;
            text-align: center;
            .error{
                margin-top: 20px;
                color: red;
            }
            .success{
                margin-top: 20px;
                color: #19be6b;
                margin: 0 200px;
            }
            Button{
                margin-top: 30px;
                width: 200px;
                margin-left: 10px;
                margin-right: 10px;
                font-size: 12px;
                padding: 8px 50px;
            }
        }
        .interval{
            margin-bottom: 20px;
        }
        .title{
            line-height: 30px;
        }
        .operator2{
            margin-left: 0px;
            text-align: left;
            line-height: 50px;
            padding-left: 50px;
            font-size: 15px;
            .card_button{
                font-size: 12px;
            }
        }
    }
</style>
