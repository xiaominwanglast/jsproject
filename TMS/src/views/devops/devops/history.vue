<style scoped>

  .breadcrumb{
    text-align: center;
  }

</style>

<template>
  <div>
    <Breadcrumb class=breadcrumb :style="{margin: '16px 0'}">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Layout</BreadcrumbItem> -->
      <RadioGroup   @on-change="setEnv" v-model="env" size="large">
        <Radio label="T1"></Radio>
        <Radio label="T2"></Radio>
        <Radio label="T3"></Radio>
        <Radio label="P1"></Radio>
        <Radio label="D1"></Radio>
        <Radio label="D2"></Radio>
      </RadioGroup>
    </Breadcrumb>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">启动</Button>
        <Button type="error" size="small" @click="remove(index)">停止</Button>
      </template>

      <template slot-scope="{ row, index }" slot="server_status">
        <span v-if="row.server_status==1" > <Tag type="dot"  color="success">启动成功</Tag></span>
        <span v-if="row.server_status==2" > <Tag type="dot"  color="error">启动失败</Tag></span>
      </template>
    </Table>

  </div>
</template>

<script>

  import {getHistorys} from "@/api/devops";

  export default {
    data () {
      return {
        columns12: [
          {
            title: '服务名',
            key: 'server_name',
            align: 'center'
          },
          {
            title: '操作人',
            key: 'operator',
            align: 'center'
          },
          {
            title: '分支名',
            key: 'branch',
            align: 'center'
          },

          {
            title: 'git版本',
            key: 'git_version',
            align: 'center'
          },

          {
            title: '启动时间',
            key: 'create_time',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center'
          }
        ],
        data6: [

        ],
        env:'T1'
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[devops].name}<br>Age：${this.data6[devops].age}<br>Address：${this.data6[devops].address}`
        })
      },
      remove (index) {
        this.data6.splice(devops, 1);
      },

      genTableData(){
        //
        getHistorys({env:this.env}).then(res=>{
          // console.log(res)
          // console.log(res.data.data)
          this.data6=res.data.data

        })

      },
      setEnv(){
        //console.log("ssss")
        this.$router.push({name: 'devops_history',params:{"env":this.env}})
        getHistorys({env:this.env}).then(res=>{
          // console.log(res)
          // console.log(res.data.data)
          this.data6=res.data.data

        })
      }
    },
    mounted() {
      this.env=this.$route.params.env
      this.genTableData()
    }
  }
</script>
