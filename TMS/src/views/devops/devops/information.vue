<style scoped>



</style>

<template>
  <div>

    <Card :bordered="false">
      <p style="text-align: center;font-size:20px" slot="title">测试环境信息</p>
      <div >
        <div>
          <p><strong>网络拓扑图：</strong></p>
          <Divider />
           <img src="@/assets/img/环境配置.png" >
          <Divider />
        </div>
        <div>
          <strong>mysql连接信息：</strong>
          <br><br/>
          <p><strong>T1:</strong></p>
          <p>&ensp;&ensp;&ensp;ip:172.17.0.32 <p>
          <p>&ensp;&ensp;&ensp;port:3306</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p><strong>T2:</strong></p>
          <p>&ensp;&ensp;&ensp;ip:172.16.0.142 <p>
          <p>&ensp;&ensp;&ensp;port:3307</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p><strong>T3:</strong></p>
          <p>&ensp;&ensp;&ensp;ip:172.17.0.30 <p>
          <p>&ensp;&ensp;&ensp;port:3306</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p><strong>P1:</strong></p>
          <p>&ensp;&ensp;&ensp;ip:172.17.0.34 <p>
          <p>&ensp;&ensp;&ensp;port:3306</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p>&ensp;&ensp;&ensp;test_dkw</p>
          <p><strong>D1:</strong></p>
          <p>&ensp;&ensp;&ensp;ip:172.17.0.120 <p>
          <p>&ensp;&ensp;&ensp;port:3306</p>
          <p>&ensp;&ensp;&ensp;test_ljd</p>
          <p>&ensp;&ensp;&ensp;dev123</p>
          <p><strong>D2:</strong></p>
          <p>&ensp;&ensp;&ensp;ip:172.17.0.121 <p>
          <p>&ensp;&ensp;&ensp;port:3306</p>
          <p>&ensp;&ensp;&ensp;test_ljd</p>
          <p>&ensp;&ensp;&ensp;dev123</p>

          <Divider />
          <strong>rocketmq地址：</strong>
          <br><br/>

          <p>T1:&ensp;&ensp;&ensp;<a href="http://172.17.0.32:8080/#/" target="_blank">http://172.17.0.32:8080</a></p>
          <p>T2:&ensp;&ensp;&ensp;<a href="http://172.16.0.142:8080/#/" target="_blank">http://172.16.0.142:8080</a></p>
          <p>T3:&ensp;&ensp;&ensp;<a href="http://172.17.0.30:8080/#/" target="_blank">http://172.17.0.30:8080</a></p>
          <p>P1:&ensp;&ensp;&ensp;<a href="http://172.17.0.34:8080/#/" target="_blank">http://172.17.0.34:8080</a></p>
          <p>D1:&ensp;&ensp;&ensp;<a href="http://172.17.0.120:8080/#/" target="_blank">http://172.17.0.120:8080</a></p>
          <p>D2:&ensp;&ensp;&ensp;<a href="http://172.17.0.121:8080/#/" target="_blank">http://172.17.0.121:8080</a></p>
          <Divider />
          <strong>hexin-rockemq地址：</strong>
          <br><br/>
          <p>T1:&ensp;&ensp;&ensp;<a href="http://172.17.0.32:8081/#/" target="_blank">http://172.17.0.32:8081</a></p>
          <p>T2:&ensp;&ensp;&ensp;<a href="http://172.16.0.142:8081/#/" target="_blank">http://172.16.0.142:8081</a></p>
          <p>T3:&ensp;&ensp;&ensp;<a href="http://172.17.0.30:8081/#/" target="_blank">http://172.17.0.30:8081</a></p>
          <p>P1:&ensp;&ensp;&ensp;<a href="http://172.17.0.34:8081/#/" target="_blank">http://172.17.0.34:8081</a></p>
          <p>D1:&ensp;&ensp;&ensp;<a href="http://172.17.0.120:8089/#/" target="_blank">http://172.17.0.120:8089</a></p>
          <p>D2:&ensp;&ensp;&ensp;<a href="http://172.17.0.121:8089/#/" target="_blank">http://172.17.0.121:8089</a></p>

          <Divider />
          <strong>esjob地址： 用户名:root 密码:root</strong>
          <br><br/>
          <p>T1:&ensp;&ensp;&ensp;<a href="http://172.17.0.32:8899/#/" target="_blank">http://172.17.0.32:8899</a></p>
          <p>T2:&ensp;&ensp;&ensp;<a href="http://172.16.0.142:8899/#/" target="_blank">http://172.16.0.142:8899</a></p>
          <p>T3:&ensp;&ensp;&ensp;<a href="http://172.17.0.30:8899/#/" target="_blank">http://172.17.0.30:8899</a></p>
          <p>P1:&ensp;&ensp;&ensp;<a href="http://172.17.0.34:8899/#/" target="_blank">http://172.17.0.34:8899</a></p>
          <p>D1:&ensp;&ensp;&ensp;<a href="http://172.17.0.120:8899/#/" target="_blank">http://172.17.0.120:8899</a></p>
          <p>D2:&ensp;&ensp;&ensp;<a href="http://172.17.0.121:8899/#/" target="_blank">http://172.17.0.121:8899</a></p>
          <Divider />
          <strong>dubbo-admin地址： 用户名:guest 密码:guest</strong>
          <br><br/>
          <p>T1:&ensp;&ensp;&ensp;<a href="http://t1-dubbo-admin.2345intra.com/" target="_blank">http://t1-dubbo-admin.2345intra.com/</a></p>
          <p>T2:&ensp;&ensp;&ensp;<a href="http://t2-dubbo-admin.2345intra.com/" target="_blank">http://t2-dubbo-admin.2345intra.com/</a></p>
          <p>T3:&ensp;&ensp;&ensp;<a href="http://t3-dubbo-admin.2345intra.com/" target="_blank">http://t3-dubbo-admin.2345intra.com/</a></p>
          <p>P1:&ensp;&ensp;&ensp;<a href="http://p1-dubbo-admin.2345intra.com/" target="_blank">http://p1-dubbo-admin.2345intra.com/</a></p>
          <p>D1:&ensp;&ensp;&ensp;<a href="http://d1-dubbo-admin.2345intra.com/" target="_blank">http://d1-dubbo-admin.2345intra.com/</a></p>
          <p>D2:&ensp;&ensp;&ensp;<a href="http://d2-dubbo-admin.2345intra.com/" target="_blank">http://d2-dubbo-admin.2345intra.com/</a></p>
          <Divider />
        </div>
      </div>

    </Card>

  </div>
</template>

<script>


</script>
