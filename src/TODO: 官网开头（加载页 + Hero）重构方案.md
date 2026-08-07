TODO: Hero Section 移动端适配方案

🎯 目标
让 Hero 在手机端保持视觉冲击力与可读性，同时不显得拥挤或失衡。

---

1️⃣ 布局调整

✅ 改为上下结构（垂直堆叠）
在移动端（宽度 ≤ 768px）时：

`
-----------------------------------------
| 背景图（上）                          |
| 文字内容（下）                        |
-----------------------------------------
`

CSS 示例
`css
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    height: auto;
    padding: 0;
  }

  .hero-left {
    max-width: 100%;
    text-align: center;
    padding: 2rem 1.2rem;
  }

  .hero-left h1 {
    font-size: 2rem;
  }

  .hero-left p {
    font-size: 1rem;
  }

  .cta {
    margin-top: 1.2rem;
  }
}
`

✅ 文字居中  
✅ 按钮居中  
✅ 背景图在上方显示完整视觉  

---

2️⃣ 背景图处理

✅ 背景图改为顶部展示
- 使用 background-position: center top;
- 保留蒙版（透明渐变）但减弱强度：
  `css
  background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
              url('/hero1.webp') center/cover no-repeat;
  `

✅ 保留层次感  
✅ 不压文字  

---

3️⃣ 字体与间距

✅ 字体缩放比例
- 主标题：2rem  
- 副标题：1rem  
- 段落：0.9rem  
- 按钮：padding: 10px 20px

✅ 间距
- 标题与副标题间距：0.4rem
- 副标题与段落间距：0.6rem
- 段落与按钮间距：1rem

✅ 保持呼吸感  
✅ 不显拥挤  

---

4️⃣ 动画节奏（轻量化）

✅ 移动端动画简化
- 取消 translateY 位移，只保留淡入：
  `css
  @keyframes fadeInMobile {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  `
- 动画时长：0.5s
- 延迟：标题 0s、副标题 0.1s、按钮 0.2s

✅ 节奏轻快  
✅ 不影响加载性能  

---

5️⃣ 按钮交互优化

✅ 点击区域扩大
`css
.cta {
  min-width: 140px;
  padding: 12px 24px;
  font-size: 1rem;
}
`

✅ Hover 改为点击反馈（移动端）
`css
.cta:active {
  background: #fdd835;
  color: #000;
  box-shadow: 0 0 8px rgba(253,216,53,0.4);
}
`

✅ 手感更自然  
✅ 不依赖 hover  

---

6️⃣ Hero 高度与滚动体验

✅ 高度自适应内容
`css
.hero {
  min-height: 100vh;
  overflow: hidden;
}
`

✅ 不会出现“半屏空白”  
✅ 背景图始终填满视窗  

---

7️⃣ 验收标准

- [ ] Hero 在手机端上下结构显示  
- [ ] 背景图完整显示且不压文字  
- [ ] 字体与间距适配良好  
- [ ] 按钮点击反馈正常  
- [ ] 动画轻量流畅  
- [ ] 页面加载不卡顿  

---

🔧 分支命名建议

如果这是专门做移动端适配的分支：

`
feature/hero-mobile-layout
`

或更工程化一点：

`
refactor/hero-responsive
`

---

🚀 最终效果
- 手机端进入时，Hero 背景图先淡入  
- 下方文字居中显示，按钮醒目但不突兀  
- 整体风格与桌面端一致，节奏轻快  
- 页面加载流畅，无闪烁、无白屏