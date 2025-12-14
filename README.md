# 🛠️ Pure Web Tools - 纯前端在线工具箱

一个基于现代浏览器技术构建的在线工具集合。无需上传文件到服务器，所有处理均在用户浏览器本地完成，安全、快速且保护隐私。

[👉 在线体验 Live Demo](https://你的用户名.github.io/你的仓库名/)
## ✨ 功能特性 (Features)

### 1. 🖼️ 图片格式转换 (Image Converter)
- **JPG 转 PNG**：将 JPEG 图片转换为无损 PNG 格式。
- **技术原理**：利用 HTML5 Canvas 进行像素重绘与导出。
- **特点**：极速转换，无流量消耗。

### 2. 🎬 视频转动图 (Video to GIF)
- **MP4/WebM 转 GIF**：将短视频转换为 GIF 动图。
- **自定义参数**：自动压缩帧率 (10fps) 和分辨率，优化生成的 GIF 体积。
- **技术原理**：基于 **WebAssembly** 技术的 `FFmpeg.wasm` 核心。
- **特点**：支持复杂视频编码，完全本地运行。

## 🛠️ 技术栈 (Tech Stack)

- **核心语言**：HTML5, CSS3, JavaScript (ES6+)
- **视频处理**：[FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- **跨域隔离**：[coi-serviceworker](https://github.com/gzuidhof/coi-serviceworker) (用于开启 SharedArrayBuffer 支持)
- **样式设计**：原生 CSS (Flexbox 布局，响应式设计)

## 📂 项目结构

```text
.
├── index.html               # 图片转换工具 (主页)
├── video.html               # 视频转 GIF 工具
├── style.css                # 全局通用样式
├── coi-serviceworker.min.js # 跨域隔离脚本 (FFmpeg 必需)
└── README.md                # 项目说明文档

🚀 如何在本地运行 (Development)
由于视频转换功能使用了 SharedArrayBuffer，浏览器出于安全限制，要求必须在 HTTPS 或 localhost 环境下，且具备特定的响应头才能运行。你不能直接双击 html 文件打开。

克隆仓库

Bash

git clone [https://github.com/你的用户名/你的仓库名.git](https://github.com/你的用户名/你的仓库名.git)
启动本地服务器 如果你使用 VS Code，推荐安装插件 Live Server。

右键点击 index.html 或 video.html

选择 Open with Live Server

❓ 常见问题 (FAQ)
Q: 为什么视频转换一直提示 "SharedArrayBuffer is not defined"？ A: 这是因为浏览器安全策略限制。请确保：

项目目录下存在 coi-serviceworker.min.js 文件且内容正确。

你是通过 http://localhost 或 https:// (如 GitHub Pages) 访问的，而不是 file://。

如果刚刚部署，请尝试 Ctrl + F5 强制刷新以清除旧缓存。

Q: 文件会被上传到服务器吗？ A: 不会。所有代码都在你的浏览器中运行。图片和视频处理过程完全在本地（Client-side），即便断网也能使用（只要核心库已加载）。

📄 License
MIT © 2025 Your Name
