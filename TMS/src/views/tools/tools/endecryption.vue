<template>
    <div class="ende">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <Card class="ende_interval">
                    <div class="ende_title">
                        <Icon type="ios-grid" size="18"/>
                        <span class="span_mar">加解密</span>
                    </div>
                    <div class="ende_input">
                        <Input v-model="text" type="textarea" :rows="5" placeholder="请输入加解密字符......" />
                    </div>
                    <div class="ende_buttonList">
                        <!-- 注：可不填，即随机生成 -->
                        <Button class="easy_button" type='primary' @click="easydecrypt()">一键解密</Button>
                        <ButtonGroup class="en_button" >
                            <Button class="intervel_10" @click="endecrypt('encrypt')">加密(3DES)</Button>
                            <Button class="intervel_10" @click="endecrypt('encrypt2')">新版加密(3DES)</Button>
                            <Button class="intervel_10" @click="endecrypt('encrypt_gzip')">加密(GZIP+3DES)</Button>
                            <Button class="intervel_10" @click="endecrypt('encrypt_rsa')">交易核心加密(RSA)-Test</Button>
                            <Button class="intervel_10" @click="endecrypt('gzip')">GZIP压缩</Button>
                        </ButtonGroup>
                    </div>
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
                        暂无数据
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
            text:'',
            ret:'',
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

