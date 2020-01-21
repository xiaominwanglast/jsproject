<template>
  <div>
    <Layout :style="{margin: '70px 0px 0'}">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="active_menuitem" theme="light" width="auto" :open-names="['1','2','3']">

          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-grid" />
              工具
            </template>
            <MenuItem name="tools_comparetable" :to="{ name: 'tools_comparetable'}"> 数据库表结构比较 </MenuItem>
            <!-- <MenuItem name="tools_burn" :to="{ name: 'tools_burn'}"> 埋点 </MenuItem> -->
<!--            <MenuItem name="tools_account" :to="{ name: 'tools_account'}"> 账户造号 </MenuItem>-->
<!--            <MenuItem name="tools_createcard" :to="{ name: 'tools_createcard'}"> 生成身份证 </MenuItem>-->
<!--            <MenuItem name="tools_dbtools" :to="{ name: 'tools_dbtools', params:{env:'T1'}}"> 流程更改 </MenuItem>-->
          </Submenu>
<!--           <Submenu name="2">-->
<!--            <template slot="title">-->
<!--              <Icon type="ios-grid" />-->
<!--              查询工具-->
<!--            </template>-->
<!--            <MenuItem name="tools_bugtools" :to="{ name: 'tools_bugtools'}"> bug数查询 </MenuItem>-->
<!--            <MenuItem name="tools_loanmongo" :to="{ name: 'tools_loanmongo'}"> mongo查询 </MenuItem>-->
<!--            <MenuItem name="tools_endecryption" :to="{ name: 'tools_endecryption'}"> 加解密 </MenuItem>-->
<!--          </Submenu>-->
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
        // window.localStorage.setItem('name',this.active_menuitem)
        this.active_menuitem = this.$route.name
        // console.log(this.active_menuitem);
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
