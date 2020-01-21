<style>
  .content-body {
    margin-top: 70px;
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
  <div class="content-body">

    <Row :gutter="16">
      <Col span="6">
        &nbsp;
      </Col>
      <Col span="12">
        <div>

          <Timeline>

            <TimelineItem color="red">
              <Icon type="ios-trophy" slot="dot" size="20"></Icon>
              <p class="time">2019-06-28</p>
              <div class="ivu-article">
                <ul>
                  <li>新增 自动化测试平台</li>
                  <li>新增 自动化测试平台-自动化总览数据图表等</li>
                  <li>新增 自动化测试平台-自动化用例与执行</li>
                  <li>新增 自动化测试平台-运行结果关键数据等</li>
                  <li>新增 上线流程中，添加检查步骤“备份环境同步发布(apollo)” @郎奇鹏</li>
                </ul>
              </div>
            </TimelineItem>

<!--            <TimelineItem>-->
<!--              <p class="time">2019-06-06</p>-->
<!--              <div class="ivu-article">-->
<!--                <ul>-->
<!--                  <li>新增 流程更改-更改逾期</li>-->
<!--                  <li>新增 流程更改-清除验证码redis缓存</li>-->
<!--                  <li>修复 造号记录借款异常时记录状态显示问题</li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </TimelineItem>-->


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


  </div>
</template>

<script>


  export default {}
</script>
