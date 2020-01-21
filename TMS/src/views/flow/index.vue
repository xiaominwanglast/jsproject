<template>
  <div>
    <Layout :style="{margin: '70px 0px 0'}">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="active_menuitem" theme="light" width="auto" :open-names="['1','2','3']">
<!--          <Submenu name="1">-->
<!--            <template slot="title">-->
<!--              <Icon type="ios-navigate"></Icon>-->
<!--              提测流程-->
<!--            </template>-->
<!--            <MenuItem name="flow_testtask_add" :to="{ name: 'flow_testtask_add'}">提交提测单</MenuItem>-->
<!--            <MenuItem name="flow_testtask_list" :to="{ name: 'flow_testtask_list'}">查看提测单</MenuItem>-->
<!--            <MenuItem name="flow_testtask_mylist" :to="{ name: 'flow_testtask_mylist'}">我的提测单</MenuItem>-->
<!--          </Submenu>-->
<!--          <Submenu name="2">-->
<!--            <template slot="title">-->
<!--              <Icon type="ios-keypad"></Icon>-->
<!--              上线流程-->
<!--            </template>-->
<!--            <MenuItem name="flow_online_add" :to="{ name: 'flow_online_add'}">发起上线</MenuItem>-->
<!--            <MenuItem name="flow_online_list" :to="{ name: 'flow_online_list'}">查看上线</MenuItem>-->
<!--            <MenuItem name="flow_online_mylist" :to="{ name: 'flow_online_mylist'}">我的上线</MenuItem>-->
<!--            <MenuItem name="online_logs">上线时光轴(未完成)</MenuItem>-->
<!--          </Submenu>-->


          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              表单管理
            </template>
            <MenuItem name="flow_form_project_body_group_name"
                      :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'商业化测试组'}}">用例管理
            </MenuItem>
            <MenuItem name="flow_form_template" :to="{ name: 'flow_form_template'}">模板管理</MenuItem>
          </Submenu>

          <!--<Submenu name="2">-->
          <!--<template slot="title">-->
          <!--<Icon type="ios-keypad"></Icon>-->
          <!--测试环境-->
          <!--</template>-->
          <!--<MenuItem name="flow_online_add" :to="{ name: 'devops'}">发布任务</MenuItem>-->
          <!--<MenuItem name="flow_online_list" :to="{ name: 'devops'}">发布历史</MenuItem>-->

          <!--&lt;!&ndash;<MenuItem name="2-3">上线归档</MenuItem>&ndash;&gt;-->
          <!--</Submenu>-->
          <!--<Submenu name="3">-->
          <!--<template slot="title">-->
          <!--<Icon type="ios-keypad"></Icon>-->
          <!--我的任务-->
          <!--</template>-->
          <!--<MenuItem name="3-1">我的提测</MenuItem>-->
          <!--<MenuItem name="3-2">我的上线</MenuItem>-->
          <!--</Submenu>-->
        </Menu>
      </Sider>
      <Layout class="content-wrapper">
        <Content class="content">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: () => {
      return {
        active_menuitem: '',
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.active_menuitem = this.$route.name
      })
    },
    watch: {
      '$route'(to, from) {
        this.active_menuitem = this.$route.name
      },
    },

  }
</script>

<style scoped>

  .content-wrapper {
    padding: 0;
    background: rgb(238, 238, 238);
  }

  .content {
    margin: 0px 20px 0px 20px;
    min-height: calc(100vh - 116px);
    background: rgb(238, 238, 238);
  }

  .ivu-layout-sider:after {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: #dcdee2;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
</style>
