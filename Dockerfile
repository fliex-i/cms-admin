FROM node:18-alpine

WORKDIR /app

# 安装 yarn、curl 和 bash
RUN apk add --no-cache curl bash && \
    corepack enable && corepack prepare yarn@4.9.2 --activate

# 复制 package.json 和 yarn.lock 先安装依赖
COPY package.json yarn.lock ./
RUN yarn config set nodeLinker node-modules && \
    yarn install

# 复制其余文件
COPY . .

# 创建日志目录并设置权限
RUN mkdir -p /app/logs && \
    chmod -R 777 /app/logs

# 暴露端口
EXPOSE 7001

CMD ["yarn", "start"]