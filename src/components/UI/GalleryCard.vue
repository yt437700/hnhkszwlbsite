<!-- src/components/UI/GalleryCard.vue -->
<template>
  <div class="gallery-card">
    <div class="position-relative overflow-hidden">
      <img :data-src="item.preview" class="lazyload gallery-img" :alt="item.alt" />
      <div class="position-absolute top-0 end-0 m-3">
        <span class="badge-category">{{ getCategoryName(item.category) }}</span>
      </div>
    </div>
    <div class="card-info">
      <h4>{{ item.title }}</h4>
      <p>{{ item.description }}</p>
      <button class="view-btn" 
              data-bs-toggle="modal" 
              data-bs-target="#imageModal" 
              :data-title="item.title"
              :data-description="item.description" 
              :data-preview="item.preview" 
              :data-full="item.full"
              :data-category="item.category">
        <i class="bi bi-zoom-in"></i> 查看大图
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryItem } from '@/assets/data/galleryData'

interface Props {
  item: GalleryItem
}

defineProps<Props>()

const getCategoryName = (category: string) => {
  const categoryMap: Record<string, string> = {
    team: '团队合照',
    event: '活动现场',
    operation: '设备操作',
  }
  return categoryMap[category] || '其他'
}

</script>

<style scoped>
.gallery-card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.gallery-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.gallery-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.05);
}

.badge-category {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.card-info {
  padding: 1rem;
}

.card-info h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.card-info p {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.view-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.15s;
}

.view-btn:hover {
  background: #0056b3;
}
</style>
