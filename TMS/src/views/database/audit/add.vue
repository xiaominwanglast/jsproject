<style>

  .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border-radius: 0;
    background: #fff;
  }

  .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    border-top: 1px solid #3399ff;
  }

  .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
  }

  .database_add_timeline > .ivu-timeline-item > .ivu-timeline-item-head {
    margin-top: 10px !important;
  }

  .ivu-modal-fullscreen {
    width: 96% !important;
  }
</style>

<style scoped>
  .database_add_collapse_username {
    width: 70px;
    display: inline-block
  }

  .demo-tabs-style3 {
    height: calc(100vh - 500px);
    background: #fff;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color .2s ease;
    padding-top: calc(15vh);
  }

  .demo-tabs-style3:hover {
    border: 1px dashed #2d8cf0;
  }
</style>

<template>
  <div>
    <Row :gutter="10">
      <Col :md="24" :lg="24">
        <Card>
          <div>
            <Icon type="ios-grid" size="18"/>
            数据库
            <div :style="{float:'right'}">
              <Button
                v-if="(formItem_old.status!='已上线' && formItem_old.submit_user == realname) || (!this.$route.params.id)"
                type="primary"
                @click="handleTabsSubmit"
                style="margin-left: 8px">
                提交审核
              </Button>
            </div>
          </div>
          <br>

          <Form ref="formItem" :label-width="80" :model="formItem" :rules="formItemValidate">
            <FormItem label="审核标题" prop="title">
              <Input v-model="formItem.title" placeholder="">
              </Input>
            </FormItem>

            <FormItem label="所属团队" prop="dev_team">
              <Select v-model="formItem.dev_team" filterable multiple>
                <Option v-for="item in team_list" :value="item.name" :key="item.name" :label="item.name">
                  <span>{{ item.name }}</span>
                </Option>
              </Select>
            </FormItem>


            <FormItem label="审核人员" prop="check_users">
              <Select v-model="formItem.check_users" filterable placeholder="" multiple>
                <Option value="王新">王新</Option>
                <Option value="王君">王君</Option>
              </Select>
            </FormItem>


            <FormItem label="抄送人员" prop="cc_users">
              <Select v-model="formItem.cc_users" filterable multiple placeholder="">
                <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">
                  <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
                  <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>
                </Option>
              </Select>
            </FormItem>

            <FormItem label="备注信息" prop="note">
              <Input v-model="formItem.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="我想对DBA说..."></Input>
            </FormItem>

          </Form>


          <div class="demo-tabs-style2" v-if="database_dbchange.length>0">
            <Tabs type="card" closable @on-tab-remove="handleTabsRemove">
              <TabPane v-for="tab in database_dbchange" :key="tab.database" :name="tab.dbinfo_id"
                       :label="tab.database+' ('+tab.type+')'">
                <editor v-model="tab.content" @init="editorInit" lang="sql" theme="clouds" height="300"
                        ref='myEditor'></editor>
              </TabPane>
              <Button @click="handleTabsAdd" size="small" slot="extra">增加一个数据库更改</Button>
            </Tabs>
            <br/>
          </div>


          <div class="demo-tabs-style3" @click="handleTabsAdd" v-if="database_dbchange.length<=0">
            <div>
              <Icon type="md-add-circle" size="50" color="#2d8cf0"/>
              <p>增加一个数据库更改</p>
            </div>
          </div>

        </Card>
        <br/>
      </Col>
      <Col :md="24" :lg="24" v-if="database_change_order_audit.length!=0">
        <Card>
          <Icon type="ios-time" size="18"/>
          审核建议
          <Button v-if="formItem_old.status!='已上线' && formItem_old.check_users.includes(realname) "
                  @click="handleTabsSubmit2" type="primary"
                  slot="extra">DBA审核
          </Button>
          <Divider style="margin: 15px 0"/>
          <Timeline class="database_add_timeline">
            <TimelineItem v-for="audit in database_change_order_audit" :key="audit.id">
              <Collapse>
                <Panel name="1">
                  {{ audit.create_time }}
                  <div class="database_add_collapse_username">【{{ audit.realname }}】</div>
                  <Tag v-if="audit.status=='提交变更单'" color="primary">{{audit.status}}</Tag>
                  <Tag v-else-if="audit.status=='修改变更单并重新提交'" color="warning">{{audit.status}}</Tag>
                  <Tag v-else-if="audit.status=='审核不通过'" color="error">{{audit.status}}</Tag>
                  <Tag v-else-if="audit.status=='审核通过'" color="success">{{audit.status}}</Tag>
                  <Tag v-else-if="audit.status=='已上线'" color="#a917a6">{{audit.status}}</Tag>
                  <Tag v-else color="black">{{audit.status}}</Tag>
                  <div slot="content">
                    <pre v-html="audit.content"></pre>
                    <Button v-if="audit.old_dbchangehistory_id!='[]'"
                            @click="show_dbchange_history(audit.old_dbchangehistory_id,audit.new_dbchangehistory_id)"
                            type="default" size="small"> 与上个版本对比查看
                    </Button>
                  </div>
                </Panel>
              </Collapse>
            </TimelineItem>

          </Timeline>
        </Card>

      </Col>
    </Row>

    <Modal
      v-model="show_add_database_modal"
      title="请选择数据库"
      @on-ok="add_database_modal_ok"
      @on-cancel="add_database_modal_cancel">
      <Form :model="database_info_form" :label-width="80">
        <FormItem label="类型">
          <Select v-model="database_info_form.type">
            <Option value="MySQL">MySQL</Option>
            <Option value="MongoDB">MongoDB</Option>
            <Option value="Redis">Redis</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库">
          <Select v-model="database_info_form.dbinfo_id" filterable clearable>
            <Option v-if="item.type == database_info_form.type"
                    v-for="item in database_info" :value="item.id.toString()" :key="item.id" :label="item.database">
              <span>{{ item.database }}</span>
            </Option>
          </Select>
        </FormItem>


      </Form>
    </Modal>


    <Modal
      v-model="show_add_database_modal2"
      title="审核建议"
      @on-ok="handleAuditSubmit"
      @on-cancel="">
      <Form :model="audit_data">
        <FormItem>
          <Input v-model="audit_data.content" type="textarea" :autosize="{minRows: 10,maxRows: 10}"
                 placeholder=""></Input>
          <RadioGroup style="float: right" v-model="audit_data.status">
            <Radio label="审核通过" style="color: #19be6b">
              <Icon type="md-checkmark"/>
              <span>审核通过</span>
            </Radio>
            <Radio label="审核不通过" style="color: #ed4014">
              <Icon type="md-close"/>
              <span>审核不通过</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>


    <Modal
      v-model="show_dbchange_history_visible"
      fullscreen
      title="查看历史对比"
      :styles="{marginTop: '20px',left: '2%'}">
      <div class="demo-tabs-style2">
        <Tabs type="card">
          <TabPane v-for="tab in dbchange_history_data" :key="tab.database" :name="tab.database"
                   :label="tab.database+' ('+tab.type+')'">
            <vueCodeDiff outputFormat="line-by-line" :old-string="tab.old_content" :new-string="tab.new_content"
                         :context="10"/>
          </TabPane>
        </Tabs>
      </div>
    </Modal>


    <!--database_dbchange:{{ database_dbchange }}-->
    <!--<br/><br/>-->
    <!--database_dbchange_old:{{ database_dbchange_old }}-->
    <!--<br/><br/>-->
    <!--database_dbchange_submit:{{ database_dbchange_submit }}-->
    <!--<br/><br/>-->
    <!--formItem:{{ formItem }}-->
    <!--<br/><br/>-->
    <!--formItem_old:{{ formItem_old }}-->
    <!--<br/><br/>-->
    <!--formItem_submit:{{ formItem_submit }}-->


  </div>
</template>
<script>

  import {baseURL} from '@/config'
  import {getCurrentDate, formatDateYYYMMDD} from '@/lib/tools'
  import {JsonToString, StringToJson} from '@/lib/utils'
  import {baseServices, userList, baseDepartments, baseFiles, baseFilesPreview} from '@/api/base'
  import {
    getDatabaseInfo,
    createOrUpdateChangeOrder,
    createOrUpdateChange,
    getChangeOrder,
    getChange,
    getChangeOrderAudit,
    getChangeHistory,
    putChangeOrderAudit
  } from '@/api/database'
  import {mapState, mapGetters} from 'vuex'
  import editor from "vue2-ace-editor";
  import vueCodeDiff from 'vue-code-diff'

  export default {
    data() {
      return {
        database_info: [],
        database_info_form: {},
        database_dbchange: [],
        database_dbchange_old: [],
        database_dbchange_submit: [],

        team_list: [],

        show_add_database_modal: false,
        show_add_database_modal2: false,
        show_dbchange_history_visible: false,


        dbchange_history_data: [],
        formItem: {
          title: '',
          dbchange_ids: [],
          dev_team: this.dev_team(),
          check_users: ['王新', '王君'],
          cc_users: [],
          note: '',
          id: 0,
        },
        formItemValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          dev_team: [
            {required: true, type: 'array', min: 1, message: '请至少选择一个团队', trigger: 'change'},
          ],
          check_users: [
            {required: true, type: 'array', min: 1, message: '请至少选择一个审核人员', trigger: 'change'},
          ],
        },
        formItem_old: {},
        formItem_submit: {},
        database_change_order_audit: [],
        audit_data: {content: '', status: ''},
        users_list: [],
      }
    },
    computed: {
      ...mapGetters([
        'realname',
      ]),
    },
    methods: {
      ...mapGetters([
        'dev_team'
      ]),
      editorInit: function (editor) {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/sql')
        require('brace/theme/clouds')
        require('brace/snippets/javascript') //snippet
        editor.setShowPrintMargin(false);

      },
      handleTabsAdd: function () {
        this.show_add_database_modal = true;
      },
      handleTabsRemove: function (dbinfo_id) {

        let index = this.database_dbchange.findIndex((value, index, arr) => value.dbinfo_id == dbinfo_id)
        let id = this.database_dbchange[index].id;
        this.$delete(this.database_dbchange, index);
        let i = this.formItem_submit.dbchange_ids.indexOf(id);
        if (i > -1) {
          // this.formItem_submit.dbchange_ids.splice(i, 1);
          this.formItem_submit.dbchange_ids[i] = -this.formItem_submit.dbchange_ids[i]
        }

      },
      async handleTabsSubmit() {

        let valid = true;
        await this.$refs['formItem'].validate((valid_content) => {
          valid = valid && valid_content
        })

        if (valid) {
          await this.createOrUpdateChange();
          this.createOrUpdateChangeOrder();
        }
      },
      handleTabsSubmit2: function () {
        this.show_add_database_modal2 = true;
      },
      add_database_modal_ok() {

        if (this.database_dbchange.find(t => t.dbinfo_id == this.database_info_form.dbinfo_id)) {
          this.$Message.error('这个数据库已经有了，不能重复添加');
          return
        }

        if (this.database_dbchange.length >= 10) {
          this.$Message.error('每个数据库变更单最多支持10个，请拆开提交');
          return
        }

        let info = this.database_info.find(t => t.id == this.database_info_form.dbinfo_id);
        this.database_info_form.database = info.database;
        if (this.database_dbchange[0]) {
          this.database_dbchange.push(this.database_info_form);
        } else {
          this.$set(this.database_dbchange, 0, this.database_info_form)
        }

        this.init_database_info_data();

      },
      add_database_modal_cancel() {

      },
      getDatabaseInfo: function () {
        getDatabaseInfo().then(res => {
          this.database_info = res.data.data
        });
      },
      init_database_info_data: function () {
        this.database_info_form = {
          type: 'MySQL',
          database: '',
          content: '',
          dbinfo_id: '',
        };
      },
      getBaseDepartments: function () {
        baseDepartments().then(res => {
          if (res.data.status) {
            this.team_list = res.data.data
          } else {

          }
        });
      },

      createOrUpdateChangeOrder: function () {
        if (Object.keys(this.formItem_submit).length === 0) {
          return
        }

        let data = JsonToString({data: {...this.formItem_submit}});
        if (this.$route.params.id) {
          data.id = this.$route.params.id
        }


        createOrUpdateChangeOrder({data}).then(res => {
          if (res.data.status) {
            this.$Message.success('提交成功!');
            this.$router.push({name: 'database_audit_list'})
          } else {
            this.$Message.error(res.data.message);
          }
        });
      },

      async createOrUpdateChange() {
        for (let i in this.database_dbchange_submit) {
          let data = JsonToString({data: {...this.database_dbchange_submit[i]}});
          await createOrUpdateChange({data}).then(res => {
            if (res.data.status) {
              if (!this.formItem.dbchange_ids.includes(res.data.data.id)) {
                this.formItem.dbchange_ids.push(res.data.data.id);
                this.formItem_submit.dbchange_ids.push('+' + res.data.data.id);
              }
              // this.$Message.success('提交成功!');
            } else {
              this.$Message.error(res.data.message);
            }
          });
        }
      },
      getChangeOrder() {
        if (this.$route.params.id) {
          getChangeOrder({id: this.$route.params.id}).then(res => {
            this.formItem = StringToJson({data: res.data.data})
            // this.$set(this.formItem, StringToJson({data: res.data.data}))
            this.formItem_old = {...StringToJson({data: res.data.data})}
            this.database_dbchange = [];
            this.database_dbchange_old = [];

            this.formItem_submit.dbchange_ids = this.formItem_old.dbchange_ids

            for (let i in res.data.data.dbchange_ids) {
              this.getChange(res.data.data.dbchange_ids[i])
            }
            this.getChangeOrderAudit()

          });
        }
      },
      getChange(id) {
        getChange({id: id}).then(res => {
          this.database_dbchange.push(res.data.data);
          this.database_dbchange_old.push({...StringToJson({data: res.data.data})});
        });
      },
      getChangeOrderAudit() {
        if (this.$route.params.id) {
          getChangeOrderAudit({id: this.$route.params.id}).then(res => {
            this.database_change_order_audit = res.data.data;
          });
        }
      },
      getChangeHistory(ids) {
        getChangeHistory({ids: ids}).then(res => {
          this.dbchange_history_data = []
          if (res.data.status) {
            this.dbchange_history_data = res.data.data
          } else {
          }
        });
      },

      show_dbchange_history(old_ids, new_ids) {
        let ids = [old_ids, new_ids]
        this.getChangeHistory(ids);
        this.show_dbchange_history_visible = true
      },
      handleAuditSubmit() {
        this.audit_data.id = this.$route.params.id
        let data = JsonToString({data: {...this.audit_data}});
        putChangeOrderAudit({data}).then(res => {
          if (res.data.status) {
            this.$Message.success('提交成功!');
            this.$router.push({name: 'database_audit_list'})
          } else {
            this.$Message.error(res.data.message);
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
    },
    mounted: function () {
      this.init_database_info_data();
      this.getUserList();
      this.getBaseDepartments();
      this.getDatabaseInfo();
      this.getChangeOrder();
    },

    watch: {
      'database_dbchange': {
        handler: function (nowVal, oldVal) {
          if (this.$route.params.id) {
            for (let i in this.database_dbchange) {
              let index = this.database_dbchange_old.findIndex((value, index, arr) => value.id == this.database_dbchange[i].id)
              if (JSON.stringify(nowVal[i]) != JSON.stringify(this.database_dbchange_old[index])) {
                this.database_dbchange_submit[i] = nowVal[i]
              } else {

                try {
                  // 删除修改标记
                  let indexB = this.formItem_submit.dbchange_ids.indexOf('0' + this.database_dbchange_submit[i].id);
                  if (indexB > -1) {
                    this.formItem_submit.dbchange_ids[indexB] = parseInt(this.formItem_submit.dbchange_ids[indexB])
                  }
                } catch (e) {

                }

                delete this.database_dbchange_submit[i]
              }
            }
          } else {
            this.database_dbchange_submit = this.database_dbchange
          }

          for (let i in this.database_dbchange_submit) {
            let a = this.database_dbchange.find((element) => (element.dbinfo_id == this.database_dbchange_submit[i]['dbinfo_id']))
            if (!a) {
              delete this.database_dbchange_submit[i]
            }
          }

          this.database_dbchange_submit = this.database_dbchange_submit.filter(item => item);

          //
          // if (JSON.stringify(this.database_dbchange_submit) == '[null]' || JSON.stringify(this.database_dbchange_submit) == '[]') {
          //   delete this.formItem_submit.dbchange_ids
          // } else {
          //   this.formItem_submit.dbchange_ids = this.database_dbchange_submit.map(v => v.id);
          // }

          //去null
          if (this.formItem_submit.hasOwnProperty('dbchange_ids')) {
            this.formItem_submit.dbchange_ids = this.formItem_submit.dbchange_ids.filter(item => item);
          }
          //去重
          this.formItem_submit.dbchange_ids = Array.from(new Set(this.formItem_submit.dbchange_ids));


        },
        deep: true
      },
      'formItem': {
        handler: function (nowVal, oldVal) {
          for (let i in this.formItem) {

            if (i === 'dbchange_ids') continue;

            if (JSON.stringify(nowVal[i]) !== JSON.stringify(this.formItem_old[i])) {
              this.formItem_submit[i] = nowVal[i]
            } else {
              delete this.formItem_submit[i]
            }
          }
        },
        deep: true
      },
      'database_dbchange_submit': {
        handler: function (nowVal, oldVal) {
          for (let i in this.database_dbchange_submit) {

            let indexA = this.formItem_submit.dbchange_ids.indexOf(this.database_dbchange_submit[i].id);
            let indexB = this.formItem_submit.dbchange_ids.indexOf('0' + this.database_dbchange_submit[i].id);

            if (indexA > -1) {
              this.formItem_submit.dbchange_ids[indexA] = '0' + parseInt(this.formItem_submit.dbchange_ids[indexA])
            }
            if (indexB > -1) {
              this.formItem_submit.dbchange_ids[indexB] = '0' + parseInt(this.formItem_submit.dbchange_ids[indexB])
            }
          }
        },
        deep: true
      },
      '$route'(to, from) {
        //刷新页面
        this.$router.go(0);
      }
    },
    components: {
      editor, vueCodeDiff
    },

  }
</script>
