<template>
  <div>


    <Card>
      <Icon type="md-bookmarks" size="18"/>
      模板管理
      <div :style="{float:'right'}">
        <Button type="primary" style="margin-right: 25px" size="small" @click="open_desgin_template()">设计一个新模板</Button>
      </div>
      <Divider style="margin: 15px 0"/>
      <Table border :columns="columns_template_list" :data="data_template_list">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="open_desgin_template(row.id)">
            查看与设计
          </Button>
          <Button type="error" size="small" @click="deleteFormTemplate(row.id)">删除</Button>
        </template>
      </Table>
    </Card>

    <Modal v-model="modal" fullscreen title="模板设计" :styles="{marginTop: '20px',left: '2%'}" :mask-closable="false">
      <div>

      </div>
<!--      <Row>-->
<!--        <Col>-->

<!--          <Card>-->
<!--            <Icon type="md-disc" size="18"/>-->
<!--            <b>表单名称</b>-->

<!--            <Divider style="margin: 15px 0"/>-->

<!--            <Input v-model="title"></Input>-->

<!--          </Card>-->
<!--          <br/>-->
<!--          <Card>-->
<!--            <Icon type="md-bookmarks" size="18"/>-->
<!--            <b>表头设计</b>-->
<!--            <div :style="{float:'right'}">-->
<!--              <Button type="primary" style="margin-right: 30px" size="small" @click="add_data_header_list()">添加</Button>-->
<!--            </div>-->

<!--            <Divider style="margin: 15px 0"/>-->

<!--            <Table border :columns="columns_header_list" :data="data_header_list" :draggable="true"-->
<!--                   @on-drag-drop="draggable_header_list">-->

<!--              <template slot-scope="{ row, index }" slot="name">-->
<!--                <Input v-model="data_header_list[index].title" @on-change="watch_data_header_list"></Input>-->
<!--              </template>-->

<!--              <template slot-scope="{ row, index }" slot="slot">-->
<!--                <Select v-model="data_header_list[index].slot" :transfer="true" @on-change="watch_data_header_list">-->
<!--                  <Option value="text">单行文本</Option>-->
<!--                  <Option value="multipletext">多行文本</Option>-->
<!--                  <Option value="input">单行输入框</Option>-->
<!--                  <Option value="textarea">多行输入框</Option>-->
<!--                  <Option value="user_select">人员选择框</Option>-->
<!--                  <Option value="pass_select">是否通过选择框</Option>-->
<!--                  <Option value="date_select">日期选择框</Option>-->

<!--                </Select>-->
<!--              </template>-->


<!--              <template slot-scope="{ row, index }" slot="header_action">-->
<!--                <Button type="error" size="small" @click="header_action_remove(index)" style="margin-right: 10px">删除-->
<!--                </Button>-->
<!--                <Button type="primary" size="small">按住我拖动</Button>-->
<!--              </template>-->

<!--            </Table>-->


<!--          </Card>-->
<!--          <br/>-->

<!--          <Card>-->
<!--            <Icon type="md-cog" size="18"/>-->
<!--            <b>表单内容设计</b>-->
<!--            <div :style="{float:'right'}">-->
<!--              <Button type="primary" style="margin-right: 30px" size="small" @click="add_data_form_list()">添加</Button>-->
<!--            </div>-->
<!--            <Divider style="margin: 15px 0"/>-->

<!--            <Table border :columns="columns_form_list" :data="data_form_list" :draggable="true"-->
<!--                   @on-drag-drop="draggable_form_list">-->

<!--              <template slot-scope="{ row,column, index }" slot="text">-->
<!--                <Input v-model="data_form_list[index][column['key']]"></Input>-->
<!--              </template>-->

<!--              <template slot-scope="{ row,column, index }" slot="multipletext">-->
<!--                <Input type="textarea" :rows="1" :autosize="true"-->
<!--                       v-model="data_form_list[index][column['key']]"></Input>-->
<!--              </template>-->


<!--              <template slot-scope="{ row,column, index }" slot="input">-->
<!--                <Input v-model="data_form_list[index][column['key']]"></Input>-->
<!--              </template>-->

<!--              <template slot-scope="{ row,column, index }" slot="textarea">-->
<!--                <Input type="textarea" :rows="1" :autosize="true"-->
<!--                       v-model="data_form_list[index][column['key']]"></Input>-->
<!--              </template>-->

<!--              <template slot-scope="{ row,column, index }" slot="user_select">-->

<!--                <Select :transfer="true" v-model="data_form_list[index][column['key']]" filterable>-->
<!--                  <Option v-for="item in users_list" :value="item.realname" :key="item.username" :label="item.realname">-->
<!--                    <div>{{ item.realname }}({{ item.username }})<span v-if="item.status==0"> [已离职]</span></div>-->
<!--                    <div style="color:#ccc;margin-right: 20px">{{ JSON.parse(item.department_list).join('-') }}</div>-->
<!--                  </Option>-->
<!--                </Select>-->

<!--                &lt;!&ndash;<Select :transfer="true"&ndash;&gt;-->
<!--                &lt;!&ndash;v-model="data_form_list[index][column['key']]"&ndash;&gt;-->
<!--                &lt;!&ndash;clearable&ndash;&gt;-->
<!--                &lt;!&ndash;filterable&ndash;&gt;-->
<!--                &lt;!&ndash;remote&ndash;&gt;-->
<!--                &lt;!&ndash;:remote-method="remote_user_select">&ndash;&gt;-->
<!--                &lt;!&ndash;<Option v-for="(option, index) in user_select_list" :value="option.value" :key="index" :label="option.value">&ndash;&gt;-->
<!--                &lt;!&ndash;{{option.label}}&ndash;&gt;-->
<!--                &lt;!&ndash;<div style="color:#ccc;margin-right: 20px">{{option.other}}</div>&ndash;&gt;-->
<!--                &lt;!&ndash;</Option>&ndash;&gt;-->
<!--                &lt;!&ndash;</Select>&ndash;&gt;-->

<!--              </template>-->

<!--              <template slot-scope="{ row,column, index }" slot="pass_select">-->
<!--                <Select :transfer="true" v-model="data_form_list[index][column['key']]">-->
<!--                  <Option value="通过">通过</Option>-->
<!--                  <Option value="不通过">不通过</Option>-->
<!--                  <Option value="无">无</Option>-->
<!--                </Select>-->
<!--              </template>-->

<!--              <template slot-scope="{ row,column, index }" slot="date_select">-->
<!--                <DatePicker :transfer="true" type="date" show-week-numbers-->
<!--                            v-model="data_form_list[index][column['key']]"-->
<!--                            @on-change="data_form_list[index][column['key']]=$event;"-->
<!--                            placeholder=""></DatePicker>-->
<!--              </template>-->


<!--              <template slot-scope="{ row, index }" slot="form_action">-->
<!--                <Button type="error" size="small" @click="form_action_remove(index)" style="margin-right: 10px">删除-->
<!--                </Button>-->
<!--                <Button type="primary" size="small">按住我拖动</Button>-->
<!--              </template>-->

<!--            </Table>-->

<!--          </Card>-->
<!--        </Col>-->
<!--      </Row>-->

<!--      <div slot="footer">-->
<!--        <Button type="default" size="large" @click="modal=false;id='';">取消</Button>-->
<!--        <Button type="primary" size="large" @click="createOrUpdateFormTemplate()">确定</Button>-->
<!--      </div>-->

    </Modal>
  </div>
</template>

<script>


  import {createOrUpdateFormTemplate, getFormTemplate, getFormTemplateList, deleteFormTemplate} from '@/api/form'
  import {userList} from '@/api/base'

  const pinyin = require("pinyin");

  export default {
    name: "form_template",
    data() {
      return {
        modal: false,
        columns_template_list: [
          {
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '模板名称',
            key: 'title'
          },
          {
            title: '创建人',
            key: 'create_user',
            width: 150,
          },
          {
            title: '更新人',
            key: 'create_user',
            width: 150,
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
            slot: 'action',
            width: 170,
            align: 'center'
          }
        ],
        data_template_list: [],
        columns_header_list: [
          {
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '字段名',
            key: 'name',
            slot: 'name',
          },
          {
            title: '字段类型',
            key: 'slot',
            slot: 'slot'
          },
          {
            title: '操作',
            key: 'action',
            slot: 'header_action',
            width: 170
          }
        ],
        data_header_list: [],
        columns_form_list: [],
        data_form_list: [],
        title: "",
        id: "",
        users_list: [],
        user_select_list: [],
      }
    },
    methods: {
      add_data_header_list() {
        let key = Math.random().toString(36).substr(2);
        this.data_header_list.push({
          title: '',
          key: key,
          slot: '',
        });
      },
      watch_data_header_list() {

        this.columns_form_list = [{
          type: 'index',
          width: 50,
          align: 'center'
        }, ...this.data_header_list, {
          title: '操作',
          key: 'action',
          slot: 'form_action',
          width: 170
        }]

        this.deal_data_form_list();

      },

      deal_data_form_list() {
        let keys = [];
        this.data_header_list.forEach(function (row, index) {
          keys.push(row['key'])
        });

        this.data_form_list.forEach(function (row, index) {
          for (let key in row) {
            for (let index in keys) {
              if (row.hasOwnProperty(keys[index])) {
              } else {
                row[keys[index]] = ''
              }
            }
          }
        });

        return keys;
      },

      add_data_form_list() {
        let keys = this.deal_data_form_list();
        let data = {}
        keys.forEach(function (value, index) {
          data[value] = ""
        })
        this.data_form_list.push(data);
      },

      draggable_header_list(index1, index2) {

        let temp = this.data_header_list[index1] ? this.data_header_list[index1] : "";
        this.data_header_list.splice(index1, 1);
        this.data_header_list.splice(index2, 0, temp);
        this.watch_data_header_list();
      },
      header_action_remove(index) {
        this.data_header_list.splice(index, 1);
        this.watch_data_header_list();
      },
      draggable_form_list(index1, index2) {
        let temp = JSON.parse(JSON.stringify(this.data_form_list[index1]));
        // Object.keys(temp).forEach(function(key){
        //
        //   console.log(key,temp[key]);
        //   temp[key]="aaaa"
        //
        // });
        this.data_form_list.splice(index1, 1);
        this.data_form_list.splice(index2, 0, temp);
      },
      form_action_remove(index) {
        this.data_form_list.splice(index, 1);
      },
      open_desgin_template(id) {
        this.modal = true;
        if (id) {
          this.id = id;
          getFormTemplate({id: id}).then(res => {
            if (res.data.status) {
              this.columns_form_list = [...JSON.parse(res.data.data.template_columns), {
                title: '操作',
                key: 'action',
                slot: 'form_action',
                width: 170
              }];
              this.data_form_list = JSON.parse(res.data.data.template_data);
              this.data_header_list = JSON.parse(res.data.data.header_data);
              this.title = res.data.data.title;
            }
          });
        } else {
          this.columns_form_list = [];
          this.data_form_list = [];
          this.data_header_list = [];
          this.title = "";
          this.id = "";
        }

      },

      getFormTemplateList() {
        getFormTemplateList().then(res => {
          if (res.data.status) {
            this.data_template_list = res.data.data
          }
        });
      },

      createOrUpdateFormTemplate() {

        if (!this.title) {
          this.$Message.error('模板名称不能为空');
          return;
        }


        // 去除 __id 属性
        this.columns_form_list = this.columns_form_list.map((value, key, arr) => {
          delete value['__id'];
          return value;
        });
        this.columns_form_list.pop();


        let data = {
          "id": this.id,
          "title": this.title,
          "template_columns": JSON.stringify(this.columns_form_list),
          "template_data": JSON.stringify(this.data_form_list),
          "header_data": JSON.stringify(this.data_header_list)
        };

        createOrUpdateFormTemplate({data}).then(res => {
            if (res.data.status) {
              this.getFormTemplateList();
              this.modal = false;
            } else {
              this.$Message.error(res.data.message);
            }
          }, error => {
            this.$Message.error('失败');
          }
        );
      },


      deleteFormTemplate(id) {
        deleteFormTemplate({id: id}).then(res => {
          if (res.data.status) {
            this.getFormTemplateList()
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
      this.getFormTemplateList();
      this.getUserList();
    },
  }
</script>

<style>
  .ivu-modal-fullscreen {
    width: 96% !important;
  }
</style>