# 项目架构说明

## 文件结构与职责

```
src/
├── main.jsx                 # 应用入口，挂载 React 根组件
├── App.jsx                  # 根组件，配置路由和布局
├── index.css                # 全局样式，引入 Tailwind CSS
│
├── components/
│   ├── ui/                  # 通用 UI 组件
│   │   ├── Header.jsx       # 顶部导航栏，包含 Logo 和导航链接
│   │   └── Footer.jsx       # 页脚，显示版权信息
│   │
│   ├── 3D/                  # 3D 渲染组件
│   │   └── (待添加)          # Three.js/R3F 组件
│   │
│   └── scenes/              # 页面级 3D 场景
│       └── HomeScene.jsx    # 首页 3D 场景占位
│
├── pages/                   # 页面组件（待开发）
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
│
├── hooks/                   # 自定义 React Hooks（待开发）
│
├── stores/                  # 状态管理（待开发，可选 Zustand/Context）
│
└── assets/
    └── models/              # 3D 模型文件 (.glb/.gltf)
```

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
