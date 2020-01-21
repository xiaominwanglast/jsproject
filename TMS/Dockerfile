FROM dhub.2345intra.com/testteam/tms_base as builder
RUN mkdir /opt/app -p && npm config set registry http://registry.npm.taobao.org/
WORKDIR /opt/app

# 拷贝代码
COPY . .

# 编译vue
RUN npm install --registry=https://registry.npm.taobao.org && npm run build

FROM dhub.2345intra.com/ci/tengine2:2.2.0

RUN mkdir /opt/app -p
WORKDIR /opt/app

# 拷贝node生产的静态html文件
COPY --from=builder /opt/app/dist /opt/app/dist
COPY --from=builder /opt/app/entrypoint.sh /opt/app/entrypoint.sh
COPY --from=builder /opt/app/nginx_tc.conf /opt/app/tengine2/conf/conf.d/nginx_tc.conf

RUN dos2unix /opt/app/entrypoint.sh && chmod +x /opt/app/entrypoint.sh && \
    ln -sf /dev/stdout /opt/app/tengine2/logs/access.log && \
    ln -sf /dev/stderr /opt/app/tengine2/logs/stderr.log

EXPOSE 80

ENTRYPOINT ["/opt/app/entrypoint.sh"]