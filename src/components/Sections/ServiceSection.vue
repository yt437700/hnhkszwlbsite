<!-- src/components/Sections/ServiceSection.vue -->
<template>
  <section id="服务范围" class="service-section">
    <div class="service-container">
      <div class="service-header">
        <h2 class="service-title">服务范围</h2>
        <p class="service-subtitle">Our Service Scope</p>
      </div>

      <div class="service-grid">
        <div
          v-for="(service, index) in servicesData"
          :key="index"
          class="service-item"
          ref="serviceItems"
        >
          <span class="service-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="service-item-title">{{ service.title }}</h3>
          <p class="service-item-description">{{ service.description }}</p>
          <div class="service-tags">
            <span v-for="(tag, tagIndex) in service.tags" :key="tagIndex" class="service-tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { servicesData } from '@/assets/data/servicesData'

const serviceItems = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        } else {
          entry.target.classList.remove('visible')
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  serviceItems.value.forEach((item) => {
    if (item) {
      observer?.observe(item)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.service-section {
  background: #1a1a1a;
  padding: 5rem 0;
}

.service-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.service-header {
  margin-bottom: 4rem;
  text-align: center;
}

.service-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.service-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.service-item {
  padding: 1.5rem 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.service-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.service-item:nth-child(1) {
  transition-delay: 0.1s;
}

.service-item:nth-child(2) {
  transition-delay: 0.2s;
}

.service-item:nth-child(3) {
  transition-delay: 0.3s;
}

.service-item:nth-child(4) {
  transition-delay: 0.4s;
}

.service-number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: #ffc107;
  opacity: 0.5;
  line-height: 1;
  margin-bottom: 1rem;
}

.service-item-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.75rem 0;
}

.service-item-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.25rem 0;
  line-height: 1.6;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-tag {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.service-tag:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .service-section {
    padding: 3rem 0;
  }

  .service-title {
    font-size: 2rem;
  }

  .service-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .service-number {
    font-size: 2.5rem;
  }

  .service-item-title {
    font-size: 1.25rem;
  }
}
</style>