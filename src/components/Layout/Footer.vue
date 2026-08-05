<!-- src/components/Layout/Footer.vue -->
<template>
  <footer id="关于" class="footer bg-dark text-white py-4">
    <div class="container">
      <div class="row g-4">
        <!-- 组织信息 -->
        <div class="col-lg-auto col-md-12">
          <div class="footer-about">
            <h5 class="fw-bold mb-3">海口市第四中学团委学生会<br />网络管理部</h5>
            <div class="footer-contact">
              <p class="">期待您的加入
              <div class="mt-3">
                <span class="fw-semibold">QQ群:</span>
                <a
                  id="进群链接"
                  href="https://qm.qq.com/q/5gVlLLYjtC"
                  class="text-decoration-none ms-2 text-muted"
                  target="_blank"
                >
                  点击跳转加入群聊
                </a>
              </div></p>
            </div>
          </div>
        </div>

        <!-- 页面信息 -->
        <div class="col-lg-4 col-md-auto">
          <div class="tech-stats">
            <h6 class="fw-bold mb-3">页面构成</h6>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="(item, index) in pageCompositionData"
                :key="index"
                class="badge px-3 py-2"
                :class="item.colorClass"
              >
                {{ item.name }} {{ item.percentage }}%
              </span>
            </div>
          </div>
        </div>

        <!-- 版权信息 -->
        <div class="col-lg-5">
          <div class="copyright text-lg-end">
            <div class="mb-3">
              <span>Copyright</span>
              <strong class="px-1">海口市第四中学网络部</strong>
              <span>All Rights Reserved</span>
            </div>
            <div class="mb-3">
              <a
                href="https://github.com/anndfine/hnhkszwlbsite"
                class="text-decoration-none"
                target="_blank"
              >
                <i class="bi bi-github"></i>
                在Github上编辑此页
              </a>
            </div>
            <div class="text-secondary small">
              <div>
                为保护隐私，成员信息仅展示社交平台昵称；部分往届成员信息因时间久远暂缺。数据统计截至2026年03月。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { pageCompositionData } from '@/assets/data/pageCompositionData'
</script>
