<template>
    <div class="loanmongo">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <Card class="loanmongo_interval">
                    <div class="loanmongo_title">
                        <Icon type="ios-grid" size="18"/>
                        <span class="span_mar">mongo查询</span>
                    </div>
                    <div class="db_info">
                        数据库：
                        <span class="span_mar">
                            <Select v-model="db" filterable clearable style="width: 110px">
                                <Option v-for="item in dbList" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                        </span>
                        集合：
                        <span class="span_mar">
                            <Select @on-change="setcollection" v-model="collection" filterable clearable style="width: 240px">
                                <Option v-for="item in collections" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                        </span>
                        cid：
                        <Input class="radio" v-model="cid" placeholder="请输入cid" style="width: 200px" />
                        <!-- 注：可不填，即随机生成 -->
                        <Button class="submit_button" type='primary' @click="query()">提交</Button>
                    </div>
                </Card>
                <Card>
                    <div>        
                        <Table border :columns="columns" :data="codeList" :loading="tableLoading" no-data-text="暂时无查询到数据">
                            <!-- <div v-for="item in codeList" :key="item.index">{{ item }}</div> -->
                        </Table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import {getcollections, getmongocode} from "@/api/tools";
import { isatty } from 'tty';
    export default {
        data(){
            return {
                dbList:[
                    'xinyongjin'
                ],
                db:'xinyongjin',
                collections:[],
                cid:'',
                collection: window.localStorage.getItem('collection') || '',
                codeList:[],
                columns:[],
                tableLoading:false,
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                tableWidth: [
                    '',
                    '',
                    '100px',
                    '100px',
                ]
            }
        },
        created() {
            this.fetchData()
        },
        methods:{
            fetchData() {
                getcollections(this.db).then(response => {
                    console.log(response.data.data)
                    this.collections = response.data.data
                })
            },
            query(){
                console.log(this.cid, this.collection)
                if (this.cid != '' && this.collection){
                    this.codeList = []
                    this.columns = []
                    this.tableLoading = true
                    getmongocode(this.collection, this.cid).then(response => {
                        console.log('sss',response.data.data.length)
                        if (response.data.data.length > 0){
                            var jsonObj = response.data.data[0];
                            var keys = Object.keys(jsonObj)
                            for(var i=0; i <= keys.length - 1; i++){
                                this.columns.push({'title':keys[i],'key':keys[i],'width':this.tableWidth[i]})
                            }
                            console.log('columns=',this.columns)
                            this.codeList = response.data.data
                            console.log(this.codeList)
                            this.tableLoading = false
                        }
                        else if(response.data.data.length == 0){
                            this.tableLoading = false
                        }
                    })
                }
                else{
                    this.$Notice.error({title: '提示', desc: "集合或cid不能为空"});
                }
            },
            setcollection(value) {
                window.localStorage.setItem('collection',value)
            }
        }
    }
</script>

<style lang="less">
    .loanmongo{
        .loanmongo_interval{
            margin-bottom: 20px;
        }
        .loanmongo_title{
            line-height: 30px;
        }
        .span_mar{
            margin-left: 10px;
            margin-right: 10px;
            font-size: 12px;
        }
        .submit_button{
            margin-left: 10px;
            margin-right: 10px;
            font-size: 12px;
            width: 100px;
        }
        .db_info{
             text-align: left;
            padding: 10px 50px 0;
            .radio{
                line-height: 50px;
                .radio_width {
                width: 100px;
                }
            }
        }
    }
    .ivu-table-cell {
        margin: 10px 0;
    }
</style>