<style>
  .ivu-upload .ivu-upload-select {
    width: 100%;
  }

  .ivu-upload-list-file {
    float: left;
  }

  .ivu-modal-fullscreen {
    width: 96% !important;
  }

  .ivu-steps-title {
    font-size: 6px;
  }

  .master_class .ivu-form-item-error-tip {
    position: initial;
  }

  .online_add_tag span {
    display: inline-flex !important;
  }
</style>

<style scoped>
  .time {
    font-size: 14px;
    font-weight: bold;
  }

  .content {
    padding-left: 5px;
  }


</style>
<template>
  <div>
    <Row>
      <Col>
        <Card>
          <Icon type="md-list-box" size="18"/>
          上线流程 <a @click="show_drawer = true">(点击可查看操作记录)</a>

          <div :style="{float:'right'}">
            <Button v-if="submit_show" type="primary" style="margin-left: 8px" @click="handleSubmit()">提交</Button>
          </div>
          <div style="float: right;width: 690px;">

            <Steps :current="current_status" size="small">
              <Step title="发起上线"></Step>
              <Step title="上线确认"></Step>
              <Step :title="current_status_desc"></Step>
              <Step title="预发验证完"></Step>
              <Step title="上线完成"></Step>
              <Step title="验收完成"></Step>
            </Steps>
          </div>

          <Divider style="margin: 15px 0"/>


          <!--<Divider style="margin: 15px 0"/>-->

          <Form ref="formValidate_content" :model="formValidate" :rules="ruleValidate" :label-width="100">


            <FormItem label="关联提测单" prop="testtask">
              <Select v-if="sql_files_can_edit" v-model="formValidate.testtask" filterable multiple
                      @on-change="testtask_change"
                      placeholder="只可选择 测试中、测试完 的需求">
                <Option v-for="item in testtask_list" :value="item.id"
                        :key="item.id"
                        :label="item.title">
                  <Tag color="default">{{item.type}}</Tag>
                  <Tag type="dot" v-if="item.status=='未提测'" color="default" class="online_add_tag">{{item.status}}</Tag>
                  <Tag type="dot" v-else-if="item.status=='已提测'" color="primary" class="online_add_tag">
                    {{item.status}}
                  </Tag>
                  <Tag type="dot" v-else-if="item.status=='测试中'" color="warning" class="online_add_tag">
                    {{item.status}}
                  </Tag>
                  <Tag type="dot" v-else-if="item.status=='测试完'" color="success" class="online_add_tag">
                    {{item.status}}
                  </Tag>
                  <Tag type="dot" v-else-if="item.status=='已上线'" color="#a917a6" class="online_add_tag">
                    {{item.status}}
                  </Tag>
                  <Tag type="dot" v-else color="default" class="online_add_tag">{{item.status}}</Tag>
                  <span>{{ item.title }}</span>
                  <!--<span style="float:right;color:#ccc;margin-right: 20px">{{ item.type }}</span>-->
                  <Tag v-for="item in JSON.parse(item.dev_team)" :key="item" color="default"
                       style="float:right;color:#ccc;margin-right: 20px">
                    {{item.split('-')[item.split('-').length-1]}}
                  </Tag>
                </Option>
              </Select>


              <div v-if="!sql_files_can_edit">
                <router-link v-if="formValidate.testtask.length>0"
                             v-for="item in testtask_list.filter(item2 => this.formValidate.testtask.indexOf(item2.id)>=0)"
                             :value="item.id" :key="item.id"
                             :to="{name: 'flow_testtask_detail', params: {id: item.id}}">
                  <Tag>
                    {{item.title}}
                    <Icon type="md-open"/>
                  </Tag>
                </router-link>
              </div>
              <i-switch v-if="this.$route.params.id" size="large" v-model="sql_files_can_edit"
                        style="position: absolute;right: 0;top:7px">
                <span slot="open">查看</span>
                <span slot="close">编辑</span>
              </i-switch>
            </FormItem>


            <FormItem label="上线标题" prop="title">
              <Input v-model="formValidate.title" placeholder="">
                <Select v-model="formValidate.type" slot="prepend" style="width: 80px">
                  <Option value="日常需求">日常需求</Option>
                  <Option value="紧急需求">紧急需求</Option>
                  <Option value="开发优化">开发优化</Option>
                  <Option value="线上问题">线上问题</Option>
                </Select>
                <Select v-model="formValidate.system" slot="prepend" style="width: 120px" placeholder="选择系统">
                  <Option value="消费金融">消费金融</Option>
                  <Option value="金融超市">金融超市</Option>
                  <Option value="车贷王">车贷王</Option>
                  <Option value="风控系统">风控系统</Option>
                  <Option value="大数据">大数据</Option>
                  <Option value="金融服务">金融服务</Option>
                  <Option value="后台系统">后台系统</Option>
                </Select>
              </Input>
            </FormItem>


            <FormItem label="相关人员" prop="users">
              <Select v-model="formValidate.users" filterable multiple placeholder="相关人员会收到企业消息">
                <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">
                  <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span>
                    <div style="color:#ccc;margin-right: 20px;float:right">{{ JSON.parse(item.department_list).join('-')
                      }}
                    </div>
                  </div>
                </Option>
              </Select>
            </FormItem>


            <FormItem label="开发团队" prop="dev_team">
              <Select v-model="formValidate.dev_team" filterable multiple>
                <!--<Option v-for="item in formValidate.dev_team" :value="item" :key="item" :label="item">-->
                <!--<span>{{ item }}</span>-->
                <!--</Option>-->
                <Option v-for="item in team_list" :value="item.name" :key="item.name" :label="item.name">
                  <span>{{ item.name }}</span>
                </Option>
              </Select>
            </FormItem>

            <FormItem label="上线内容" prop="content">
              <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 4,maxRows: 100}"
                     placeholder=""></Input>
            </FormItem>

            <FormItem label="上线模板" prop="template">
              <Select size="default" v-model="formValidate.template" @on-change="change_template"
                      :disabled="template_disabled">
                <Option value="1" label="一个团队参与">
                </Option>
                <Option value="2" label="二个团队参与">
                </Option>
                <Option value="3" label="三个团队参与">
                </Option>
                <Option value="4" label="四个团队参与">
                </Option>
                <Option value="5" label="五个团队参与">
                </Option>
              </Select>
            </FormItem>

            <FormItem label="上线流程" prop="flow">

              <Table ref="onlineorderflowTable" border :columns="columns" :data="formValidate.onlineorderflow">

                <template slot="checkpoint" slot-scope="props">
                  <a v-if="props.row.checkpoint == '上线Checklist检查' && $route.params.id"
                     @click="show_check_list(props.row.onlineorder_id,props.row.id)">{{props.row.checkpoint}}
                    <Icon type="md-open"/>
                  </a>
                  <span
                    v-if="props.row.checkpoint == '上线Checklist检查' && !$route.params.id">{{props.row.checkpoint}}
                  </span>
                  <span v-if="props.row.checkpoint != '上线Checklist检查'">{{props.row.checkpoint}}</span>
                </template>


                <template slot="master" slot-scope="props">
                  <Form :ref="'formDynamic_master'+props.row._index" :model="props.row">
                    <FormItem class="master_class" prop="master"
                              :rules="{required: true, message: '负责人未选中', trigger: 'change'}">
                      <Select v-model="props.row.master" filterable placeholder="" :transfer="true">
                        <Option v-for="item in users_list" :value="item.realname" :key="item.username"
                                :label="item.realname">
                          <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
                          <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}
                          </div>
                        </Option>
                      </Select>
                    </FormItem>
                  </Form>
                </template>


                <template slot="status" slot-scope="props">
                  <Select v-model="props.row.status" placeholder="" clearable>
                    <Option value="通过" label="通过">
                    </Option>
                    <Option value="拒绝" label="拒绝">
                    </Option>
                    <Option value="无" label="无">
                    </Option>
                  </Select>
                </template>

                <template slot="note" slot-scope="props">
                  <Form :ref="'formDynamic'+props.row._index" :model="props.row">
                    <FormItem v-if="props.row.checkpoint=='上线包名及GIT确认' && props.row.status=='通过' " class="master_class"
                              prop="note"
                              :rules="{required: true, message: '上线包名及GIT必填', trigger: 'blur'}">
                      <Input v-model="props.row.note" type="textarea" :autosize="{minRows: 1,maxRows: 10}"
                             placeholder=""></Input>
                    </FormItem>

                    <FormItem v-else class="master_class" prop="master">
                      <Input v-model="props.row.note" type="textarea" :autosize="{minRows: 1,maxRows: 10}"
                             placeholder=""></Input>
                    </FormItem>
                  </Form>
                </template>
              </Table>
            </FormItem>

            <div style="display:none;"> {{act}}</div>

          </Form>
        </Card>
        <br/>
      </Col>
    </Row>

    <Drawer title="操作记录" :closable="false" v-model="show_drawer" width="512">
      <Timeline :style="{marginLeft:'50px'}">
        <TimelineItem v-for="item in operation_list" :key="item.name">
          <p class="time">{{item.create_time}}</p>
          <p class="content">{{item.realname}}:{{item.change_action}} </p>
        </TimelineItem>
      </Timeline>
    </Drawer>


    <Modal
      v-model="check_list_visable"
      fullscreen
      ok-text="保存并提交"
      cancel-text="取消且不提交"
      @on-ok="submitOrderCheckList()"
      title="上线检查项"
      :footer-hide="!submit_show"
      :styles="{marginTop: '20px',left: '2%'}">
      <Tabs value="name1" type="card">
        <TabPane v-show="tabs_table_show" label="服务端checklist" name="name1" closable>
          <Table ref="check_list_table" border :loading="loading" :columns="check_list_columns" :data="check_list_data"
                 size="small">
            <template slot="master" slot-scope="props">
              <Select v-model="props.row.master" filterable placeholder="">
                <Option v-for="item in users_list" :value="item.realname" :key="item.username"
                        :label="item.realname">
                  <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
                  <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>
                </Option>
              </Select>
            </template>

            <template slot="status" slot-scope="props">
              <Select v-model="props.row.status" placeholder="" clearable>
                <Option value="通过" label="通过">
                </Option>
                <Option value="拒绝" label="拒绝">
                </Option>
                <Option value="无" label="无">
                </Option>
              </Select>
            </template>

            <template slot="note" slot-scope="props">
              <Input v-model="props.row.note" type="textarea" :autosize="{minRows: 1,maxRows: 10}"
                     placeholder=""></Input>
            </template>
          </Table>
        </TabPane>
        <!--<TabPane label="客户端checklist" name="name2" closable>-->
        <!--阿斯达的-->
        <!--</TabPane>-->
        <Button @click="handleTabsAdd('server')" size="small" slot="extra">添加checklist</Button>
        <!--<Button @click="handleTabsAdd('h5')" size="small" slot="extra">添加H5 checklist</Button>-->
      </Tabs>


    </Modal>


  </div>


</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import {JsonToString, StringToJson} from '@/lib/utils'
  import {baseServices, userList, baseDepartments, baseFiles, baseFilesPreview} from '@/api/base'
  import {
    createOrUpdateOnlineOrder,
    getOnlineOrder,
    getOnlineOrderCheckList,
    createOrUpdateOnlineOrderCheckList,
    getOnlineOrderOperations
  } from '@/api/onlineorder'
  import {getflowTesttaskList} from '@/api/testtask'


  export default {

    data() {
      return {
        sql_files_can_edit: false,
        show_drawer: false,
        check_list_visable: false,
        loading: true,
        users_list: [],
        team_list: [],
        testtask_list: [],
        tabs_table_show: false,
        operation_list: [],
        oldformValidate: {},
        submitformValidate: {},
        formValidate: {
          title: '',
          type: '',
          testtask: [],
          content: '',
          template: '1',
          system: '',
          users: [],
          status: '发起上线',
          onlineorderflow: [],
          dev_team: []
        },
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          system: [
            {required: true, message: '请选择一个系统', trigger: 'blur'}
          ],
          users: [
            {required: true, type: 'array', min: 1, message: '至少选择一人', trigger: 'change'},
          ],
          dev_team: [
            {required: true, type: 'array', min: 1, message: '至少选择一个团队', trigger: 'change'},
          ],
          // testtask: [
          //   {required: true, type: 'array', min: 1, message: '请选择一个关联的提测单', trigger: 'change'},
          // ],
          content: [
            {required: true, message: '请填写上线内容', trigger: 'blur'}
          ],
        },
        act: false,
        formDynamic: {},

        check_list_data: [],
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '检查项',
            key: 'checkpoint',
            width: 180,
            render: (h, params) => {
              this.formValidate.onlineorderflow[params.index] = params.row
              return h(
                'div',
                this.$refs.onlineorderflowTable.$scopedSlots.checkpoint({
                  row: params.row
                })
              )
            }
          },
          {
            title: '负责人',
            key: 'master',
            width: 120,
            render: (h, params) => {
              this.formValidate.onlineorderflow[params.index] = params.row
              return h(
                'div',
                this.$refs.onlineorderflowTable.$scopedSlots.master({
                  row: params.row,
                })
              )
            }
          },
          {
            title: '状态',
            key: 'status',
            width: 120,
            render: (h, params) => {
              this.formValidate.onlineorderflow[params.index] = params.row
              return h(
                'div',
                this.$refs.onlineorderflowTable.$scopedSlots.status({
                  row: params.row,
                })
              )
            }
          },
          {
            title: '备注',
            key: 'note',
            render: (h, params) => {
              this.formValidate.onlineorderflow[params.index] = params.row
              return h(
                'div',
                this.$refs.onlineorderflowTable.$scopedSlots.note({
                  row: params.row,
                })
              )
            }
          }, {
            title: '时间',
            key: 'check_time',
            width: 160
          }
        ],
        check_list_columns: [
          {
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '上线项',
            key: 'checkpoint1',
            width: 180
          },
          {
            title: '检查内容',
            key: 'checkpoint2'
          },
          {
            title: '检查人',
            key: 'master',
            width: 120,
            render: (h, params) => {
              this.check_list_data[params.index] = params.row
              return h(
                'div',
                this.$refs.check_list_table.$scopedSlots.master({
                  row: params.row
                })
              )
            }
          },
          {
            title: '检查状态',
            key: 'status',
            width: 120,
            render: (h, params) => {
              this.check_list_data[params.index] = params.row
              return h(
                'div',
                this.$refs.check_list_table.$scopedSlots.status({
                  row: params.row,
                })
              )
            }
          },
          {
            title: '备注',
            key: 'note',
            render: (h, params) => {
              this.check_list_data[params.index] = params.row
              return h(
                'div',
                this.$refs.check_list_table.$scopedSlots.note({
                  row: params.row,
                })
              )
            }
          }
        ]

      }
    },
    methods: {

      ...mapGetters([
        'realname',
      ]),
      checkData() {


      },
      change_template(value) {

        let data_first = [
          {
            checkpoint: '是否测试通过准许上线',
            master: '',
            status: '',
            note: '',
          },
          {
            checkpoint: '上线发布内容确认',
            master: '',
            status: '',
            note: ''
          }
        ]

        let data_center = [{
          checkpoint: '上线Checklist检查',
          master: '',
          status: '',
          note: ''
        }, {
          checkpoint: '上线SQL语句QS提交确认',
          master: '',
          status: '',
          note: ''
        }, {
          checkpoint: '备份环境同步发布(apollo)',
          master: '',
          status: '',
          note: ''
        }, {
          checkpoint: '上线包名及GIT确认',
          master: '',
          status: '',
          note: ''
        }]

        let data_last = [
          {
            checkpoint: 'Pre环境功能验证',
            master: '',
            status: '',
            note: ''
          },
          {
            checkpoint: '确认上线',
            master: '',
            status: '',
            note: ''
          },
          {
            checkpoint: '生产环境产品人员验收',
            master: '',
            status: '',
            note: ''
          }]

        let data_fill = []

        for (let i = 0; i < parseInt(value); i++) {
          data_fill.push(...data_center)
        }

        if (this.formValidate.onlineorderflow.length == 0) {
          this.formValidate.onlineorderflow = [...data_first, ...data_fill, ...data_last]
        } else {
          // 动态保持数据
          let old_value = (this.formValidate.onlineorderflow.length - 2 - 4) / 3
          let new_or_remove = parseInt(value) - old_value
          if (new_or_remove > 0) {
            for (let i = 0; i < parseInt(Math.abs(new_or_remove)); i++) {
              this.formValidate.onlineorderflow.splice(6 + 3 * (old_value - 1), 0, ...data_center)
            }
          } else if (new_or_remove < 0) {
            for (let i = 1; i <= parseInt(Math.abs(new_or_remove)); i++) {
              this.formValidate.onlineorderflow.splice(2 + 3 * (old_value - i), 4)
            }
          }
        }

      },
      show_check_list(onlineorder_id, onlineorderflow_id) {
        this.loading = true
        this.check_list_visable = true;
        this.getOnlineOrderCheckList(onlineorder_id, onlineorderflow_id)
        this.onlineorder_id = onlineorder_id
        this.onlineorderflow_id = onlineorderflow_id


      },
      async handleSubmit() {

        let valid = true
        await this.$refs['formValidate_content'].validate((valid_content) => {
          valid = valid && valid_content
        })

        for (let i = 0, len = this.formValidate.onlineorderflow.length; i < len; i++) {
          await this.$refs['formDynamic' + i].validate(valid_content => {
            valid = valid && valid_content
          })
        }

        for (let i = 0, len = this.formValidate.onlineorderflow.length; i < len; i++) {
          await this.$refs['formDynamic_master' + i].validate(valid_content => {
            valid = valid && valid_content
          })
        }
        if (!this.formValidate.system || !this.formValidate.type) {
          this.$Message.error({content: '【所属系统】或【上线类型】没有填写，请检查一下!', duration: 5});
          valid = false
        }

        let status_has_last_pos = undefined;
        let status_has_not_first_pos = undefined;

        for (let i = 0, len = this.formValidate.onlineorderflow.length; i < len; i++) {
          if (this.formValidate.onlineorderflow[i].status != '' && this.formValidate.onlineorderflow[i].status != undefined) {
            status_has_last_pos = i
          } else {
            if (status_has_not_first_pos == undefined) {
              status_has_not_first_pos = i
            }
          }
        }

        if (status_has_last_pos == undefined) {
          this.$Message.error({content: "上线检查项的状态一个都不填写不能提交哦", duration: 5});
          return
        }
        if (status_has_last_pos > status_has_not_first_pos) {
          this.$Message.error({content: "上线检查项还有空的未填写，不要抢填哦", duration: 5});
          return
        }


        if (valid) {
          this.submitOnlineOrder()
        } else {
          this.$Message.error({content: '您还有未填写完整的内容，请检查一下!', duration: 5});
        }

      },
      submitOnlineOrder() {

        if (JSON.stringify(this.submitformValidate) == '{"onlineorderflow":[]}') {
          this.$Message.error({content: "你好像没有修改内容，不必提交哦", duration: 5});
          return
        }

        this.$Spin.show();

        if (this.oldformValidate.id) {
          var data = JsonToString({
            data: {
              ...this.submitformValidate,
              id: this.oldformValidate.id,
            }
          })
        } else {
          var data = JsonToString({
            data: {
              ...this.submitformValidate,
              id: this.oldformValidate.id,
              onlineorderflow: this.formValidate.onlineorderflow
            }
          })
        }


        createOrUpdateOnlineOrder({data}).then(res => {
            if (res.data.status) {
              this.$Message.success({content: '提交成功!', duration: 5});
              if (this.$route.name == 'flow_online_detail') {
                // this.$router.push({name: 'flow_online_detail', params: {id: res.data.data.id}})
                this.$router.push({name: 'flow_online_list'})
              } else {
                this.$router.push({name: 'flow_online_list'})
              }
              this.getOnlineOrder()
              this.getOnlineOrderOperations()
            } else {
              this.$Message.error(res.data.message);
            }
            this.$Spin.hide();
          }, error => {
            this.$Spin.hide();
          }
        );

      },
      getflowTesttaskList({data, query}) {
        getflowTesttaskList({data, query}).then(res => {
          if (res.data.status) {
            let testtask_list = JSON.parse(JSON.stringify(this.testtask_list))
            let mytesttask_list = res.data.data
            for (let i in mytesttask_list) {
              let mytesttask = mytesttask_list[i]
              let find_testtask = testtask_list.find(t => t.id == mytesttask.id)
              if (!find_testtask) {
                this.testtask_list = [...this.testtask_list, mytesttask]
              }
            }
          }
          if (this.oldformValidate.testtask) {
            this.formValidate.testtask = JSON.parse(JSON.stringify(this.oldformValidate.testtask))
          }
        });
      },
      getBaseDepartments() {
        baseDepartments().then(res => {
          if (res.data.status) {
            this.team_list = res.data.data
          } else {

          }
        });
      },
      getUserList() {
        userList().then(res => {
          if (res.data.status) {
            this.users_list = res.data.data
          } else {

          }
        });
      },
      getOnlineOrder() {
        if (this.$route.params.id) {
          getOnlineOrder({id: this.$route.params.id}).then(res => {
            this.formValidate = StringToJson({data: res.data.data})
            this.oldformValidate = JSON.parse(JSON.stringify(res.data.data))
            // let testtask_list = JSON.parse(JSON.stringify(this.testtask_list))
            // let mytesttask_list = eval(this.formValidate.testtask)
            //
            // for (let i in mytesttask_list) {
            //   let mytesttask = JSON.parse(mytesttask_list[i])
            //   let find_testtask = testtask_list.find(t => t.id == mytesttask.id)
            //   if (!find_testtask) {
            //     mytesttask.status = "状态已变更"
            //     this.testtask_list = [...this.testtask_list, mytesttask]
            //   }
            // }
          });
        }
      },
      getOnlineOrderOperations() {
        if (this.$route.params.id) {
          getOnlineOrderOperations({id: this.$route.params.id}).then(res => {
            this.operation_list = res.data.data
          });
        }
      },
      getOnlineOrderCheckList(onlineorder_id, onlineorderflow_id) {
        if (this.$route.params.id) {
          this.tabs_table_show = false;
          getOnlineOrderCheckList({onlineorder_id, onlineorderflow_id}).then(res => {
            if (res.data.data.check_list_data) {
              this.check_list_data = res.data.data.check_list_data;
              this.tabs_table_show = true;
            } else {
              this.rest_check_list_data()
            }
            this.loading = false
          });
        } else {
          this.rest_check_list_data()
          this.loading = false
        }
      },

      submitOrderCheckList() {

        if (!this.$route.params.id) {
          this.$Message.error('发起上线流程之后，才可以填写checklist~');
          return
        }
        var data = {
          onlineorder_id: this.onlineorder_id,
          onlineorderflow_id: this.onlineorderflow_id,
          check_list_data: this.check_list_data
        }
        createOrUpdateOnlineOrderCheckList({data}).then(res => {
          if (res.data.status) {
            this.$Message.success({content: '提交成功!', duration: 5});
          } else {
            this.$Message.error(res.data.message);
          }
        });
      },

      rest_check_list_data() {
        this.check_list_data = [
          {
            checkpoint1: '代码review',
            checkpoint2: '确认上线代码review通过',
            master: this.realname(),
            status: '无',
            note: ''
          }
          , {
            checkpoint1: '代码合并',
            checkpoint2: '代码合并到Master上确认',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '配置项',
            checkpoint2: '配置文件检查是否通过',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '上线SQL',
            checkpoint2: '检查上线SQL脚本是否正确',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: 'Jenkins打包配置',
            checkpoint2: '检查Jenkins打包配置是否正确',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '服务器IP加白',
            checkpoint2: '检查各服务器IP加白策略配置是否正确',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '数据库只读权限账号配置',
            checkpoint2: '提供只读权限的账号信息是否可用',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: 'IP与端口号设置',
            checkpoint2: '确认各应用的IP及端口号信息',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: 'Host及域名映射',
            checkpoint2: '确认Host配置及域名映射信息',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '防火墙设置',
            checkpoint2: '系统防火墙设置确认',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '线上数据库DDL',
            checkpoint2: '对比线上DDL变化信息',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '规则文件检查',
            checkpoint2: '规则文件drools是否正确',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '第三方数据对接检查',
            checkpoint2: '对接账号是否开通',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '第三方数据对接检查',
            checkpoint2: '对方服务器IP是否加好白名单',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '备付金接入上线',
            checkpoint2: '备付金账户信息检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '备付金接入上线',
            checkpoint2: '备付金密钥、证书检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '备付金接入上线',
            checkpoint2: '支付渠道备付金接口权限检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '备付金接入上线',
            checkpoint2: '支付渠道备付金接口权限IP绑定检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '新资金方接入上线',
            checkpoint2: '专线检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '新资金方接入上线',
            checkpoint2: 'ip白名单信息检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '新资金方接入上线',
            checkpoint2: '资方信息检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '新资金方接入上线',
            checkpoint2: '资方报文密钥',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '项目上线',
            checkpoint2: '上线功能项检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '项目上线',
            checkpoint2: 'war、jar版本git版本号',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '项目上线',
            checkpoint2: '项目启动顺序',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '项目上线',
            checkpoint2: 'MQ消费队列状态',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '项目上线',
            checkpoint2: '定时job状态检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '项目上线',
            checkpoint2: 'FTP、SFTP、FastDFS权限配置检查',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '上线后check项',
            checkpoint2: '验证主从是否已同步',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '上线后check项',
            checkpoint2: '上线功能是否正常',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '上线后check项',
            checkpoint2: '第三方调用是否正常',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '上线后check项',
            checkpoint2: '连通外网是否正常',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '上线tag',
            checkpoint2: 'git上打好tag确认',
            master: this.realname(),
            status: '无',
            note: ''
          }, {
            checkpoint1: '上预发check项',
            checkpoint2: '线上补偿机制及定时任务是否会影响到预发布',
            master: this.realname(),
            status: '无',
            note: ''
          },{
            checkpoint1: '上预发check项',
            checkpoint2: '线上新备付金查询任务关闭，启用预发布查询job',
            master: this.realname(),
            status: '无',
            note: ''
          },
        ]
      },

      testtask_change(value) {
        if (!this.$route.params.id) {
          let testtask_list = JSON.parse(JSON.stringify(this.testtask_list));
          let users_list = [];
          let dev_team_list = [];
          let content = '';
          let title = '';
          let type = '';
          for (let i in value) {
            let find_testtask = testtask_list.find(t => t.id == value[i]);
            dev_team_list = [...dev_team_list, ...JSON.parse(find_testtask.dev_team)];
            users_list = [...users_list, ...JSON.parse(find_testtask.dev_users), ...JSON.parse(find_testtask.test_users), ...JSON.parse(find_testtask.product_users)]
            content += find_testtask.content + '\n';
            title += find_testtask.title + ' ';
            type = find_testtask.type;
          }
          this.formValidate.dev_team = Array.from(new Set(dev_team_list));
          this.formValidate.users = Array.from(new Set(users_list));
          this.formValidate.content = content;
          this.formValidate.title = title;
          this.formValidate.type = type;


        }
      },
      handleTabsAdd(type) {
        if (type == 'server') {
          this.tabs_table_show = true
        } else {
          this.tabs_table_show = false
        }

      },
      sql_files_can_edit_show() {
        if (this.$route.params.id) {
          this.sql_files_can_edit = false
        } else {
          this.sql_files_can_edit = true
        }
      }
    },
    watch: {
      'formValidate': {
        handler: function (nowVal, oldVal) {
          for (let i in this.formValidate) {
            if (nowVal[i] && nowVal[i].constructor == Date) {
              nowVal[i] = formatDateYYYMMDD({date: nowVal[i]})
            }
            if (JSON.stringify(nowVal[i]) != JSON.stringify(this.oldformValidate[i])) {
              this.submitformValidate[i] = nowVal[i]
            } else {
              delete this.submitformValidate[i]
            }
          }

          this.submitformValidate['onlineorderflow'] = []
          for (let j in this.formValidate.onlineorderflow) {
            let now = JSON.parse(JSON.stringify(this.formValidate.onlineorderflow[j]))

            try {
              let old = JSON.parse(JSON.stringify(this.oldformValidate.onlineorderflow[j]))
              delete now['_index']
              delete now['_rowKey']
              if (now.status == undefined) {
                now['status'] = ''
                let tmp_status = old['status']
                delete old['status']
                old['status'] = tmp_status
              }
              if (JSON.stringify(now) != JSON.stringify(old)) {
                this.submitformValidate['onlineorderflow'].push(now)
              }
            } catch (e) {

            }


          }

        },
        deep: true
      },
      '$route'(to, from) {
        //刷新页面
        this.$router.go(0);
      },
      'oldformValidate.testtask': {
        handler: function (nowVal, oldVal) {
          for (let i in nowVal) {
            this.getflowTesttaskList({data: {id: nowVal[i]}, query: {limit: 1000}})
          }

        }
      }
    },
    mounted() {
      this.getflowTesttaskList({data: {status: '测试完'}, query: {limit: 1000}})
      this.getflowTesttaskList({data: {status: '测试中'}, query: {limit: 1000}})
      this.getUserList()
      this.getBaseDepartments()
      this.getOnlineOrder()
      this.getOnlineOrderOperations()
      this.change_template(1)
      this.$nextTick(() => {
        this.act = !this.act
      })
      this.sql_files_can_edit_show()

    },
    computed: {
      current_status: function () {
        if (this.formValidate.status == '发起上线') {
          return 0
        } else if (this.formValidate.status == '上线确认') {
          return 1
        } else if (this.formValidate.status == '预发布完成') {
          return 2
        } else if (this.formValidate.status.indexOf('预发布中') >= 0) {
          return 2
        } else if (this.formValidate.status == '预发验证完') {
          return 3
        } else if (this.formValidate.status == '上线完成') {
          return 4
        } else if (this.formValidate.status == '验收完成') {
          return 5
        } else {
          return 0
        }
      },
      current_status_desc: function () {
        if (this.formValidate.status.indexOf('预发布中') >= 0) {
          return this.formValidate.status
        } else {
          return '预发布完成'
        }
      },
      template_disabled: function () {
        return !!this.$route.params.id;
      },
      submit_show() {
        if (this.oldformValidate.status == '验收完成') {
          return false
        } else {
          return true
        }
      }

    }

  }
</script>
