<!-- src/components/Sections/PositionsSection.vue -->
<template>
  <section class="job-section">
    <div class="container">
      <div class="row justify-content-center mb-4">
        <div class="col-lg-10 text-center">
          <h2 class="section-title">部门内岗位</h2>
          <p class="lead text-muted">每个岗位都对应着不同的专业方面，共同组成高效的技术部门</p>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="job-tabs">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs justify-content-center" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'intro' }"
                  @click="activeTab = 'intro'"
                >
                  <i class="bi bi-info-circle me-2"></i>简介
                </button>
              </li>
              <li
                v-for="position in positionsData"
                :key="position.id"
                class="nav-item"
                role="presentation"
              >
                <button
                  class="nav-link"
                  :class="{ active: activeTab === position.id }"
                  @click="activeTab = position.id"
                >
                  <i :class="position.icon" class="me-2"></i>{{ position.title }}
                </button>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content mt-4">
              <!-- 简介标签页 -->
              <div v-if="activeTab === 'intro'" class="tab-pane fade show active">
                <div class="job-card card">
                  <div class="card-body text-center py-5">
                    <i class="bi bi-info-circle job-icon mb-4"></i>
                    <h3 class="card-title">点击上方选项卡查看各岗位详情</h3>
                    <p class="card-text text-muted mt-3">
                      我们由多个专业岗位组成，每个岗位都承担着独特而重要的职责。<br />
                      选择您感兴趣的岗位了解更多信息，探索您最适合的角色。
                    </p>
                    <div class="mt-4">
                      <div class="stats-container">
                        <div class="row">
                          <div class="col-md-3 col-6 mb-3">
                            <div class="stat-value">4+</div>
                            <div class="stat-label">专业岗位</div>
                          </div>
                          <div class="col-md-3 col-6 mb-3">
                            <div class="stat-value">30+<sup>*1</sup></div>
                            <div class="stat-label">部门成员</div>
                          </div>
                          <div class="col-md-3 col-6 mb-3">
                            <div class="stat-value">98%</div>
                            <div class="stat-label">活动成功率</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 岗位详情标签页 -->
              <div
                v-for="position in positionsData"
                :key="position.id"
                class="tab-pane fade"
                :class="{ 'show active': activeTab === position.id }"
              >
                <PositionCard :position="position" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { positionsData } from '@/assets/data/positionsData'
import PositionCard from '@/components/UI/PositionCard.vue'

const activeTab = ref('intro')
</script>

<style scoped>
.job-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.job-tabs .nav-tabs {
  border-bottom: 2px solid #dee2e6;
}

.job-tabs .nav-link {
  color: #6c757d;
  border: none;
  padding: 1rem 1.5rem;
  transition: all 0.3s;
}

.job-tabs .nav-link:hover {
  color: #495057;
  background-color: #f8f9fa;
}

.job-tabs .nav-link.active {
  color: #007bff;
  background-color: white;
  border-bottom: 3px solid #007bff;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
}

.stat-label {
  color: #6c757d;
  font-size: 0.9rem;
}
</style>
