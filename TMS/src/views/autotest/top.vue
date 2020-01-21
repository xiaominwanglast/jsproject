<template>
  <div>
    <Card>
      <Menu mode="horizontal" theme="light" :active-name="this.$route.name">

        <MenuItem name="autotest_overview" :to="{ name: 'autotest_overview',params:{id:this.$route.params.id}}">
          概况总览
        </MenuItem>

        <MenuItem v-if="this.$route.params.id==19" name="autotest_test_factor"
                  :to="{ name: 'autotest_test_factor',params:{id:this.$route.params.id}}">
          测试用例
        </MenuItem>

        <MenuItem v-else-if="this.$route.params.id!=0" name="autotest_test"
                  :to="{ name: 'autotest_test',params:{id:this.$route.params.id}}">
          测试用例
        </MenuItem>
        <MenuItem v-if="this.$route.params.id!=0" name="autotest_result"
                  :to="{ name: 'autotest_result',params:{id:this.$route.params.id}}">
          运行记录
        </MenuItem>
      </Menu>
      <br/>
      <router-view></router-view>
    </Card>
  </div>
</template>


<script>
  export default {
    name: 'top',
    data: () => {
      return {}
    },

  }
</script>
