<template>
  <div>


    <Table border :columns="columns_project" :data="data_project" v-if="group_name && !project_id && !task_id">

      <div slot="header">
        <Button type="primary" size="small" style="float: right;margin-right: 22px;margin-top: 10px"
                @click="add_project_modal=true">新增测试项目
        </Button>
        <Input search placeholder="搜索" enter-button clearable size="small"
               style="width: 200px;float: right;margin-right: 10px;margin-top: 9px"/>
      </div>

      <template slot-scope="{ row,column, index }" slot="slot_title">
        <router-link
          :to="{name: 'flow_form_project_body_group_name_project_id', params: {group_name:group_name,project_id:row.id}}">
          {{row.title}}
        </router-link>
      </template>

      <template slot-scope="{ row,column, index }" slot="action">
        <Button type="error" size="small" style="margin-right: 10px" @click="deleteFormProject(row.id)">删除</Button>
        <Button type="success" size="small" @click="open_add_project_modal(row.id)">编辑</Button>
      </template>

    </Table>


    <Table border :columns="columns_task" :data="data_task" v-if="group_name && project_id && !task_id">
      <div slot="header">
        <Button type="primary" size="small" style="float: left;margin-left: 10px;margin-top: 10px"
                @click="$router.go(-1);data_task=[] ">返回上一级
        </Button>
        <Button type="primary" size="small" style="float: right;margin-right: 22px;margin-top: 10px"
                @click="add_task_modal=true">新增
        </Button>
        <Input search placeholder="搜索" enter-button clearable size="small"
               style="width: 200px;float: right;margin-right: 10px;margin-top: 9px"/>
      </div>
      <template slot-scope="{ row,column, index }" slot="slot_title">
        <router-link
          :to="{name: 'flow_form_project_body_group_name_project_id_task_id', params: {group_name:group_name,project_id:row.project_id,task_id:row.id}}">
          {{row.title}}
        </router-link>
      </template>

      <template slot-scope="{ row,column, index }" slot="action">
        <Button type="error" size="small" style="margin-right: 10px" @click="deleteFormTask(row.id)">删除</Button>
        <Button type="success" size="small" @click="open_add_task_modal(row.id)">编辑</Button>
      </template>
    </Table>


    <Table border :columns="columns_form" :data="data_form" v-if="group_name && project_id && task_id">
      <div slot="header">
        <Button type="primary" size="small" style="float: left;margin-left: 10px;margin-top: 10px"
                @click="$router.go(-1); data_form=[]">返回上一级
        </Button>
        <!--<Button type="primary" size="small" style="float: right;margin-right: 22px;margin-top: 10px">新增</Button>-->
        <!--<Input search placeholder="搜索" enter-button clearable size="small"-->
        <!--style="width: 200px;float: right;margin-right: 10px;margin-top: 9px"/>-->
        <Tag v-if="display" type="dot" :color="save_status.status"
             style="float: right;margin-right: 18px;margin-top: 9px">
          {{save_status.text}}
        </Tag>

      </div>

      <template slot-scope="{ row,column, index }" slot="text">
        {{data_form[index][column['key']]}}
      </template>

      <template slot-scope="{ row,column, index }" slot="multipletext" style="white-space: normal;">
        <div v-html="data_form[index][column['key']].replace(/\n/g,'<br>')"></div>
        <!--{{data_form[index][column['key']]}}-->
      </template>


      <template slot-scope="{ row,column, index }" slot="input">
        <Input v-model="data_form[index][column['key']]" @on-blur="data_change(index,column['key'],row)"></Input>
      </template>

      <template slot-scope="{ row,column, index }" slot="textarea">
        <Input type="textarea" :rows="1" :autosize="true" v-model="data_form[index][column['key']]"
               @on-blur="data_change(index,column['key'],row)"></Input>
      </template>

      <template slot-scope="{ row,column, index }" slot="user_select">
        <Select :transfer="true"
                v-model="data_form[index][column['key']]"
                clearable
                filterable
                remote
                :remote-method="remote_user_select"
                @on-change="data_change(index,column['key'],row)">
          <Option v-for="(option, index) in user_select_list" :value="option.value" :key="index" :label="option.value">
            {{option.label}}
            <div style="color:#ccc;margin-right: 20px">{{option.other}}</div>
          </Option>
        </Select>


      </template>

      <template slot-scope="{ row,column, index }" slot="pass_select">
        <Select :transfer="true" v-model="data_form[index][column['key']]"
                @on-change="data_change(index,column['key'],row)">
          <Option value="通过">通过</Option>
          <Option value="不通过">不通过</Option>
          <Option value="无">无</Option>
        </Select>
      </template>


      <template slot-scope="{ row,column, index }" slot="date_select">
        <DatePicker :transfer="true" type="date" show-week-numbers v-model="data_form[index][column['key']]"
                    placeholder=""
                    @on-change="data_form[index][column['key']]=$event;data_change(index,column['key'],row)"></DatePicker>
      </template>

    </Table>

    <Modal
      v-model="add_project_modal"
      title="添加一个项目"
      @on-ok="createOrUpdateFormProject"
      @on-cancel="project={}"
      :transition-names="[]">
      <Form :model="project" :label-width="80">
        <FormItem label="所属">
          <Select :transfer="true" v-model="project.group_name">
            <Option value="商业化测试组">商业化测试组</Option>
            <Option value="公共服务测试组">公共服务测试组</Option>
            <Option value="大数据算法测试组">大数据算法测试组</Option>
<!--            <Option value="风控系统">风控系统</Option>-->
<!--            <Option value="大数据">大数据</Option>-->
<!--            <Option value="金融服务">金融服务</Option>-->
<!--            <Option value="后台系统">后台系统</Option>-->
          </Select>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="project.title"></Input>
        </FormItem>
        <FormItem label="项目经理">
          <Select :transfer="true" v-model="project.master" filterable>
            <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">
              <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
              <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>


    <Modal
      v-model="add_task_modal"
      title="添加一个表单"
      @on-ok="createOrUpdateFormTask"
      @on-cancel="task={}"
      :transition-names="[]">
      <Form :model="task" :label-width="80">
        <FormItem label="任务名">
          <Input v-model="task.title"></Input>
        </FormItem>
        <FormItem label="表单模板">
          <Select :transfer="true" v-model="task.template_id" :disabled="!!task.id">
            <Option v-for="item in template_list" :value="item.id.toString()" :key="item.id" :label="item.title">

            </Option>
          </Select>
        </FormItem>

        <FormItem label="负责人">
          <Select :transfer="true" v-model="task.master" filterable>
            <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">
              <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>
              <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>


    <Modal
      v-model="confirm_modal"
      title="冲突选择"
      @on-ok="getFormFormList"
      ok-text="刷新整个表格到最新状态"
      cancel-text="不刷新"
      @on-cancel="">
      <span> {{save_status.text}}</span>
    </Modal>

  </div>
</template>

<script>
  import {getFormTemplateList} from '@/api/form'
  import {createOrUpdateFormProject, getFormProject, getFormProjectList, deleteFormProject} from '@/api/form'
  import {createOrUpdateFormTask, getFormTask, getFormTaskList, deleteFormTask} from '@/api/form'
  import {getFormFormList, UpdateFormForm} from '@/api/form'
  import {userList, userSearch} from '@/api/base'

  const pinyin = require("pinyin");

  export default {
    name: "project_header",
    data() {
      return {
        columns_project: [
          {
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '项目名',
            key: 'title',
            slot: 'slot_title',
          },
          {
            title: '项目经理',
            key: 'master',
            width: 100,
          },
          // {
          //   title: '状态',
          //   key: 'status',
          //   width: 100,
          // },
          {
            title: '操作',
            width: 130,
            slot: 'action',
          }
        ],
        data_project: [],
        columns_task: [
          {
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '表单名',
            key: 'title',
            slot: 'slot_title',
          },
          // {
          //   title: '状态',
          //   key: 'status'
          // },
          {
            title: '负责人',
            key: 'master'
          },
          {
            title: '创建时间',
            key: 'create_time',
            width: 200,
          },
          {
            title: '最后一次更新时间',
            key: 'update_time',
            width: 200,
          },
          {
            title: '操作',
            width: 130,
            slot: 'action',
          }
        ],
        data_task: [],
        columns_form: [],
        data_form: [],
        data_form_old: [],
        group_name: '消费金融',
        project_id: null,
        task_id: null,
        add_project_modal: false,
        add_task_modal: false,
        project: {},
        task: {},
        save_status: {'status': 'success', 'text': '实时保存已开启'},
        display: true,
        confirm_modal: false,
        users_list: [],
        template_list: [],
        user_select_list: [],

      }
    },
    methods: {

      getFormProjectList() {
        getFormProjectList(this.group_name).then(res => {
          if (res.data.status) {
            this.data_project = res.data.data
          }
        });
      },
      createOrUpdateFormProject() {

        createOrUpdateFormProject({data: this.project}).then(res => {
            if (res.data.status) {
              this.project = {};
              this.getFormProjectList();
            } else {
              this.$Message.error(res.data.message);
            }
          }, error => {
            this.$Message.error('失败');
          }
        );
      },

      deleteFormProject(id) {
        deleteFormProject(id).then(res => {
          if (res.data.status) {
            this.getFormProjectList();
            this.$Message.success('删除成功');
          }
        });
      },

      getFormProject(id) {
        getFormProject(id).then(res => {
          if (res.data.status) {
            this.project = res.data.data
          }
        });
      },

      open_add_project_modal(id) {
        this.getFormProject(id);
        this.add_project_modal = true;
      },


      // task
      getFormTaskList() {
        if (!this.project_id) return;
        getFormTaskList(this.project_id).then(res => {
          if (res.data.status) {
            this.data_task = res.data.data
          }
        });
      },
      createOrUpdateFormTask() {
        this.task['project_id'] = this.project_id;
        createOrUpdateFormTask({data: this.task}).then(res => {
            if (res.data.status) {
              this.task = {};
              this.getFormTaskList();
            } else {
              this.$Message.error(res.data.message);
            }
          }, error => {
            this.$Message.error('失败');
          }
        );
      },
      getFormTask(id) {
        getFormTask(id).then(res => {
          if (res.data.status) {
            this.task = res.data.data
          }
        });
      },
      open_add_task_modal(id) {
        this.getFormTask(id);
        this.add_task_modal = true;
      },
      deleteFormTask(id) {
        deleteFormTask(id).then(res => {
          if (res.data.status) {
            this.getFormTaskList();
            this.$Message.success('删除成功');
          }
        });
      },


      // form
      getFormFormList() {
        if (!this.task_id) return;
        getFormFormList(this.task_id).then(res => {
          if (res.data.status) {
            this.columns_form = res.data.data.columns;
            this.data_form = res.data.data.data;
            this.data_form_old = JSON.parse(JSON.stringify(res.data.data.data));
          }
        });
      },

      change_save_status(status, text) {

        this.save_status = {'status': status, 'text': text};
        setTimeout(this.hide_save_status, 500);
        setTimeout(this.show_save_status, 1000);

      },

      hide_save_status() {
        this.display = false
      },
      show_save_status() {
        this.display = true
      },

      UpdateFormFrom(data, index, key, row) {
        UpdateFormForm({data}).then(res => {
            if (res.data.status) {
              this.change_save_status('success', '保存成功 ' + res.data.data.update_time.split(' ')[1]);
              this.data_form_old[index][key] = this.data_form[index][key];
            } else {
              this.$Message.error(res.data.message);
              this.change_save_status('error', res.data.message);
              this.confirm_modal = true;
            }
          }, error => {
            this.$Message.error('失败');
            this.change_save_status('error', '失败');
          }
        );
      },

      data_change(index, key, row) {

        if (this.data_form_old[index][key] == this.data_form[index][key]) {
          return
        }
        let data = {
          'id': row.id,
          'key': key,
          'old': this.data_form_old[index][key] ? this.data_form_old[index][key] : "",
          'new': this.data_form[index][key] ? this.data_form[index][key] : "",
        }
        this.UpdateFormFrom(data, index, key, row);

      },
      getUserList() {
        userList().then(res => {
          if (res.data.status) {
            this.users_list = res.data.data
          } else {

          }
        });
      },
      getFormTemplateList() {
        getFormTemplateList().then(res => {
          if (res.data.status) {
            this.template_list = res.data.data
          }
        });
      },


      remote_user_select(query) {

        function toPinyin(str, style) {
          return pinyin(str, {style: style}).join('')
        }

        if (query !== '') {
          setTimeout(() => {
            const list = this.users_list.map(item => {
              return {
                value: item['realname'],
                label: [item['realname'], item['username'], toPinyin(item['realname'], pinyin.STYLE_NORMAL), toPinyin(item['realname'], pinyin.STYLE_FIRST_LETTER)].join('|'),
                other: item['status'] == 0 ? '[已离职]' : '' + JSON.parse(item['department_list']).join('-')
              };
            });
            this.user_select_list = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.user_select_list = [];
        }
      }

    },
    mounted() {
      this.group_name = this.$route.params.group_name;
      this.project_id = this.$route.params.project_id;
      this.task_id = this.$route.params.task_id;
      this.getUserList();
      this.getFormTemplateList();
      this.getFormProjectList();
      this.getFormTaskList();
      this.getFormFormList();
    },
    watch: {
      '$route'(to, from) {
        this.group_name = this.$route.params.group_name;
        this.project_id = this.$route.params.project_id;
        this.task_id = this.$route.params.task_id;
        this.getFormProjectList();
        this.getFormTaskList();
        this.getFormFormList();
      },
    },
  }
</script>

<style scoped>

</style>