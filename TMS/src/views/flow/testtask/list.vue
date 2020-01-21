<style scoped>
  @font-face {
    font-family: "custom-font";
    src: url('//at.alicdn.com/t/font_910489_nkmvz8j412.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_910489_nkmvz8j412.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_910489_nkmvz8j412.ttf') format('truetype')
  }

  .i-icon {
    display: inline-block;
    font-family: 'custom-font' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: middle;
  }

  .icon-sql:before {
    content: "\e763";
  }

  .icon-SQL:before {
    content: "\e68c";
  }

  .icon-file-SQL:before {
    content: "\e7c5";
  }

  .icon-apollo:before {
    content: "\e633";
  }

</style>


<template>
  <div>

    <Row>
      <Card>
        <Icon type="md-search" size="18"/>
        多条件筛选
        <Divider style="margin: 15px 0"/>

        <Form :model="formItem" :label-width="80">
          <FormItem label="团队:" :style="{fontSize:'80px'}">
            <RadioGroup type="button" v-model="search_data.dev_team__icontains" @on-change="search_change">
              <Radio label=""><span>所有</span></Radio>
              <Radio label='技术中心-产品开发部'><span>产品开发部</span></Radio>
              <Radio label='技术中心-金融服务开发部'><span>金融服务开发部</span></Radio>
              <Radio label='技术中心-公用技术开发部'><span>公用技术开发部</span></Radio>
              <Radio label='技术中心-支持系统开发部'><span>支持系统开发部</span></Radio>
              <Radio label='技术中心-APP开发部'><span>APP开发部</span></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="状态:" :style="{fontSize:'80px'}">
            <RadioGroup type="button" v-model="search_data.status" @on-change="search_change">
              <Radio label=""><span>所有</span></Radio>
              <Radio label="未提测"><span>未提测</span></Radio>
              <Radio label="已提测"><span>已提测</span></Radio>
              <Radio label="测试中"><span>测试中</span></Radio>
              <Radio label="暂停中"><span>暂停中</span></Radio>
              <Radio label="测试完"><span>测试完</span></Radio>
              <Radio label="已上线"><span>已上线</span></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="提测时间:" :style="{fontSize:'80px'}">
            <DatePicker v-model="search_data.real_submit_test_time" type="daterange" placement="bottom-end"
                        placeholder="" @on-change="search_change_real_submit_test_time"
                        style="width: 405px"></DatePicker>
          </FormItem>
          <FormItem label="上线时间:" :style="{fontSize:'80px'}">
            <DatePicker v-model="search_data.plan_online_time" type="daterange" placement="bottom-end"
                        placeholder="" @on-change="search_change_plan_online_time"
                        style="width: 405px"></DatePicker>
          </FormItem>

        </Form>


      </Card>
    </Row>
    <br/>
    <Row>
      <Card>
        <Icon type="md-list" size="18"/>
        提测单 <span style="float: right">共 {{ total }} 条 &nbsp;&nbsp;</span>
        <Divider style="margin: 15px 0"/>
        <Table ref="myTable" border :columns="table_header" :data="table_content">

          <template slot="dev_team_render" slot-scope="props">
            <Tag v-for="item in props.dev_team" :key="item" color="default">
              {{item.split('-')[item.split('-').length-1]}}
            </Tag>

          </template>

          <template slot="title_render" slot-scope="props">
            <router-link :to="{name: 'flow_testtask_detail', params: {id: props.id}}">{{props.title}}
            </router-link>
            <Icon v-if="props.sql_files!='[]'" custom="i-icon icon-sql" size="20"/>
            <Icon v-if="props.apollo_config!='[]'" custom="i-icon icon-apollo" size="15"/>
          </template>

          <template slot="dev_users_render" slot-scope="props">
            <Tooltip theme="dark" placement="top">
              {{props.user}}({{props.count}})
              <div slot="content" style="white-space: normal;">
                <p>{{props.users}}</p>
              </div>
            </Tooltip>

          </template>

          <template slot="test_users_render" slot-scope="props">
            <Tooltip theme="dark" placement="top">
              {{props.user}}({{props.count}})
              <div slot="content" style="white-space: normal;">
                <p>{{props.users}}</p>
              </div>
            </Tooltip>
          </template>

          <template slot="status_render" slot-scope="props">
            <Tag type="dot" v-if="props.status=='未提测'" color="default">{{props.status}}</Tag>
            <Tag type="dot" v-if="props.status=='已提测'" color="primary">{{props.status}}</Tag>
            <Tag type="dot" v-if="props.status=='测试中'" color="warning">{{props.status}}</Tag>
            <Tag type="dot" v-if="props.status=='暂停中'" color="error">{{props.status}}</Tag>
            <Tag type="dot" v-if="props.status=='测试完'" color="success">{{props.status}}</Tag>
            <Tag type="dot" v-if="props.status=='已上线'" color="#a917a6">{{props.status}}</Tag>
          </template>

        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="total" :current.sync="current" @on-change="changePage"></Page>
          </div>
        </div>

      </Card>
    </Row>

  </div>
</template>


<script>

  import {getflowTesttaskList} from '@/api/testtask'
  import {formatDateYYYMMDD} from '@/lib/tools'

  export default {
    data() {
      return {
        table_header: [
          {
            title: 'ID',
            key: 'id',
            maxWidth: 60
          },
          {
            title: '团队',
            key: 'dev_team',
            maxWidth: 150,
            render: (h, params) => {
              return h(
                'div',
                this.$refs.myTable.$scopedSlots.dev_team_render({dev_team: JSON.parse(params.row.dev_team)})
              )
            }
          },
          {
            title: '标题',
            key: 'title',
            render: (h, params) => {
              return h(
                'div',
                this.$refs.myTable.$scopedSlots.title_render({
                  title: params.row.title,
                  id: params.row.id,
                  sql_files: params.row.sql_files,
                  apollo_config: params.row.apollo_config
                })
              )
            }
          },
          {
            title: '开发负责人',
            key: 'dev_users',
            maxWidth: 100,
            render: (h, params) => {
              return h(
                'div',
                this.$refs.myTable.$scopedSlots.dev_users_render({
                  user: JSON.parse(params.row.dev_users)[0],
                  users: JSON.parse(params.row.dev_users).join(','),
                  count: JSON.parse(params.row.dev_users).length
                })
              )
            }
          },
          {
            title: '测试负责人',
            key: 'test_users',
            maxWidth: 100,
            render: (h, params) => {
              return h(
                'div',
                this.$refs.myTable.$scopedSlots.test_users_render({
                  user: JSON.parse(params.row.test_users)[0],
                  users: JSON.parse(params.row.test_users).join(','),
                  count: JSON.parse(params.row.test_users).length
                })
              )
            }
          },
          {
            title: '提测日期',
            key: 'real_submit_test_time',
            maxWidth: 105
          },
          {
            title: '上线日期',
            key: 'plan_online_time',
            maxWidth: 105

          },
          {
            title: '当前状态',
            key: 'status',
            maxWidth: 130,
            render: (h, params) => {
              return h(
                'div',
                this.$refs.myTable.$scopedSlots.status_render({status: params.row.status})
              )
            }
          }
        ],
        table_content: [],
        formItem: {},
        search_data: {
          dev_team__icontains: '',
          status: '',
          real_submit_test_time: '',
          plan_online_time: ''
        },
        search_query: {
          offset: 0
        },
        total: 0,
        current: 1


      }
    },
    methods: {
      changePage(page) {
        this.search_query.offset = (page - 1) * 10
        this.search_change('from_page')
      },

      search_change_real_submit_test_time(val, type) {
        this.search_data.real_submit_test_time = val
        this.search_change()
      },
      search_change_plan_online_time(val, type) {
        this.search_data.plan_online_time = val
        this.search_change()
      },
      getflowTesttaskList({data, query}) {

        getflowTesttaskList({data, query}).then(res => {
          if (res.data.status) {
            this.table_content = res.data.data
            this.total = res.data.count
          } else {

          }
        });
      },
      search_change(val) {

        if (val != 'from_page') {
          this.search_query.offset = 0
          this.current = 1
        }


        let data = {...this.search_data}
        for (let i in data) {
          if (data[i] == '' || JSON.stringify(data[i]) == '["",""]') {
            delete data[i]
          }


        }
        let query = this.search_query


        this.getflowTesttaskList({data, query})
      }
    },
    mounted: function () {
      this.getflowTesttaskList({})
    }
  }
</script>

