<!-- src/components/Sections/GallerySection.vue -->
<template>
  <section class="gallery-section" id="活动实拍">
    <div class="container">
      <div class="section-header">
        <h2>活动实拍</h2>
        <p>来自一些奇妙的拍摄者，记录我们工作的精彩瞬间</p>
      </div>

      <!-- 筛选按钮 -->
      <div class="gallery-filter">
        <button class="filter-btn" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">
          所有照片
        </button>
        <button class="filter-btn" :class="{ active: activeFilter === 'event' }" @click="activeFilter = 'event'">
          活动现场
        </button>
        <button class="filter-btn" :class="{ active: activeFilter === 'operation' }"
          @click="activeFilter = 'operation'">
          设备操作
        </button>
        <button class="filter-btn" :class="{ active: activeFilter === 'team' }" @click="activeFilter = 'team'">
          团队合照
        </button>
      </div>

      <!-- 瀑布流布局 -->
      <div class="waterfall-grid">
        <div v-for="item in filteredGallery" :key="item.id" class="waterfall-item">
          <GalleryCard :item="item" />
        </div>
      </div>
    </div>

    <!-- 图片模态框 -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content bg-dark">
          <div class="modal-header border-0 bg-dark text-white">
            <h5 class="modal-title" id="imageModalTitle">图片预览</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0 position-relative d-flex justify-content-center align-items-center"
            style="min-height: calc(100vh - 150px);">
            <!-- 加载状态 -->
            <div id="imgLoading"
              class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark"
              style="display: none; z-index: 10;">
              <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">加载中...</span>
              </div>
            </div>

            <!-- 图片容器 -->
            <div class="d-flex justify-content-center align-items-center w-100 h-100 position-relative">
              <img id="modalImage" class="img-fluid" alt="预览图片"
                style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
          </div>
          <div class="modal-footer border-0 bg-dark text-white justify-content-between">
            <!-- 上一张按钮 -->
            <button type="button" class="btn btn-outline-light prev-btn">
              <i class="bi bi-arrow-left-circle me-2"></i>上一张
            </button>

            <!-- 图片信息 -->
            <div class="text-center flex-grow-1 mx-3">
              <h4 id="modalImageTitle" class="mb-1 fs-5"></h4>
              <p id="modalImageDescription" class="text-light mb-0 small opacity-75"></p>
            </div>

            <!-- 下一张按钮 -->
            <button type="button" class="btn btn-outline-light next-btn">
              下一张<i class="bi bi-arrow-right-circle ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { galleryData } from '@/assets/data/galleryData'
import GalleryCard from '@/components/UI/GalleryCard.vue'
import { initGallery } from '@/utils/gallery'

const activeFilter = ref('all')

const filteredGallery = computed(() => {
  if (activeFilter.value === 'all') {
    return galleryData
  }
  return galleryData.filter((item) => item.category === activeFilter.value)
})

onMounted(() => {
  // 初始化图片画廊功能，包括模态框
  initGallery()
})
</script>

// ... existing code ...
<style scoped>
.gallery-section {
  padding: 5rem 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-header p {
  color: #6c757d;
  font-size: 1.1rem;
}

.gallery-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-btn {
  background: transparent;
  border: 2px solid #dee2e6;
  color: #6c757d;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #007bff;
  color: #007bff;
}

.filter-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.waterfall-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* 模态框自定义样式 */
:deep(.modal-fullscreen .modal-content) {
  border-radius: 0;
}

:deep(.modal-fullscreen .modal-body) {
  overflow: hidden;
}

:deep(.modal-fullscreen img) {
  transition: transform 0.3s ease-in-out;
}

:deep(.modal-fullscreen img:hover) {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .waterfall-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .gallery-filter {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  :deep(.modal-footer) {
    flex-direction: column;
    gap: 1rem;
  }

  :deep(.modal-footer .btn) {
    width: 100%;
  }
}
</style>