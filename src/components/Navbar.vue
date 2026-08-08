<!-- src/components/Navbar.vue -->
<template>
  <header class="site-navbar">
    <nav class="site-navbar__inner" aria-label="主导航">
      <!-- 品牌 Logo（沿用原 href="/" 路径） -->
      <router-link to="/" class="site-navbar__brand" @click="closeMenu">
        <strong class="site-navbar__brand-title">海口市第四中学网络部</strong>
        <span class="site-navbar__brand-sub">wlb.yt437700.top</span>
      </router-link>

      <!-- 桌面端横向菜单 / 移动端下拉面板（同一份 DOM，断点切换样式） -->
      <ul class="site-navbar__menu" id="site-navbar-menu" :class="{ 'site-navbar__menu--open': isMobileMenuOpen }">
        <li class="site-navbar__item">
          <a
            href="#"
            class="site-navbar__link"
            :class="{ 'site-navbar__link--active': isHomeActive }"
            :aria-current="isHomeActive ? 'page' : undefined"
            @click="onMenuLinkClick"
          >概览</a>
        </li>
        <li class="site-navbar__item">
          <a href="#我们的工作" class="site-navbar__link" @click="onMenuLinkClick">我们的工作</a>
        </li>
        <li class="site-navbar__item">
          <a href="#benefits" class="site-navbar__link" @click="onMenuLinkClick">各种福利</a>
        </li>
        <li class="site-navbar__item">
          <router-link to="/compare" class="site-navbar__link" @click="onMenuLinkClick">我们 vs 老师</router-link>
        </li>
        <li class="site-navbar__item">
          <a href="#关于" class="site-navbar__link" @click="onMenuLinkClick">关于</a>
        </li>
      </ul>

      <!-- 汉堡按钮（内联 SVG 图标，仅移动端显示） -->
      <button
        class="site-navbar__toggler"
        type="button"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="site-navbar-menu"
        aria-label="切换导航菜单"
        @click="toggleMenu"
      >
        <svg
          class="site-navbar__toggler-icon"
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <line class="site-navbar__bar site-navbar__bar--1" x1="3" y1="6" x2="21" y2="6" />
          <line class="site-navbar__bar site-navbar__bar--2" x1="3" y1="12" x2="21" y2="12" />
          <line class="site-navbar__bar site-navbar__bar--3" x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </nav>

    <!-- 移动端遮罩 -->
    <transition name="site-navbar-fade">
      <div v-if="isMobileMenuOpen" class="site-navbar__overlay" @click="closeMenu"></div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 移动端菜单开关
const isMobileMenuOpen = ref(false)

// 概览链接：根路径下保持激活态（沿用原静态 active 样式）
const isHomeActive = computed(() => route.path === '/')

const setBodyScrollLock = (locked: boolean) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = locked ? 'hidden' : ''
  }
}

const closeMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 点击任意导航链接后自动收起移动端菜单
const onMenuLinkClick = () => {
  closeMenu()
}

// 移动端菜单打开时锁定页面滚动，关闭时恢复
watch(
  isMobileMenuOpen,
  (open) => {
    setBodyScrollLock(open)
  },
  { flush: 'sync' },
)

// 窗口拉回大屏（>768px）时自动关闭移动端菜单，防止菜单卡死
const handleResize = () => {
  if (window.innerWidth > 768 && isMobileMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  setBodyScrollLock(false)
})
</script>

<style lang="scss" scoped>
@use '../styles/common.scss' as *;

/* ========== 导航栏容器（固定顶部，沿用 bg-dark + 0.7 透明度） ========== */
.site-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid $color-border-soft;
  box-shadow: $shadow-navbar;

  /* 半透明深色底 + 2px 背景模糊。
     用伪元素承载 backdrop-filter，避免在 .site-navbar 上直接加 filter
     （那会让该元素成为 fixed 后代的包含块，破坏移动端全屏遮罩的定位）。 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: rgba($color-bg-dark, 0.7);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
}

.site-navbar__inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $navbar-height;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========== 品牌 Logo ========== */
.site-navbar__brand {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  color: $color-nav-text;
  text-decoration: none;
  transition: color $transition-base;

  &:hover {
    color: $color-nav-text-hover;
  }
}

.site-navbar__brand-title {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-navbar__brand-sub {
  font-size: 0.75rem;
  color: $color-text-dim;
  letter-spacing: 0.12em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ========== 导航菜单（桌面横向） ========== */
.site-navbar__menu {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-navbar__item {
  margin: 0;
}

.site-navbar__link {
  position: relative;
  display: inline-block;
  padding: 0.5rem 0.875rem;
  border-radius: $radius-sm;
  color: $color-nav-text;
  font-size: 0.95rem;
  text-decoration: none;
  transition: color $transition-base, background-color $transition-base;

  &:hover {
    color: $color-nav-text-hover;
  }

  /* 激活态：主题强调色 + 下划线 */
  &.site-navbar__link--active,
  &.router-link-exact-active {
    color: $color-accent;

    &::after {
      content: "";
      position: absolute;
      left: 0.875rem;
      right: 0.875rem;
      bottom: 0.125rem;
      height: 2px;
      border-radius: 2px;
      background: $color-accent;
    }
  }
}

/* ========== 汉堡按钮（默认隐藏，移动端显示） ========== */
.site-navbar__toggler {
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: 0.75rem;
  padding: 0;
  border: 1px solid $color-border-soft;
  border-radius: $radius-sm;
  background: transparent;
  color: $color-nav-text;
  cursor: pointer;
  transition: color $transition-base, border-color $transition-base;

  &:hover {
    color: $color-nav-text-hover;
    border-color: $color-border-softer;
  }
}

.site-navbar__toggler-icon {
  display: block;
}

.site-navbar__bar {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform $transition-base, opacity $transition-base;
}

/* 菜单打开时三条线变叉号 */
.site-navbar__toggler[aria-expanded='true'] .site-navbar__bar--1 {
  transform: translateY(6px) rotate(45deg);
}

.site-navbar__toggler[aria-expanded='true'] .site-navbar__bar--2 {
  opacity: 0;
}

.site-navbar__toggler[aria-expanded='true'] .site-navbar__bar--3 {
  transform: translateY(-6px) rotate(-45deg);
}

/* ========== 移动端遮罩 ========== */
.site-navbar__overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
}

.site-navbar-fade-enter-active,
.site-navbar-fade-leave-active {
  transition: opacity 0.25s ease;
}

.site-navbar-fade-enter-from,
.site-navbar-fade-leave-to {
  opacity: 0;
}

/* ========== 移动端（≤768px）：隐藏横向菜单，启用汉堡下拉面板 ========== */
@media (max-width: $breakpoint-mobile) {
  .site-navbar__inner {
    height: $navbar-height-mobile;
    padding: 0 1rem;
  }

  .site-navbar__brand-title {
    font-size: 1rem;
  }

  .site-navbar__toggler {
    display: flex;
  }

  /* 横向菜单改为下拉面板 */
  .site-navbar__menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 3;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    padding: 0.5rem 1rem 1rem;
    background: rgba($color-bg-dark, 0.97);
    border-bottom: 1px solid $color-border-soft;
    box-shadow: $shadow-menu;
    max-height: calc(100vh - #{$navbar-height-mobile});
    overflow-y: auto;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      visibility 0s linear 0.25s;
  }

  .site-navbar__menu--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      visibility 0s linear 0s;
  }

  .site-navbar__link {
    display: block;
    padding: 0.75rem 0.875rem;
    border-radius: $radius-md;
    font-size: 1rem;
  }

  .site-navbar__link:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .site-navbar__link.site-navbar__link--active,
  .site-navbar__link.router-link-exact-active {
    background: $color-accent-soft;

    &::after {
      display: none;
    }
  }
}
</style>
