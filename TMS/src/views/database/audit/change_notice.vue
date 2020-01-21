<style>
  .content-body {
    padding-top: 30px;
    min-height: calc(100vh - 33px);
    background: rgb(255, 255, 255);
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  }

  .time {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .content {
    font-size: 14px;
    padding-left: 5px;
  }

  .goodShow {
    position: relative;
    overflow-y: scroll;
  }

</style>
<template>
  <div>
    <Card>
      <Row :gutter="16">

        <Col span="6">
          &nbsp;
        </Col>
        <Col span="12">
          <div>
            <Timeline>
              <TimelineItem v-for="(item,key,index) of content" :key="key">
                <p class="time">{{key}}</p>
                <div class="ivu-article">
                  <div v-for="(item2,key2) of item" :key="key2" v-if="item2[Object.keys(item2)[0]].length>0">
                    <Tag>
                      <router-link :to="{name: 'database_audit_detail', params: {id: Object.keys(item2)[0]}}">
                        变更ID: # {{Object.keys(item2)[0]}}
                        <Icon type="md-open" size="15"/>
                      </router-link>
                    </Tag>
                    <ul>
                      <li v-for="(item3,key3,index3) of item2[Object.keys(item2)[0]]" :key="key3">
                        类型：{{item3.type}}，库：{{item3.database}} ，表 {{item3.table}}，操作
                        <Tag v-if="item3.operation == 'create'" color="blue">{{item3.operation}}</Tag>
                        <Tag v-else-if="item3.operation == 'drop'" color="red">{{item3.operation}}</Tag>
                        <Tag v-else-if="item3.operation == 'alter'" color="orange">{{item3.operation}}</Tag>
                        <Tag v-else color="default">{{item3.operation}}</Tag>
                      </li>
                    </ul>
                  </div>
                </div>
              </TimelineItem>

              <TimelineItem>
                <p class="time">没有更多了</p>
              </TimelineItem>
            </Timeline>
          </div>
        </Col>
        <Col span="6">
          &nbsp;
        </Col>
      </Row>
    </Card>


  </div>
</template>

<script>
  import {getChangeNotice} from '@/api/database'

  export default {
    data() {
      return {
        content: [],
      }
    },
    mounted() {
      this.getChangeNotice()
    },
    methods: {
      getChangeNotice: function () {
        getChangeNotice().then(res => {
          this.content = res.data.data
        });
      }
      ,
    }
  }
</script>
