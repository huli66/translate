#!/bin/bash

# 构建 Docker 镜像
echo "正在构建 Docker 镜像..."
docker build -t translate-app .

# 运行容器
echo "正在启动容器..."
docker run -d --name translate-container -p 3000:3000 translate-app

echo "容器已启动！"
echo "应用运行在: http://localhost:3000"
echo ""
echo "可用的 API 端点:"
echo "- POST /translate - 百度翻译"
echo "- POST /fieldtranslate - 百度专业翻译"
echo "- POST /updateTranslatedText - 更新翻译文本"
echo "- POST /queryTranslatedText - 查询翻译文本"
echo ""
echo "停止容器: docker stop translate-container"
echo "查看日志: docker logs translate-container" 