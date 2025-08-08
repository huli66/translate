# Docker 部署指南

## 项目简介
这是一个基于 Node.js 的翻译服务，集成了百度翻译 API，提供多种翻译功能。

## 快速开始

### 方法一：使用构建脚本（推荐）
```bash
./build-and-run.sh
```

### 方法二：使用 Docker Compose
```bash
# 构建并启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方法三：手动构建
```bash
# 构建镜像
docker build -t translate-app .

# 运行容器
docker run -d --name translate-container -p 3000:3000 translate-app
```

## API 端点

### 1. 百度翻译
- **端点**: `POST /translate`
- **参数**: 
  ```json
  {
    "queryArr": ["hello", "world"],
    "from": "en",
    "to": "zh"
  }
  ```

### 2. 百度专业翻译
- **端点**: `POST /fieldtranslate`
- **参数**: 
  ```json
  {
    "queryArr": ["financial terms"],
    "from": "en",
    "to": "zh"
  }
  ```

### 3. 更新翻译文本
- **端点**: `POST /updateTranslatedText`
- **参数**: 同上

### 4. 查询翻译文本
- **端点**: `POST /queryTranslatedText`
- **参数**: 同上

## 容器管理

### 查看运行状态
```bash
docker ps
```

### 查看日志
```bash
docker logs translate-container
```

### 停止容器
```bash
docker stop translate-container
```

### 删除容器
```bash
docker rm translate-container
```

### 进入容器
```bash
docker exec -it translate-container sh
```

## 环境变量

可以通过环境变量配置应用：

```bash
docker run -d \
  --name translate-container \
  -p 3000:3000 \
  -e NODE_ENV=production \
  translate-app
```

## 健康检查

容器包含健康检查功能，会定期检查应用状态：
- 检查间隔：30秒
- 超时时间：3秒
- 重试次数：3次

## 安全特性

- 使用非 root 用户运行应用
- 多阶段构建减少镜像大小
- 只安装生产依赖

## 故障排除

### 端口被占用
如果 3000 端口被占用，可以映射到其他端口：
```bash
docker run -d --name translate-container -p 8080:3000 translate-app
```

### 查看容器状态
```bash
docker inspect translate-container
```

### 重启容器
```bash
docker restart translate-container
``` 