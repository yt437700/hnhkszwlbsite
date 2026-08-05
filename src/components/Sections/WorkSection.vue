<!-- src/components/Sections/WorkSection.vue -->
<template>
  <section class="bg-white p-4 rounded-4 shadow-sm mt-4 mb-4" id="我们的工作">
    <!-- 标题区域 -->
    <div class="text-center mb-5">
      <h1 class="display-5 fw-bold mb-3 position-relative d-inline-block">
        <span class="px-3">我们做什么？</span>
      </h1>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="d-flex flex-column flex-md-row justify-content-center gap-3 text-muted">
            <span class="d-flex align-items-center">
              <i class="bi bi-check-circle-fill text-warning me-2"></i>教学楼小礼堂活动设备操作
            </span>
            <span class="d-flex align-items-center">
              <i class="bi bi-check-circle-fill text-warning me-2"></i>学校会议室设备操作
            </span>
            <span class="d-flex align-items-center">
              <i class="bi bi-check-circle-fill text-warning me-2"></i>校运会社团日设备辅助
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作内容卡片 -->
    <div class="container">
      <div class="row g-4">
        <div v-for="(work, index) in workData" :key="index" class="col-lg-6">
          <div class="card h-100 border-0 shadow-sm overflow-hidden">
            <div class="row g-0 h-100">
              <div class="col-md-5">
                <img
                  :data-src="work.image"
                  class="lazyload img-fluid h-100 object-fit-cover"
                  :alt="work.alt"
                />
              </div>
              <div class="col-md-7 d-flex align-items-center">
                <div class="card-body p-4">
                  <div class="d-flex align-items-center mb-3">
                    <i :class="work.icon" class="fs-4 text-primary me-3"></i>
                    <h4 class="card-title mb-0 fw-bold">{{ work.title }}</h4>
                  </div>
                  <p class="card-text text-muted">{{ work.description }}</p>
                  <ul class="list-unstyled mt-3">
                    <li
                      v-for="(feature, featureIndex) in work.features"
                      :key="featureIndex"
                      class="mb-2"
                    >
                      <i class="bi bi-check-circle text-success me-2"></i>{{ feature }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { workData } from '@/assets/data/workData'
</script>
