<template>
  <div>
    <Layout :style="{margin: '70px 0px 0'}">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu ref="left_menu" :active-name="active_menuitem" theme="light" width="auto" :open-names="open_names">

          <MenuItem name="autotest_overview_0" :to="{ name: 'autotest_overview',params:{id:0}}">
            <Icon type="ios-speedometer"/>
            概况总览
          </MenuItem>

          <Submenu :name="`${root_project.id}`" v-for="(root_project, index) in projects" :key="index" style="font-size: 13px">
            <template slot="title" >
              <Icon type="ios-keypad"></Icon>
              {{root_project.name}}
            </template>
            <MenuItem v-for="(project, index) in root_project.children" :key="index"
                      :name="`autotest_overview_${project.id}`"
                      :to="{ name: 'autotest_overview',params:{id:project.id}}">{{project.name}}
            </MenuItem>
          </Submenu>

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

  import {getProject} from "@/api/autotest";

  export default {
    name: 'index',
    data: () => {
      return {
        active_menuitem: '',
        open_names: ['1', '2', '3', '4', '5'],
        projects: []
      }
    },
    methods: {
      getProject() {
        getProject().then(res => {
          this.projects = res.data.data;
          this.updateMenu()
        });
      },

      updateMenu() {
        this.$nextTick(() => {
          this.$refs.left_menu.updateOpened();
          this.$refs.left_menu.updateActiveName();
        });
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.active_menuitem = "autotest_overview_" + this.$route.params.id;
        this.getProject();
      })
    },
    watch: {
      '$route'(to, from) {
        this.active_menuitem = "autotest_overview_" + this.$route.params.id;
        this.updateMenu();
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
