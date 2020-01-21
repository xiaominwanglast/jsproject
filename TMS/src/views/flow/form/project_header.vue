<template>
  <div>


    <Card>
      <Menu mode="horizontal" theme="light" :active-name="this.$route.params.group_name">

        <MenuItem name="商业化测试组" :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'商业化测试组'}}">
          商业化测试组
        </MenuItem>
        <MenuItem name="公共服务测试组" :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'公共服务测试组'}}">
          公共服务测试组
        </MenuItem>
        <MenuItem name="大数据算法测试组" :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'大数据算法测试组'}}">
          大数据算法测试组
        </MenuItem>
<!--        <MenuItem name="风控系统" :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'风控系统'}}">-->
<!--          风控系统-->
<!--        </MenuItem>-->
<!--        <MenuItem name="大数据" :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'大数据'}}">-->
<!--          大数据-->
<!--        </MenuItem>-->
<!--        <MenuItem name="金融服务" :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'金融服务'}}">-->
<!--          金融服务-->
<!--        </MenuItem>-->
<!--        <MenuItem name="后台系统" :to="{ name: 'flow_form_project_body_group_name',params:{group_name:'后台系统'}}">-->
<!--          后台系统-->
<!--        </MenuItem>-->
      </Menu>
      <router-view></router-view>

    </Card>
  </div>
</template>

<script>
  export default {
    name: "project_header"
  }
</script>

<style scoped>

</style>