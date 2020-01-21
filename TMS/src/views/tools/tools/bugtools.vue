<style scoped>



</style>

<template>
  <div>

    <Card :bordered="false">
      <p style="text-align: center;font-size:20px" slot="title">bug数查询</p>
      <div style="text-align: center">
        <span>
          <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="Select date" style="width: 200px"    @on-change="setTime" v-model="date"></DatePicker>
        </span>
        <span style="margin-left:40px">  <Button @click="getBugNumbers" type="success">查询</Button> </span>
      </div>
      <div style="margin-top:10px">
        <Table :columns="columns1" :data="data1"></Table>
      </div>
    </Card>


  </div>


</template>

<script>

  import {formatDateYYYMMDD} from "@/lib/tools";
  import {getBugNumbers} from "@/api/devops";
export  default {
  data(){
    return {
      options2: {
        shortcuts: [
          {
            text: '1 week',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: '1 month',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: '3 months',
            value () {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      cc:1,
      date:"",
      date_start:"",
      date_end:"",
      //table
      columns1: [
        {
          title: '名字',
          key: 'name'
        },
        {
          title: 'bug数',
          key: 'bugNumbers'
        },
        {
          title: '部门',
          key: 'dept'
        }
      ],
      data1: [

      ]

    }
  },

  methods:{
    setTime(){
      console.log(this.date)
      if (this.date[0]!="" && this.date[0]!=null) {
        var date_start = formatDateYYYMMDD({date: this.date[0]})
        var date_end = formatDateYYYMMDD({date: this.date[1]})
        this.date_start = date_start
        this.date_end = date_end
      }
    },
    getBugNumbers(){

      if (this.date_start=="" ||this.date_end==""||this.date[0]=="" )
        this.$Message.error('请选择时间');
      else{
        getBugNumbers({date_start: this.date_start, date_end: this.date_end}).then(res => {
          //console.log(res.data.data)
          this.data1=res.data.data

        })
      }
    }
  }

}

</script>
