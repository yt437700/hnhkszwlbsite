<template>
  <section class="positions-section" id="部门内岗位">
    <div class="positions-container">
      <div class="positions-header">
        <h2 class="positions-title">部门内岗位</h2>
        <p class="positions-subtitle">POSITIONS</p>
      </div>

      <div class="positions-layout">
        <div class="positions-sidebar">
          <div class="positions-list">
            <button
              v-for="(position, index) in positionsData"
              :key="position.id"
              class="position-item"
              :class="{ active: activeId === position.id }"
              @click="activeId = position.id"
            >
              <span class="position-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="position-name">{{ position.title }}</span>
              <i class="bi bi-arrow-right position-arrow"></i>
            </button>
          </div>
        </div>

        <div class="positions-detail" ref="detailRef">
          <Transition name="fade-slide" mode="out-in">
            <div :key="activePosition.id" class="detail-content">
              <div class="detail-header">
                <div class="detail-title-wrap">
                  <span class="detail-number">{{ String(positionsData.indexOf(activePosition) + 1).padStart(2, '0') }}</span>
                  <h3 class="detail-title">{{ activePosition.title }}</h3>
                  <p class="detail-subtitle">{{ activePosition.subtitle }}</p>
                </div>
                <i :class="activePosition.icon" class="detail-icon"></i>
              </div>

              <div class="detail-body">
                <p class="detail-description">{{ activePosition.description }}</p>

                <div class="detail-section">
                  <h4 class="section-label">核心要求</h4>
                  <ul class="requirements-list">
                    <li v-for="(req, index) in activePosition.requirements" :key="index">
                      <i class="bi bi-check2"></i>
                      <span>{{ req }}</span>
                    </li>
                  </ul>
                </div>

                <div class="detail-section">
                  <h4 class="section-label">技能标签</h4>
                  <div class="skills-tags">
                    <span v-for="(skill, index) in activePosition.skills" :key="index" class="skill-tag">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { positionsData } from '@/assets/data/positionsData'

const activeId = ref(positionsData[0]?.id || 'director')
const detailRef = ref<HTMLElement>()

const activePosition = computed(() => {
  return positionsData.find(p => p.id === activeId.value) ?? positionsData[0]!
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 }
  )

  if (detailRef.value) {
    observer.observe(detailRef.value)
  }
})
</script>

<style scoped>
.positions-section {
  background: #1a1a1a;
  padding: 5rem 0;
  min-height: 1vh;
}

.positions-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.positions-header {
  margin-bottom: 4rem;
}

.positions-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.positions-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  letter-spacing: 0.2em;
}

.positions-layout {
  display: flex;
  gap: 3rem;
}

.positions-sidebar {
  flex: 0 0 320px;
}

.positions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.position-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.position-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
}

.position-item.active {
  background: rgba(0, 123, 255, 0.15);
  border-color: #007bff;
  color: #fff;
}

.position-number {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  font-family: monospace;
}

.position-item.active .position-number {
  color: #007bff;
}

.position-name {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
}

.position-arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: #007bff;
}

.position-item.active .position-arrow {
  opacity: 1;
  transform: translateX(0);
}

.positions-detail {
  flex: 1;
  min-height: 400px;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.positions-detail.visible {
  opacity: 1;
  transform: translateX(0);
}

.detail-content {
  min-height: 380px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-number {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #007bff;
  font-family: monospace;
  margin-bottom: 0.5rem;
}

.detail-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.5rem 0;
}

.detail-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.detail-icon {
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.2);
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.requirements-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.requirements-list i {
  color: #28a745;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.skill-tag:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 992px) {
  .positions-section {
    padding: 3rem 0;
  }

  .positions-layout {
    flex-direction: column;
  }

  .positions-sidebar {
    flex: none;
    width: 100%;
  }

  .positions-list {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .position-item {
    flex: 1 1 calc(50% - 0.25rem);
    min-width: 200px;
  }

  .positions-detail {
    min-height: auto;
  }
}

@media (max-width: 576px) {
  .positions-container {
    padding: 0 1rem;
  }

  .positions-title {
    font-size: 2rem;
  }

  .position-item {
    flex: 1 1 100%;
    padding: 1rem;
  }

  .detail-content {
    padding: 1.5rem;
  }

  .detail-title {
    font-size: 1.5rem;
  }
}
</style>