# AI2501班级小窝 🏠

这是华中科技大学人工智能与自动化学院人工智能2501班的班级主页项目，用于展示班级介绍、电子相册、电子日历和留言板。网站已适配 GitHub Pages，可作为班级活动记录和信息展示的小天地。

## 在线访问 ✨

网站地址：

[https://aia2501.github.io/](https://aia2501.github.io/)

## 主要功能 🌱

- **首页展示**：展示学院院徽、班徽、班级简介和华中科技大学校训。
- **电子相册**：使用 Fancybox 灯箱浏览班级照片，已接入“东湖团建”和“班会留影”相册。
- **电子日历**：使用 FullCalendar 展示考试与班级日程，支持点击日期新增本地事件。
- **留言板**：使用 Giscus 接入 GitHub Discussions，让同学们可以登录 GitHub 留言互动。
- **响应式布局**：桌面端为左侧导航，移动端切换为顶部汉堡菜单。

## 项目结构 📁

```text
AIA2501/
├── index.html              # 网站主页面
├── README.md               # 项目说明
├── images/                 # 班徽、院徽、班级相册等图片资源
├── scripts/
│   ├── album-data.js        # 电子相册图片路径数据
│   └── main.js              # 页面切换、日历、相册、留言板交互逻辑
└── styles/
    └── main.css             # 页面样式
```

## 技术栈 🛠️

- HTML5
- CSS3
- 原生 JavaScript
- [Fancybox](https://fancyapps.com/fancybox/)：电子相册灯箱效果
- [FullCalendar](https://fullcalendar.io/)：电子日历
- [Giscus](https://giscus.app/zh-CN)：基于 GitHub Discussions 的留言系统
- GitHub Pages：静态网站部署

## 内容维护说明 📝

### 修改首页文字

首页内容主要在 `index.html` 中维护，包括班级简介、校训、班级风采卡片等。

### 更新电子相册

相册图片放在 `images/班级相册/` 下。当前已接入：

- `images/班级相册/东湖团建/`
- `images/班级相册/班会留影/`

如果新增照片，需要同步更新 `scripts/album-data.js` 中的图片路径。

### 修改电子日历事件

默认日历事件在 `scripts/main.js` 的 `baseEvents` 数组中维护。当前包含 2026 年考试安排。

### 配置留言板

留言板使用 Giscus，需要满足：

1. 仓库开启 GitHub Discussions。
2. 仓库安装 Giscus App。
3. `index.html` 中填写正确的 `data-repo`、`data-repo-id`、`data-category-id` 等参数。

当前配置对应仓库：

```text
AIA2501/AIA2501.github.io
```

## 本地预览 💻

本项目是纯静态网页，可以直接打开 `index.html` 预览。也可以使用任意静态服务器运行，例如 VS Code Live Server。

## 班级寄语 🌷

明德厚学，求是创新。<br>
愿 AI2501 的每一次相遇，都能在这里留下温暖的回声。
