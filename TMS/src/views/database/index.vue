<template>
  <div>
    <Layout :style="{margin: '70px 0px 0'}">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="active_menuitem" theme="light" width="auto" :open-names="['1','2','3']">

          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-grid" />
              数据库审核
            </template>
            <MenuItem name="database_audit_add" :to="{ name: 'database_audit_add'}">提交审核</MenuItem>
            <MenuItem name="database_audit_list" :to="{ name: 'database_audit_list'}">审核记录</MenuItem>
            <MenuItem name="database_audit_mylist" :to="{ name: 'database_audit_mylist'}">我的审核</MenuItem>
            <MenuItem name="database_audit_change_notice" :to="{ name: 'database_audit_change_notice'}">变更通知</MenuItem>
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
