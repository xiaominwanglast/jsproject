### 概述

这是关于提测平台的项目，目前是部署在`172.17.1.54`上执行机器上。

等构建成功后，在`172.17.1.54`上执行docker rm -f tms删除之前部署的容器，

再执行`docker run -d --name tms -p 80:80 172.17.1.10/testteam/tms`，

之后访问 http://172.17.1.54/ 来确认安装成功。

### 容器环境移植

首先记录Dockerfile中的基础镜像，如172.17.1.10/ci/node:8.12.0、172.17.1.10/ci/tengine2:2.2.0，、

然后docker save 172.17.1.10/ci/node:8.12.0 -o tms_node.tar、docker save 172.17.1.10/ci/tengine2:2.2.0 -o tms_tengine.tar，

将上述两个tar上传到一台服务器上，通过docker load -i tms_node.tar以及docker load -i tms_tengine.tar导入基础镜像，

之后通过docker build -t demo/tms . 来构建TMS镜像，

最后通过docker run -d --name -p 80:80 demo/tms启动该服务。

打开浏览器输入$hostip来验证结果。


###基础镜像

`docker build -f Dockerfile_Base -t dhub.2345intra.com/testteam/tms_base .`

`docker push dhub.2345intra.com/testteam/tms_base`