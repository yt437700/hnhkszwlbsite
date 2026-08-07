<template>
  <section class="work-section" id="我们的工作">
    <div class="work-container">
      <div class="work-header">
        <h2 class="work-title">我们做什么？</h2>
        <p class="work-subtitle">What we do</p>
      </div>

      <div class="work-list">
        <div
          v-for="(work, index) in workData"
          :key="index"
          class="work-item"
          :class="{ 'work-item-reverse': index % 2 === 1 }"
          ref="workItems"
        >
          <div class="work-image-wrapper">
            <img
              :src="work.image"
              :alt="work.alt"
              class="work-image"
              loading="lazy"
            />
          </div>
          <div class="work-content">
            <h3 class="work-item-title">{{ work.title }}</h3>
            <p class="work-item-description">{{ work.description }}</p>
            <div class="work-tags">
              <span v-for="(tag, tagIndex) in work.features" :key="tagIndex" class="work-tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { workData } from '@/assets/data/workData'

const workItems = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  workItems.value.forEach((item) => {
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
.work-section {
  background: #1a1a1a;
  padding: 5rem 0;
}

.work-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.work-header {
  margin-bottom: 4rem;
}

.work-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.work-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.work-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.work-item {
  display: flex;
  align-items: center;
  gap: 3rem;
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.work-item.work-item-reverse {
  flex-direction: row-reverse;
}

.work-item.visible {
  opacity: 1;
}

.work-item.visible .work-image-wrapper {
  opacity: 1;
  transform: translateX(0);
}

.work-item.visible .work-content {
  opacity: 1;
  transform: translateY(0);
}

.work-item:not(.visible) .work-image-wrapper {
  opacity: 0;
  transform: translateX(-30px);
}

.work-item.work-item-reverse:not(.visible) .work-image-wrapper {
  transform: translateX(30px);
}

.work-item:not(.visible) .work-content {
  opacity: 0;
  transform: translateY(30px);
}

.work-image-wrapper {
  flex: 1;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.1s;
}

.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.work-image:hover {
  transform: scale(1.03);
}

.work-content {
  flex: 1;
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.2s;
}

.work-item-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1rem 0;
}

.work-item-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.work-tag {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.work-tag:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 992px) {
  .work-section {
    padding: 3rem 0;
  }

  .work-title {
    font-size: 2rem;
  }

  .work-item,
  .work-item.work-item-reverse {
    flex-direction: column;
    gap: 1.5rem;
  }

  .work-image-wrapper {
    width: 100%;
    flex: none;
  }

  .work-content {
    width: 100%;
  }

  .work-item:not(.visible) .work-image-wrapper,
  .work-item.work-item-reverse:not(.visible) .work-image-wrapper {
    transform: translateY(-20px);
  }
}

@media (max-width: 576px) {
  .work-container {
    padding: 0 1rem;
  }

  .work-title {
    font-size: 1.75rem;
  }

  .work-item-title {
    font-size: 1.5rem;
  }

  .work-tags {
    gap: 0.375rem;
  }

  .work-tag {
    padding: 0.25rem 0.625rem;
    font-size: 0.8125rem;
  }
}
</style>