// @/src/router/index.ts
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ComparePage from '@/pages/ComparePage.vue'
const routes = [
  {
    path: '/',          // 根路径
    name: 'home',
    component: Home,     // 直接渲染 Home
  },
  {
    path: '/compare',
    name: 'compare',
    component: ComparePage,
  },
]
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router