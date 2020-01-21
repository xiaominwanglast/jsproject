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
    <Row :gutter="10">
      <Col :md="24" :lg="15">
        <Card>
          <Icon type="md-list-box" size="18"/>
          提测单内容
          <div :style="{float:'right'}">
            <Select v-model="formValidate.status" style="width:100px"
                    v-show="this.$route.params.id">
              <Option value="未提测" label="未提测">
              </Option>
              <Option value="已提测" label="已提测">
              </Option>
              <Option value="测试中" label="测试中">
              </Option>
              <Option value="暂停中" label="暂停中">
              </Option>
              <Option value="测试完" label="测试完">
              </Option>
              <Option value="已上线" label="已上线">
              </Option>
            </Select>
            <Button type="primary" v-if="submit_show" @click="handleSubmit()" style="margin-left: 8px">提交</Button>
            <!--<Button @click="handleReset()" style="margin-left: 8px">重置</Button>-->
          </div>
          <Divider style="margin: 15px 0"/>
          <Form ref="formValidate_content" :model="formValidate" :rules="ruleValidate" :label-width="100">


            <FormItem label="关联版本" prop="sql_files">
              <Select v-if="version_id_can_edit" v-model="formValidate.version_id" filterable multiple
                      placeholder="只可选择 [完成开发阶段] 的版本" @on-change="version_id_change">
                <Option v-for="item in version_list" :value="item.id"
                        :key="item.id"
                        :label="item.title">
                  <span>{{ item.title }}</span>
                  <!--<span style="float:right;color:#ccc;margin-right: 20px">{{ item.type }}</span>-->
                  <Tag color="default" style="float:right;color:#ccc;margin-right: 20px;margin-top:-4px">
                    {{item.product_title}}
                  </Tag>
                </Option>
              </Select>

              <div v-if="!version_id_can_edit">
                <router-link v-if="formValidate.version_id.length>0"
                             v-for="item in version_list.filter(item2 => this.formValidate.version_id.indexOf(item2.id)>=0)"
                             :value="item.id" :key="item.id"
                             :to="{path: '/project/version/detail/'+item.id+'/版本概况'}">
                  <Tag>
                    {{item.title}}
                    <Icon type="md-open"/>
                  </Tag>
                </router-link>
                <Tag v-if="formValidate.version_id.length<=0">
                  无关联的版本
                </Tag>
              </div>
              <i-switch v-if="this.$route.params.id" size="large" v-model="version_id_can_edit"
                        style="position: absolute;right: 0;top:7px">
                <span slot="open">查看</span>
                <span slot="close">编辑</span>
              </i-switch>

            </FormItem>


            <FormItem label="提测标题" prop="title">
              <Input v-model="formValidate.title" placeholder="">
                <Select v-model="formValidate.type" slot="prepend" style="width: 80px">
                  <Option value="日常需求">日常需求</Option>
                  <Option value="紧急需求">紧急需求</Option>
                  <Option value="开发优化">开发优化</Option>
                  <Option value="线上问题">线上问题</Option>
                </Select>

                <Select v-model="formValidate.system" slot="prepend" style="width: 100px">
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

            <FormItem label="开发团队" prop="dev_team">
              <Select v-model="formValidate.dev_team" filterable multiple>
                <Option v-for="item in team_list" :value="item.name" :key="item.name" :label="item.name">
                  <span>{{ item.name }}</span>
                </Option>
              </Select>

            </FormItem>

            <FormItem label="需求地址" prop="product_docs">
              <Input v-model="formValidate.product_docs" type="textarea" :autosize="{minRows: 1,maxRows: 5}"
                     placeholder="输入禅道需求文档的地址，多个请回车换行"></Input>
            </FormItem>

            <FormItem label="服务分支" prop="service_and_branch">


              <Tag v-for="item in formValidate.service_and_branch" :key="item.service_name" :name="item.service_name"
                   closable
                   @on-close="deleteService">{{ item.service_name }} | {{ item.service_branch }}
              </Tag>

              <Button icon="ios-add" type="dashed" size="small" @click="handleAddBtn">添加服务</Button>
              <Button v-if="this.$route.params.id" icon="md-build" type="dashed" size="small" @click="exec_jenkins">
                一键部署
              </Button>
            </FormItem>

            <FormItem label="数据库变更" prop="sql_files">
              <Select v-if="sql_files_can_edit" v-model="formValidate.sql_files" filterable multiple
                      placeholder="只可选择 [已通过] 的数据库审核单">
                <Option v-for="item in change_order_list" :value="item.id"
                        :key="item.id"
                        :label="item.title">
                  <Tag type="dot" v-if="item.status=='已通过'" color="success" class="online_add_tag">
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
                <router-link v-if="formValidate.sql_files.length>0"
                             v-for="item in change_order_list.filter(item2 => this.formValidate.sql_files.indexOf(item2.id)>=0)"
                             :value="item.id" :key="item.id"
                             :to="{name: 'database_audit_detail', params: {id: item.id}}">
                  <Tag>
                    {{item.title}}
                    <Icon type="md-open"/>
                  </Tag>
                </router-link>
                <Tag v-if="formValidate.sql_files.length<=0">
                  无数据库变更
                </Tag>
              </div>
              <i-switch v-if="this.$route.params.id" size="large" v-model="sql_files_can_edit"
                        style="position: absolute;right: 0;top:7px">
                <span slot="open">查看</span>
                <span slot="close">编辑</span>
              </i-switch>

            </FormItem>


            <FormItem label="阿波罗配置" prop="apollo_config">
              <Tag v-for="apollo in formValidate.apollo_config" :key="apollo.app_id">
                <div @click="apollo_config_modal=true">{{apollo.app_id}}</div>
              </Tag>
              <Button icon="ios-add" type="dashed" size="small" @click="apollo_config_modal=true">增加/修改一个阿波罗配置</Button>

            </FormItem>


            <FormItem label="提测内容" prop="content">
              <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 10,maxRows: 10}"
                     placeholder="新增内容、修改点、可能影响的点、测试依赖项、接口文档地址等内容"></Input>
            </FormItem>

            <FormItem label="性能测试" prop="note">
              <Select v-model="formValidate.performance" style="width: 100%">
                <Option value="不需要">不需要</Option>
                <Option value="需要">需要</Option>
              </Select>
            </FormItem>

            <FormItem v-if="this.formValidate.performance=='需要'" label="性能模板" prop="performance_note">
              <Input v-model="formValidate.performance_note" type="textarea" :autosize="{minRows: 5,maxRows: 15}"
                     placeholder="如果是性能回归：标明场景。如果是新任务：标明场景并提供，是否属于异步，测试数据量级、CPU利用率、内存、TPS要求（T2环境的CPU为8核超线程，16processors）">
              </Input>
            </FormItem>


            <FormItem label="注意事项" prop="notice">
              <Input v-model="formValidate.notice" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                     placeholder="开发建议测试的注意事项、测试重点、覆盖范围、风险项等"></Input>
            </FormItem>


          </Form>

        </Card>
        <br/>
      </Col>
      <Col :md="24" :lg="9">

        <Card>
          <Icon type="ios-time" size="18"/>
          时间计划
          <Divider style="margin: 15px 0"/>
          <Form ref="formValidate_date" :model="formValidate" :rules="ruleValidate" :label-width="100">


            <FormItem label="实际提测日期" prop="real_submit_test_time">
              <DatePicker v-model="formValidate.real_submit_test_time" type="date" placeholder=""
                          :style="{width: '100%'}" disabled></DatePicker>
            </FormItem>

            <FormItem label="计划上线日期" prop="plan_online_time">
              <DatePicker type="date" v-model="formValidate.plan_online_time" placeholder="必须是确认过的时间"
                          :style="{width: '100%'}"></DatePicker>
            </FormItem>

          </Form>
        </Card>
        <br/>
        <Card>
          <Icon type="ios-people" size="18"/>
          相关人员
          <Divider style="margin: 15px 0"/>
          <Form ref="formValidate_users" :model="formValidate" :rules="ruleValidate" :label-width="100">

            <FormItem label="产品人员" prop="product_users">
              <Select v-model="formValidate.product_users" filterable multiple placeholder="第一个为负责人">
                <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">
                  <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
                  <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>
                </Option>
              </Select>
            </FormItem>
            <FormItem label="开发人员" prop="dev_users">
              <Select v-model="formValidate.dev_users" filterable multiple placeholder="第一个为负责人">
                <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">
                  <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
                  <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>
                </Option>
              </Select>
            </FormItem>
            <FormItem label="测试人员" prop="test_users">
              <Select v-model="formValidate.test_users" filterable multiple placeholder="第一个为负责人">
                <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">
                  <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
                  <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>
                </Option>
              </Select>
            </FormItem>

          </Form>

        </Card>
        <br/>

        <Card>
          <Icon type="md-git-branch" size="18"/>
          变更历史
          <Divider style="margin: 15px 0"/>
          <Timeline :style="{height:'230px',overflow:'auto'}">
            <TimelineItem v-for="item in operation_list" :key="item.name">
              <p class="time">{{item.create_time}}</p>
              <p class="content">{{item.realname}}:{{item.change_action}} </p>
            </TimelineItem>
          </Timeline>
        </Card>
        <br/>
      </Col>
    </Row>

    <Modal
      v-model="apollo_config_modal"
      fullscreen
      ok-text="确定"
      cancel-text="取消"
      title="阿波罗配置(每项配置必须有注释)"
      :styles="{marginTop: '20px',left: '2%'}">


      <Tabs type="card" closable @on-tab-remove="handle_apollo_config_tabs_remove">
        <TabPane v-for="tab in formValidate.apollo_config" :key="tab.app_id" :name="tab.app_id"
                 :label="tab.app_id">
          <editor v-model="tab.content" @init="editorInit" lang="sql" theme="clouds" height="600"
                  ref='myEditor'></editor>
        </TabPane>
        <Button @click="show_add_apollo_config_modal=true" size="small" slot="extra">增加一个阿波罗配置</Button>
      </Tabs>
    </Modal>


    <Modal
      v-model="show_add_apollo_config_modal"
      title="请阿波罗服务名"
      @on-ok="add_apollo_config_modal_ok"
      @on-cancel="show_add_apollo_config_modal=false">

      <Select v-model="apollo_app_id_tmp" filterable clearable>
        <Option v-for="item in apollo_list" :value="item.AppId" :key="item.AppId"> {{item.AppId}} / {{item.Name}}
        </Option>
      </Select>

    </Modal>


    <!--添加/编辑弹窗-->
    <Modal
      v-model="addModal"
      :title="addTitle"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form ref="addForm" :model="addForm" :rules="addRules" :label-width="60">
        <FormItem label="服务" prop="service_name">
          <Select v-model="addForm.service_name" placeholder="选择服务" filterable
                  @on-change="handleChangeService">
            <Option v-for="(item, key) in serviceList" :key="key"
                    :value="item.job_name" :label="item.job_name">
              <span>{{ item.job_name }}</span>
              <span style="float:right;color:#ccc;margin-right: 20px">{{ item.view_name }}</span>
            </Option>
          </Select>


        </FormItem>
        <FormItem label="分支" prop="service_branch">
          <Select v-model="addForm.service_branch" placeholder="选择分支" filterable>
            <Option v-for="(item, key) in branchesList" :key="key"
                    :value="item" :label="item"></Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>


    <Modal
      v-model="show_package_modal"
      title="请选择打包环境"
      @on-ok="go_jenkins"
    >
      <Form :model="jenkins_package" label-position="left" :label-width="100">
        <FormItem label="服务与分支">
          <CheckboxGroup v-model="jenkins_package.job_names">
            <div v-for="item in this.formValidate.service_and_branch" :key="item.service_name">
              <Checkbox
                :label="item.service_name">{{item.service_name}} | {{item.service_branch}}
              </Checkbox>
            </div>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="选择环境">
          <CheckboxGroup v-model="jenkins_package.env">
            <Checkbox label="T1"></Checkbox>
            <Checkbox label="T2"></Checkbox>
            <Checkbox label="T3"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="特殊选择">
          <RadioGroup v-model="jenkins_package.special">
            <Radio label="">对应分支</Radio>
            <Radio label="master">master分支</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>


  </div>


</template>
<script>

  import {baseURL} from '@/config'
  import {getCurrentDate, formatDateYYYMMDD} from '@/lib/tools'
  import {JsonToString, StringToJson} from '@/lib/utils'
  import {baseServices, userList, baseDepartments, baseFiles, baseFilesPreview, baseApollos} from '@/api/base'
  import {
    createOrUpdateFlowTesttask,
    getflowTesttask,
    getflowTesttaskOperations,
    getVersionsList,
    startServer
  } from '@/api/testtask'
  import {mapState, mapGetters} from 'vuex'
  import {getChangeOrderList} from '@/api/database'
  import editor from "vue2-ace-editor";
  import {
    getServicesList,
    getJenkinsServices,
    getBranchesByServices,
    getVersionOverviewInfo
  } from '@/api/project'

  const ADD_FORM = {
    service_branch: '',
    service_name: '',
  }

  export default {
    data() {
      return {
        apollo_app_id_tmp: '',
        apollo_list: [],
        apollo_config_modal: false,
        show_add_apollo_config_modal: false,
        upload_file_url: baseURL + "/api/base/files/",
        model14: [],
        loading2: false,
        sql_files_can_edit: false,
        version_id_can_edit: false,
        options2: [],
        file_preview_visible: false,
        file_preview_html: '',
        file_preview_title: '',
        users_list: [],
        team_list: [],
        service_list: [],
        operation_list: [],
        oldformValidate: {},
        submitformValidate: {},
        sql_files: [],
        change_order_list: [],
        version_list: [],
        serviceList: [], // 服务列表
        branchesList: [], // 分支列表
        formValidate: {
          title: '',
          product_docs: '',
          service_name: [],
          service_branch: '',
          sql_files: [],
          content: '',
          notice: '',
          performance: '不需要',
          performance_note: '',
          real_submit_test_time: getCurrentDate(),
          plan_online_time: '',
          product_users: [],
          dev_users: [],
          test_users: [],
          dev_team: this.dev_team(),
          type: '',
          status: '已提测',
          apollo_config: [],
          version_id: this.$route.query.versionId?[parseInt(this.$route.query.versionId)]:[],
          service_and_branch: [],
          system: "",
        },
        addModal: false, // 需求添加
        addTitle: '添加服务与分支',
        loading: true,
        addForm: {...ADD_FORM},
        addRules: {
          service_name: [
            {required: true, message: '请选择服务', trigger: 'change'}
          ],
          service_branch: [
            {required: true, message: '请选择分支', trigger: 'change'}
          ],
        },
        show_package_modal: false,
        jenkins_package: {"env": ["T1"], "special": "","job_names":[]},
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          product_docs: [
            {required: true, message: '需求文档不能为空', trigger: 'blur'},
          ],
          sql_files: [],
          content: [
            {required: true, message: '提测内容不能为空', trigger: 'blur'}
          ],
          notice: [
            {required: false, message: '注意事项不能为空', trigger: 'blur'}
          ],
          note: [
            {required: false, message: '备注内容不能为空', trigger: 'blur'},
          ],
          real_submit_test_time: [
            {required: true, message: '提测日期不能为空'},
          ],
          plan_online_time: [
            {required: true, message: '计划上线日期不能为空'},
          ],
          product_users: [],
          dev_users: [
            {required: true, type: 'array', min: 1, message: '至少选择一人', trigger: 'change'},
          ],
          test_users: [
            {required: true, type: 'array', min: 1, message: '至少选择一人', trigger: 'change'},
          ],
          dev_team: [
            {required: true, type: 'array', min: 1, message: '至少选择一个团队', trigger: 'change'},
          ],
        }
      }
    },
    methods: {
      ...mapGetters([
        'dev_team','userinfo'
      ]),
      async handleSubmit() {

        let valid = true
        await this.$refs['formValidate_content'].validate((valid_content) => {
          valid = valid && valid_content
        })
        await this.$refs['formValidate_date'].validate((valid_date) => {
          valid = valid && valid_date
        })
        await this.$refs['formValidate_users'].validate((valid_users) => {
          valid = valid && valid_users
        })

        if (!this.formValidate.type) {
          this.$Message.error({content: '【提测单类型】没有填写，请检查一下!', duration: 5});
          valid = false
        }

        if (valid) {
          this.flowTesttask()
        } else {
          this.$Message.error('您还有未填写完整的内容，请检查一下!');
        }

      },
      handleReset() {
        this.$refs['formValidate_content'].resetFields();
        this.$refs['formValidate_date'].resetFields();
        this.$refs['formValidate_users'].resetFields();
      },
      handleFileSuccess(res, file) {
        file.name = res.data.file_name;
        file.id = res.data.id;
        let tmp = this.formValidate.sql_files.concat([file.id])
        this.$set(this.formValidate, 'sql_files', tmp)
      },

      handleFileRemove(file) {
        let tmp = [...this.formValidate.sql_files]
        tmp.splice(tmp.indexOf(file.id), 1)
        this.$set(this.formValidate, 'sql_files', tmp)
      },

      handleFilePreview(file) {
        this.$Spin.show();
        baseFilesPreview({id: file.id}).then(res => {
          if (res.data.status) {
            this.file_preview_html = res.data.data
            this.file_preview_visible = true
            this.file_preview_title = file.name
          } else {

          }
          this.$Spin.hide();
        }, error => {
          this.$Spin.hide();
        });
      },
      getBaseServices() {
        baseServices().then(res => {
          if (res.data.status) {
            this.service_list = [...this.service_list, ...res.data.data]
            let tmp1 = []
            let tmp2 = []

            for (let j = 0, len = this.service_list.length; j < len; j++) {
              if (this.service_list[j].department_name == this.dev_team()[0]) {
                tmp1.push(this.service_list[j])
              } else {
                tmp2.push(this.service_list[j])
              }
            }
            this.service_list = [...tmp1, ...tmp2]

          } else {

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
      getBaseApollos() {
        baseApollos().then(res => {
          if (res.data.status) {
            this.apollo_list = res.data.data
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
      flowTesttask() {
        if (Object.getOwnPropertyNames(this.submitformValidate).length <= 1) {
          this.$Message.error("你好像没有修改内容，不必提交哦");
          return
        }

        let data = JsonToString({data: {...this.submitformValidate, id: this.oldformValidate.id}})
        createOrUpdateFlowTesttask({data}).then(res => {
          if (res.data.status) {
            this.$Message.success('提交成功!');
            // this.handleReset()
            if (this.$route.name == 'flow_testtask_detail') {
              this.$router.push({name: 'flow_testtask_detail', params: {id: res.data.data.id}})
            } else {
              this.$router.push({name: 'flow_testtask_list'})
            }

            this.getflowTesttask()
            this.getflowTesttaskOperations()
          } else {
            this.$Message.error(res.data.message);
          }
        });
      },
      getflowTesttask() {
        if (this.$route.params.id) {
          getflowTesttask({id: this.$route.params.id}).then(res => {
            this.formValidate = StringToJson({data: res.data.data})
            this.oldformValidate = {...StringToJson({data: res.data.data})}
            this.oldformValidate.apollo_config = JSON.parse(JSON.stringify(res.data.data.apollo_config))
            this.oldformValidate.service_and_branch = JSON.parse(JSON.stringify(res.data.data.service_and_branch))

            this.getbaseFiles()

          });
        }
      },
      getflowTesttaskOperations() {
        if (this.$route.params.id) {
          getflowTesttaskOperations({id: this.$route.params.id}).then(res => {
            this.operation_list = res.data.data
          });
          ``
        }
      },
      getbaseFiles() {
        if (this.formValidate.sql_files.length <= 0 || this.formValidate.version != 1) {
          return
        }
        baseFiles({ids: this.formValidate.sql_files}).then(res => {
          this.sql_files = []
          for (let i in res.data.data) {
            this.sql_files.push({id: res.data.data[i].id, name: res.data.data[i].file_name})
          }
        });
      },
      getflowTesttaskList({data, query}) {
        getChangeOrderList({data, query}).then(res => {
          if (res.data.status) {
            let change_order_list = JSON.parse(JSON.stringify(this.change_order_list))
            let mychange_order_list = res.data.data
            for (let i in mychange_order_list) {
              let mytesttask = mychange_order_list[i]
              let find_testtask = change_order_list.find(t => t.id == mytesttask.id)
              if (!find_testtask) {
                this.change_order_list = [...this.change_order_list, mytesttask]
              }
            }
          }
          if (this.oldformValidate.testtask) {
            this.formValidate.testtask = JSON.parse(JSON.stringify(this.oldformValidate.testtask))
          }
        });
      },
      sql_files_can_edit_show() {
        if (this.$route.params.id) {
          this.sql_files_can_edit = false;
          this.version_id_can_edit = false;
        } else {
          this.sql_files_can_edit = true
          this.version_id_can_edit = true;
        }
      },
      editorInit: function (editor) {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/sql')
        require('brace/theme/clouds')
        require('brace/snippets/javascript') //snippet
        editor.setShowPrintMargin(false);

      },
      add_apollo_config_modal_ok() {

        if (this.formValidate.apollo_config.find(t => t.app_id == this.apollo_app_id_tmp)) {
          this.$Message.error('这个阿波罗已经有了，不能重复添加');
          return
        }

        if (this.apollo_app_id_tmp == "" || this.apollo_app_id_tmp == undefined) {
          this.$Message.error('未选中任何一个选项');
          return
        }

        if (this.formValidate.apollo_config >= 10) {
          this.$Message.error('最多支持10个apollo配置');
          return
        }

        this.formValidate.apollo_config.push({"app_id": this.apollo_app_id_tmp, "content": ""})

      },
      handle_apollo_config_tabs_remove: function (app_id) {
        let index = this.formValidate.apollo_config.findIndex((value, index, arr) => value.app_id == app_id)
        this.$delete(this.formValidate.apollo_config, index);
      },

      async getVersionList(stage, status, id) {
        const {data} = await getVersionsList(99999999, 0, stage, status, id)
        for (let i in data.data) {
          var index = this.version_list.findIndex((value, index, arr) => value.id == data.data[i].id)
          if (index == -1) {
            this.version_list.push(data.data[i])
          }
        }
      },


      // 点击添加按钮
      addService() {
        this.loading = false
        this.formValidate.service_and_branch.push(
          {
            service_name: this.addForm.service_name,
            service_branch: this.addForm.service_branch,
          }
        )
      },

      // 点击删除按钮
      deleteService(event, name) {

        var index = this.formValidate.service_and_branch.findIndex((value) => value.service_name == name);

        this.formValidate.service_and_branch.splice(index, 1);
      },

      // 点击添加按钮
      handleAddBtn() {
        // 重置
        this.addForm = {...ADD_FORM}
        this.branchesList = []
        // 打开弹窗
        this.addModal = true
      },

      // modal取消
      cancel() {
        this.$refs['addForm'].resetFields()
        this.addModal = false
      },
      // Jenkins服务列表
      async getJenkinsServices() {
        const {data} = await getJenkinsServices()
        this.serviceList = data.status ? data.data : []
      },
      // 选择服务
      handleChangeService() {
        this.addForm.service_branch = ''

        if (this.addForm.service_name) {
          this.getBranchesByServices()
        }
      },
      // 查询服务对应的分支
      async getBranchesByServices() {
        const {data} = await getBranchesByServices(this.addForm.service_name)
        this.branchesList = data.status ? data.data : []
      },
      // modal确定
      ok() {
        this.$refs['addForm'].validate((valid) => {

          if (valid) {
            this.addService();
            this.addModal = false
          } else {
            setTimeout(() => {
              this.loading = false
              this.$nextTick(() => {
                this.loading = true
              })
            }, 300)
          }

        })
      },

      exec_jenkins() {
        let tmp = []
        for (let value of this.formValidate.service_and_branch.values()) {
          tmp.push(value.service_name);
        }
        this.jenkins_package.job_names = tmp;
        this.show_package_modal = true;
      },


      go_jenkins() {

        if (!this.userinfo().department_list.includes('测试部')){
          this.$Message.error({content: '抱歉，只有测试部人员才可以打包测试环境！', duration: 5});
          return
        }
        let jenv = this.jenkins_package.env;
        let jjbo_names = this.jenkins_package.job_names;
        let jspecial = this.jenkins_package.special;
        let service_and_branch = this.formValidate.service_and_branch;
        let Notice = this.$Notice;
        jenv.forEach(function (env, index) {
          jjbo_names.forEach(function (job_name, index) {
            if (jspecial == "master") {
              var service_branch = 'origin/master'
            } else {
              var service_branch = service_and_branch.filter(item2 => item2.service_name == job_name)[0].service_branch
            }
            var {res} = startServer(job_name, service_branch, env);

            Notice.success({
              title: '触发Jenkins成功',
              desc: `环境：${env} 服务：${job_name} 分支：${service_branch}`
            });


          });
        });
      },


      async version_id_change(value) {


        if (this.$route.params.id) {
          return
        }


        let title = [];
        let dev_team = [];
        let product_docs = [];
        let service_and_branch = [];
        let plan_online_time = [];
        let product_users = [];
        let dev_users = [];
        let test_users = [];
        let system = [];


        for (let i in value) {
          let version_id = value[i];
          const {data} = await getVersionOverviewInfo(version_id)
          title.push(data.data.title);
          for (var j in data.data.story_list) {
            product_docs.push(data.data.story_list[j].zentao_url + "【" + data.data.story_list[j].title + "】")
          }
          plan_online_time.push(data.data.online_plan_time);
          product_users.push(...JSON.parse(data.data.product_users));
          dev_users.push(...JSON.parse(data.data.dev_users));
          test_users.push(...JSON.parse(data.data.test_users));
          system.push(data.data.product_title)
        }

        this.formValidate.title = title.join('&');
        this.formValidate.product_docs = product_docs.join('\n');
        this.formValidate.plan_online_time = Array.from(new Set(plan_online_time)).length == 1 ? plan_online_time[0] : "";
        this.formValidate.product_users = Array.from(new Set(product_users));
        this.formValidate.dev_users = Array.from(new Set(dev_users));
        this.formValidate.test_users = Array.from(new Set(test_users));
        this.formValidate.system = Array.from(new Set(system)).length == 1 ? system[0] : "";


        for (let i in value) {
          let version_id = value[i];
          const {data} = await getServicesList(version_id)
          for (var j in data.data) {
            service_and_branch.push({
              "service_name": data.data[j].server_name,
              "service_branch": data.data[j].git_branch
            })
          }
        }

        this.formValidate.service_and_branch = service_and_branch;


        for (let i in dev_users) {
          var tmp = this.users_list.find(t => t.realname == dev_users[i]);
          dev_team.push(JSON.parse(tmp.department_list).join('-'))

        }

        this.formValidate.dev_team = Array.from(new Set(dev_team));
      },

    },
    computed: {
      performance_area() {
        if (this.formValidate.performance == '不需要') {
          return true
        } else {
          return false
        }
      },
      submit_show() {
        if (this.oldformValidate.status == '已上线') {
          return false
        } else {
          return true
        }
      },


    },

    mounted: function () {
      this.getflowTesttaskList({data: {status: '已通过'}, query: {limit: 1000}})
      this.getflowTesttask()
      this.getBaseServices()
      this.getUserList()
      this.getBaseDepartments()
      this.getBaseApollos()
      this.getflowTesttaskOperations()
      this.sql_files_can_edit_show()
      this.getVersionList(4, '已完成', null)
      this.getJenkinsServices()

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
        },
        deep: true
      },
      'formValidate.dev_team': function (nowVal, oldVal) {
        let tmp = [...this.formValidate.test_users]
        //
        // if (nowVal.indexOf('互联网金融事业群-技术中心-金融服务开发部') > -1) {
        //   let users = ['zhuql']
        //   tmp = [...new Set(tmp.concat(users))]
        //   console.log(tmp)
        //   this.$set(this.formValidate, 'test_users', tmp)
        // }
        // if (nowVal.indexOf('互联网金融事业群-技术中心-支持系统开发部') > -1) {
        //   let users = ['yangx']
        //   tmp = [...new Set(tmp.concat(users))]
        //   this.$set(this.formValidate, 'test_users', tmp)
        // }
        // if (nowVal.indexOf('互联网金融事业群-技术中心-公用技术开发部') > -1) {
        //   let users = ['chenc']
        //   tmp = [...new Set(tmp.concat(users))]
        //   this.$set(this.formValidate, 'test_users', tmp)
        // }
        // if (nowVal.indexOf('互联网金融事业群-技术中心-产品开发部') > -1) {
        //   let users = ['chengm']
        //   tmp = [...new Set(tmp.concat(users))]
        //   this.$set(this.formValidate, 'test_users', tmp)
        // }
        // if (nowVal.indexOf('互联网金融事业群-技术中心-测试部') > -1) {
        //   let users = ['']
        //   tmp = [...new Set(tmp.concat(users))]
        //   this.$set(this.formValidate, 'test_users', tmp)
        // }

      },
      '$route'(to, from) {
        //刷新页面
        this.$router.go(0);

      },
      'oldformValidate.sql_files': {
        handler: function (nowVal, oldVal) {
          for (let i in nowVal) {
            this.getflowTesttaskList({data: {id: nowVal[i]}, query: {limit: 1000}})
          }
        }
      },
      'oldformValidate.version_id': {
        handler: function (nowVal, oldVal) {
          for (let i in nowVal) {
            this.getVersionList(null, null, nowVal[i])
          }
        }
      }

    },
    components: {
      editor
    },


  }
</script>
