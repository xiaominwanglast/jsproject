<template>

  <div class="layout">
    <Layout :style="{background: '#eee'}">
      <Header
        :style="{background: '#fff',marginBottom: '10px',padding:0,height:'59px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',position: 'fixed', width: '100%',zIndex:999}">
        <Menu mode="horizontal" theme="light" :active-name="active_menuitem">
          <div class="layout-logo"><img src="@/assets/img/TMS-logo.png" width="150"/></div>
          <div class="layout-nav">
            <MenuItem name="flow" :to="{ name: 'flow_form_template',params:{group_name:'商业化测试组'}}">
              <Icon type="ios-paper"/>
              项目管理
            </MenuItem>
<!--            <MenuItem name="database" :to="{ name: 'database_audit_list'}">-->
<!--              <Icon type="md-grid"/>-->
<!--              数据库审核-->
<!--            </MenuItem>-->
<!--            <MenuItem name="tmt" :to="{ name: 'tmt'}">-->
<!--              <Icon type="ios-bug"/>-->
<!--              缺陷提交-->
<!--            </MenuItem>-->
<!--            <MenuItem name="devops" :to="{ name: 'devops_server_list',params:{env:'T1',dept:'消费金融'}}">-->
<!--              <Icon type="ios-construct"/>-->
<!--              测试环境-->
<!--            </MenuItem>-->
            <MenuItem name="tools" :to="{ name: 'tools_comparetable' }">
              <Icon type="ios-build"/>
              小工具
            </MenuItem>
            <MenuItem name="autotest" :to="{ name: 'autotest_overview',params:{id:0}}">
              <Icon type="md-ionic" />
              自动化
            </MenuItem>
            <MenuItem name="update" :to="{ name: 'update'}">
              <Icon type="md-planet"/>
              更新日志
              <Badge dot :offset="[-18,-5]"></Badge>
            </MenuItem>
          </div>

          <Dropdown @on-click="handleClick">
            <div class="demo-avatar">
              <Avatar icon="ios-person"/>
              {{ realname }}
            </div>
            <DropdownMenu slot="list">
              <DropdownItem name="profile">
                <qrcode :value="JSON.stringify(user_qrcode())" :options="{ size: 200 }"></qrcode>
              </DropdownItem>
              <DropdownItem name="logout" divided>退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Menu>

      </Header>
      <router-view></router-view>

      <Footer class="layout-footer-center" :style="{padding: '5px',textAlign: 'center'}">2019 &copy; 互联网事业群-中台事业部-测试质控部
      </Footer>
    </Layout>
  </div>

</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import Vue from 'vue'
  import VueQrcode from '@xkeshi/vue-qrcode';

  Vue.component(VueQrcode.name, VueQrcode);

  export default {

    data: () => {
      return {
        active_menuitem: ''
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.active_menuitem = this.$route.name.split('_')[0]
      })
    },
    computed: {
      ...mapGetters([
        'realname'
      ]),

    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      ...mapGetters([
        'username', 'userinfo'
      ]),
      handleClick(name) {
        if (name == 'logout') {
          this.logout().then(() => {
            this.$router.push({name: 'login'})
          }).catch(error => {
            this.$Message.error('登出失败');
          })
        }
      },
      user_qrcode: function () {
        return {
          "username": this.userinfo().username,
          "realname": encodeURIComponent(this.userinfo().realname),
        }
      }
    }

  }
</script>

<style lang="less">

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
  }

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 30px;
  }

  .layout-nav {
    width: 600px;
    margin: 0 auto;
    margin-right: 0;
  }

</style>
