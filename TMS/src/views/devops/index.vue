<template>
  <div>
    <Layout :style="{margin: '70px 0px 0'}">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="active_menuitem" theme="light" width="auto" :open-names="['1','2','3']">

          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-grid" />
              测试环境
            </template>
            <MenuItem name="devops_server_list" :to="{ name: 'devops_server_list',params:{env:'T1',dept:'消费金融'}}">发布任务</MenuItem>
            <MenuItem name="devops_history" :to="{ name: 'devops_history'}">发布历史</MenuItem>
            <MenuItem name="devops_information" :to="{ name: 'devops_information'}">环境信息</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="content-wrapper">
        <Content class="content">

          <router-view></router-view>

          <!--<keep-alive>-->
          <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
          <!--</keep-alive>-->
          <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->

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
