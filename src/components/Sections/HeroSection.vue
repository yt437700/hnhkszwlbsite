<!-- src/components/Sections/HeroSection.vue -->
<template>
  <section class="_bg-white rounded min-vh-100">
    <div class="position-relative" style="height: 100vh">
      <!-- 轮播图 -->
      <div class="carousel slide h-100" data-bs-ride="carousel" id="fullscreenCarousel">
        <div class="carousel-inner h-100">
          <div v-for="(slide, index) in slides" :key="index" class="carousel-item h-100"
            :class="{ active: slide.active }">
            <img :src="slide.image" class="d-block w-100 h-100" style="object-fit: cover"
              :alt="slide.alt" />
          </div>
        </div>
      </div>

      <!-- 轮播图遮罩 -->
      <div class="carousel-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <!-- 主体内容 , 覆盖在轮播图上的内容 -->
      <div class="position-absolute top-50 start-50 translate-middle text-center text-white w-100 px-3 z-2">
        <strong class="display-2">欢迎来到网络部</strong>
        <center>
          <hr class="col-1 text-warning strong" style="border-top-width: 4px; opacity: 0.8" />
        </center>
        <p class="mt-4" style="opacity: 0.75">
          网络部全名 “ 海口市第四中学团委学生会网络管理部 ”，隶属于 海口市第四中学团委学生会。
        </p>
        <noscript>该网页必须启用JavaScript才能正常运行！</noscript>
        <a id="加入我们" href="#members" class="btn btn-outline-warning text-white"
          style="border-width: 0.2rem; border-radius: 25px">
          <div class="p-2 ms-2 me-2">加入我们</div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { heroSlides } from '@/assets/data/heroData'

const slides = heroSlides
</script>

<style scoped>
.carousel-overlay {
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.7) 100%);
  pointer-events: none;
}

.z-2 {
  z-index: 2;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .display-2 {
    font-size: 2rem !important;
  }

}

@media (max-width: 576px) {
  .display-2 {
    font-size: 1.5rem !important;
  }

  .btn {
    border-width: 0.1rem !important;
    border-radius: 20px !important;
  }
}
</style>
