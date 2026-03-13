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
│   │   ├── Header.jsx       # 顶部导航栏，包含 Logo 和导航链接
│   │   ├── Footer.jsx       # 页脚，显示版权信息
│   │   ├── Skills.jsx       # 技能卡片组件，进度条动画
│   │   └── Timeline.jsx     # 经历时间轴组件，垂直布局
│   │
│   ├── 3D/                  # 3D 渲染组件（Three.js/R3F）
│   │   ├── CanvasWrapper.jsx    # R3F Canvas 容器，配置相机/光照/OrbitControls
│   │   ├── Avatar.jsx           # 3D头像组件，球体+方块组合，悬停缩放交互
│   │   ├── ParticleSystem.jsx   # 背景粒子系统，800个粒子缓慢旋转
│   │   ├── RotatingBox.jsx      # 旋转立方体（开发调试用）
│   │   └── ModelLoader.jsx      # GLTF模型加载器，使用useGLTF
│   │
│   └── scenes/               # 页面级 3D 场景
│       └── HomeScene.jsx    # 首页场景，整合Canvas+Avatar+ParticleSystem
│
├── pages/                   # 页面组件
│   ├── About.jsx           # 关于页面，技能展示
│   ├── Projects.jsx        # 项目页面，项目卡片网格
│   └── Contact.jsx         # 联系页面，表单
│
├── hooks/                   # 自定义 React Hooks（待开发）
│
├── stores/                  # 状态管理（待开发，可选 Zustand/Context）
│
└── assets/
    └── models/              # 3D 模型文件 (.glb/.gltf)
```

## 核心组件说明

### CanvasWrapper.jsx
- R3F Canvas容器，处理WebGL上下文
- 配置：相机位置[0,0,5]、FOV 75、dpr[1,2]、high-performance
- 光照：AmbientLight + DirectionalLight
- 交互：OrbitControls支持鼠标拖拽旋转

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

### About.jsx
- 关于页面主组件，整合 Skills 和 Timeline
- 页面级入场动画：标题→介绍→技能→时间轴依次淡入
- 使用 motion 组件实现过渡效果

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
