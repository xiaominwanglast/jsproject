<template>
    <div class="create_card">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <Card style="margin-bottom:30px;">
                    <div class="card_title">
                        <Icon type="ios-grid" size="18"/>
                        <span class="span_mar">生成身份证</span>
                    </div>
                    <div class="card">
                        <img src="@/assets/img/666666.png"/>
                        <div class="name" id="name">{{ name }}</div>
                        <div class="gander" id="gander">{{ sex }}</div>
                        <div class="national" id="national">{{ national }}</div>
                        <div class="year" id="year">{{ year }}</div>
                        <div class="month" id="month">{{ month }}</div>
                        <div class="day" id="day">{{ day }}</div>
                        <div class="idcard" id="idcard">{{ idcard }}</div>
                        <div class="city" id="city">{{ city }}</div>
                        <div class="street" id="street">{{ street }}</div>
                        <div class="expiradate" id="expiradate">{{ expiradate }}</div>
                        <div class="input_info">
                            &nbsp;&nbsp;&nbsp;&nbsp;姓名：
                                <Input class="input_name" v-model="inputname" clearable style="width: 200px" />
                            &nbsp;&nbsp;&nbsp;&nbsp;身份证号：
                                <Input class="input_card" :maxlength="18" clearable v-model="inputidcard" style="width: 200px" />
                                &nbsp;&nbsp;&nbsp;&nbsp; 注：可不填，即随机生成
                                <Button class="submit_button" type='primary' @click="getuserInfo(inputname, inputidcard, '')">生成</Button>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div class="card_title">
                        <Icon type="ios-grid" size="18"/>
                        <span class="span_mar">操作记录</span>
                        <div class="isme">
                            <Button class="isme_button" @click="setme()">
                            {{ isme_text }}
                            </Button>
                        </div>
                    </div>
                    <div class="codelist">
                        <p style="text-align:center;" v-if="!this.codeList">暂无操作记录</p>
                        <div class="code" v-for="item in codeList" :key="item.id" >{{ item.operate_time }} 【{{ item.username }}】 生成身份证号=====> 姓名:【{{ item.name }}】,性别:{{ item.gander }},{{ item.birthday_y }}年{{ item.birthday_m }}月{{ item.birthday_d }}日,身份证:【{{ item.idcard }}】,民族:{{ item.national }},地址:{{ item.address_1 }}{{ item.address_2 }},
                            <span v-if="item.phone">
                                手机号:【{{ item.phone }}】
                            </span>
                            <span>
                                 -<Button class="re_button" type="text" size="small" @click="reCardInfo(item)"> 显示身份证 >> </Button>
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
import {getuserInfo, getuserinfocode} from "@/api/tools";
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            total:1,
            pageSize:20,
            current:1,
            codeList:[],
            inputname:'',
            inputidcard:'',
            isme: false,
            phone:'',
            isme_text: '' || '显示自己',
            name:'',
            sex:'',
            year:'',
            month:'',
            day:'',
            idcard:'',
            city:'',
            street:'',
            national:'',
            expiradate:'2018.09.01-2038.09.31',
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
            var queryName = this.$route.query.name || '';
            var queryCard = this.$route.query.idcard || '';
            var queryPhone = this.$route.query.phone || '';
            console.log(111,this.inputname,this.inputidcard)
            if (queryName && queryCard){
                this.getuserInfo(queryName, queryCard, queryPhone)
            }
            this.getuserinfocode()
        },
        getuserInfo(name,card,phone){
            getuserInfo(name, card, phone).then(response => {
                var data = response.data.data
                this.name = data.name
                this.sex = data.gander
                this.year = data.birthday_y
                this.month = data.birthday_m
                this.day = data.birthday_d
                this.idcard = data.idcard
                this.city = data.address_1
                this.street = data.address_2
                this.national = data.national
                this.phone = phone
                this.expiradate = '2018.09.01-2038.09.01'
            })
            setTimeout(this.getuserinfocode,1000)
            // this.getuserinfocode(this.current, 20)
        },
        getuserinfocode(){
            getuserinfocode(this.current,20,this.isme).then(response =>{
                let data = response.data.data
                this.total = data.total
                this.codeList = data.codeList
            })
        },
        changePage(){
            console.log('current',this.current)
            this.getuserinfocode(this.current, 20)
        },
        reCardInfo(data){
                this.name = data.name
                this.sex = data.gander
                this.year = data.birthday_y
                this.month = data.birthday_m
                this.day = data.birthday_d
                this.idcard = data.idcard
                this.city = data.address_1
                this.street = data.address_2
                this.national = data.national
                this.expiradate = '2018.09.01-2038.09.31'
        },
        setme(){
            this.isme = !this.isme;
            if (this.isme == true){
                this.isme_text="显示全部"
            }else{
                this.isme_text="显示自己"
            }
            this.getuserinfocode()
        }
    }
}
</script>
<style lang="less" scoped>
    .create_card{
        .card{
            position: relative;
            margin-left: 100px;
            .name{
                position: absolute;
                top: 60px;
                left: 105px;
                font-size: 16px;
            }
            .gander{
                position: absolute;
                top: 90px;
                left: 105px;
                font-size: 16px;
            }
            .national{
               position:absolute;
               top: 90px;
               left: 198px;
               font-size: 16px;
            }
            .year{
                position:absolute;
                top:125px;
                left:100px;
                font-size:16px;
            }
            .month{
                position:absolute;
                top:125px;
                left:167px;
                font-size:16px;
            }
            .day{
                position:absolute;
                top:125px;
                left:209px;
                font-size:16px;
            }
            .idcard{
                position:absolute;
                top:244px;
                left:180px;
                font-size:22px;
            }
            .city{
                position:absolute;
                top:160px;
                left:100px;
                font-size:16px;
            }
            .street{
                position:absolute;
                top:190px;
                left:100px;
                font-size:16px;
            }
            .expiradate{
                position:absolute;
                top:254px;
                left:714px;
                font-size:16px;
                font-weight: 600 
            }
            .input_info{
                line-height: 50px;
                .input_name{
                    margin-left: 20px;
                }
                .input_card{
                    margin-left: 20px;
                }
            }
        }
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
        .card_title{
            margin-bottom: 20px;
        }
        .submit_button{
            margin-left: 30px;
            margin-right: 10px;
            font-size: 12px;
            width: 100px;
        }
        .codelist{
            margin: 10px 50px;
            text-align: left;
            .code{
                line-height: 50px;
                font-size: 15px;
            }
            .re_button{
                color: blue;
            }
        }
    }
    .ivu-table-cell {
        margin: 10px 0;
    }
</style>