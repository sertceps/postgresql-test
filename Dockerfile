FROM node:14.17.0-alpine

LABEL maintainer="Tankk<1253871819@qq.com>"

WORKDIR /app

# 设置时区
RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

# 设置NODE最大可用内存
ENV NODE_OPTIONS=--max-old-space-size=6144

COPY . .

RUN yarn install --prod --ignore-scripts

EXPOSE 3000


# 数据库相关
ENV DATABASE_TYPE=postgres
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=p5tgb6tfc%^
ENV DATABASE_DATABASE=upgrade
ENV DATABASE_SYNCHRONIZE=true
ENV DATABASE_LOGGING=true


CMD ["node", "--prof","dist/main.js"]


