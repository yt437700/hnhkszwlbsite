<!-- src/components/Sections/ServiceSection.vue -->
<template>
  <section id="服务范围" class="bg-white py-5">
    <div class="container">
      <!-- 标题区域 -->
      <div class="text-center mb-5">
        <h2 class="display-5 fw-bold position-relative d-inline-block mb-3">
          <span
            class="position-absolute top-50 start-0 translate-middle-y w-25 border-top border-2 border-warning opacity-75"
          ></span>
          <span class="px-3">范围</span>
          <span
            class="position-absolute top-50 end-0 translate-middle-y w-25 border-top border-2 border-warning opacity-75"
          ></span>
        </h2>
        <p class="lead text-muted">承办班级、年级、乃至校级和外来的活动</p>
      </div>

      <!-- 服务范围卡片 -->
      <div class="row g-4">
        <div v-for="(service, index) in servicesData" :key="index" class="col-lg-4 col-md-6">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <i :class="service.icon" class="fs-4 text-primary me-3"></i>
                <h4 class="mb-0 fw-bold">{{ service.title }}</h4>
              </div>
              <hr class="my-3 border-warning opacity-75" style="border-top-width: 3px" />
              <p class="card-text">{{ service.description }}</p>
              <div class="mt-3">
                <span
                  v-for="(badge, badgeIndex) in service.badges"
                  :key="badgeIndex"
                  class="badge bg-light text-dark border me-2"
                >
                  {{ badge }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 预留空位保持布局平衡 -->
        <div class="col-lg-4 col-md-6">
          <div class="card h-100 border-0 bg-transparent shadow-none">
            <div class="card-body d-flex align-items-center justify-content-center">
              <div class="text-center">
                <i class="bi bi-plus-circle-fill fs-1 text-muted opacity-25"></i>
                <p class="mt-2 text-muted">期待更多服务可能</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { servicesData } from '@/assets/data/servicesData'
</script>
