# 项目架构说明

## 文件结构与职责

```
src/
├── main.jsx                 # 应用入口，挂载 React 根组件
├── App.jsx                  # 根组件，配置路由和全局布局
├── index.css                # 全局样式，引入 Tailwind CSS
│
├── components/
│   ├── ui/                  # 通用 UI 组件
│   │   ├── Header.jsx       # 顶部导航栏，包含 Logo 和导航链接，当前页面高亮显示
│   │   ├── Footer.jsx       # 页脚，显示版权信息
│   │   ├── Skills.jsx       # 技能卡片组件，进度条动画
│   │   ├── Timeline.jsx     # 经历时间轴组件，垂直布局
│   │   └── LoadingScreen.jsx # 初始加载界面，3D旋转几何体 + 进度条
│   │
│   ├── 3D/                  # 3D 渲染组件（Three.js/R3F）
│   │   ├── CanvasWrapper.jsx    # R3F Canvas 容器，配置相机/光照/OrbitControls
│   │   ├── Avatar.jsx           # 3D头像组件，球体+方块组合，悬停缩放交互
│   │   ├── ParticleSystem.jsx   # 背景粒子系统，800个粒子缓慢旋转
│   │   ├── RotatingBox.jsx      # 旋转立方体（开发调试用）
│   │   ├── ModelLoader.jsx      # GLTF模型加载器，使用useGLTF
│   │   └── Effects.jsx          # 后处理效果组件，Bloom/Vignette/ChromaticAberration
│   │
│   └── scenes/               # 页面级 3D 场景
│       └── HomeScene.jsx    # 首页场景，整合Canvas+Avatar+ParticleSystem
│
├── pages/                   # 页面组件
│   ├── About.jsx           # 关于页面，技能展示
│   ├── Projects.jsx        # 项目页面，项目卡片网格
│   └── Contact.jsx         # 联系页面，表单
│
├── hooks/                   # 自定义 React Hooks
│   └── useDevicePerformance.js  # 设备性能检测，识别移动端/低性能设备
│
├── stores/                  # 状态管理（待开发，可选 Zustand/Context）
│
└── assets/
    └── models/              # 3D 模型文件 (.glb/.gltf)
```

## 核心组件说明

### useDevicePerformance.js
- 自定义 Hook，检测设备性能等级
- 检测方式：屏幕宽度 < 768px 判断为移动端，硬件核心数 <= 4 或内存 <= 4GB 判断为低端设备
- 返回值：{ isMobile, isLowEnd, pixelRatio }
- 用途：CanvasWrapper 和 HomeScene 根据设备性能调整渲染参数

### Header.jsx
- 顶部导航栏组件，固定定位
- NavLink 子组件：使用 useLocation 检测当前路由，active 状态显示 cyan-400 颜色 + 粗体
- 响应式：移动端减小字号、内边距、间距
- 布局：Logo 在左，导航链接在右，使用 backdrop-blur 毛玻璃效果

### CanvasWrapper.jsx
- R3F Canvas容器，处理WebGL上下文
- 配置：相机位置[0,0,5]、FOV 75、dpr[1,2]、high-performance
- 光照：AmbientLight + DirectionalLight
- 交互：OrbitControls支持鼠标拖拽旋转
- 后处理：集成 Effects 组件（Bloom/Vignette/ChromaticAberration）
- 响应式适配：移动端 dpr 降至 [1,1.5]，禁用抗锯齿和阴影

### Avatar.jsx
- 3D头像占位，由球体(身体)和方块(头部)组成
- 旋转动画：useFrame每帧更新rotation.y
- 悬停交互：onPointerOver/onPointerOut触发状态变化
- 缩放动画：MathUtils.lerp实现平滑过渡
- 光标变化：useCursor在悬停时改变鼠标指针

### ParticleSystem.jsx
- 背景粒子效果，使用BufferGeometry优化性能
- 800个粒子，使用Float32Array存储位置和颜色
- 缓慢旋转动画，不影响前景交互

### HomeScene.jsx
- 页面布局：absolute定位的Canvas背景 + pointer-events-none的文字层
- 关键：文字层必须设置pointer-events-none，否则阻挡Canvas事件
- 整合所有3D组件到一个场景
- 响应式适配：使用 useDevicePerformance 检测设备，移动端粒子数从800降至400

### Skills.jsx
- 技能展示卡片组件，展示技能名称、等级百分比、分类
- 使用 Framer Motion 实现 staggered 入场动画
- 进度条动画：从0%过渡到目标值（使用 motion.div）
- 响应式：移动端1列，桌面端2列
- 数据结构：name(名称), level(等级), category(分类)

### Timeline.jsx
- 垂直时间轴组件，展示个人经历
- 左侧竖线 + 圆点设计
- 每项包含：year(年份)、title(职位)、company(公司)、description(描述)
- 滚动入场动画，带 stagger 延迟效果

### LoadingScreen.jsx
- 初始加载界面，在应用首次渲染时显示
- 3D 动画：八面体 + 圆环旋转（使用 R3F Canvas）
- 进度条：使用 setInterval 定时器模拟加载进度（约2秒）
- 动画：AnimatePresence 实现淡出效果
- 重要：useProgress 仅在 Canvas 内部可用，外部加载需模拟

### Effects.jsx
- 后处理效果组件，使用 @react-three/postprocessing
- 包含 Bloom（发光）、Vignette（暗角）、ChromaticAberration（色差）效果
- 使用 useDevicePerformance 检测设备性能
- 移动端和低端设备自动禁用，保证性能

### App.jsx
- 根组件，配置 React Router 和全局布局
- 懒加载：使用 React.lazy + Suspense 分割页面代码（HomeScene, About, Projects, Contact）
- PageLoader：懒加载时的加载动画组件（旋转 spinner）
- AnimatedRoutes：使用 AnimatePresence + motion.div 实现页面过渡
- 过渡模式：mode="wait" 确保当前页面退出后再进入新页面
- 动画效果：opacity 0→1 + y 20→0，时长 0.3 秒
- 路由：/, /about, /projects, /contact

### About.jsx
- 关于页面主组件，整合 Skills 和 Timeline
- 页面级入场动画：标题→介绍→技能→时间轴依次淡入
- 使用 motion 组件实现过渡效果

### Projects.jsx
- 项目展示页面，包含项目卡片网格和分类筛选
- 数据结构：id, title, description, category, tags, image, link
- 分类筛选：All/Web/App/Game/AI，支持筛选动画
- ProjectCard 组件：悬停上移动画，使用 Framer Motion
- ProjectModal 组件：点击展示项目详情模态框
- 使用 AnimatePresence 实现筛选时的过渡动画

## 技术选型说明

| 技术 | 用途 | 说明 |
|------|------|------|
| React 19 | UI 框架 | 组件化开发 |
| Vite 7 | 构建工具 | 快速启动，热更新 |
| Tailwind CSS v4 | 样式方案 | 原子化 CSS，需配合 @tailwindcss/vite |
| React Router | 路由管理 | 页面导航 |
| Three.js + R3F | 3D 渲染 | 核心 3D 能力 |
| @react-three/drei | R3F 工具库 | 常用 3D 组件封装 |
| Framer Motion | 动画库 | 页面/元素过渡动画 |

## 开发规范

- 使用 JavaScript（非 TypeScript）
- 组件使用 PascalCase 命名
- 样式使用 Tailwind CSS 工具类
- 3D 组件放在 components/3D/
- 页面场景组件放在 components/scenes/
- 页面组件放在 pages/
