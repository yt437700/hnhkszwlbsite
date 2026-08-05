<template>

  <Navbar />


  <div class="compare-page">
    <div class="container py-5">
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold">我们 vs 学校"专业技术老师"</h1>
        <p class="lead text-muted mt-3">为什么选择网络部？</p>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered table-striped align-middle">
          <thead class="table-dark">
            <tr>
              <th scope="col" class="text-center" style="width: 20%">对比项目</th>
              <th scope="col" class="text-center" style="width: 40%">🎉 我们（网络部）</th>
              <th scope="col" class="text-center" style="width: 40%">🏫 学校"专业技术老师"</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fw-bold text-center">人员规模</td>
              <td>
                <span class="badge bg-success fs-6">年平均活跃 10+ 人</span>
                <p class="mt-2 mb-0 text-muted">成员众多，人员充足，可灵活调配</p>
              </td>
              <td>
                <span class="badge bg-secondary fs-6">少于 10 人</span>
                <p class="mt-2 mb-0 text-muted">人员固定，可能有缺席、无法操作等风险</p>
              </td>
            </tr>
            <tr>
              <td class="fw-bold text-center">技术水平</td>
              <td>
                <span class="badge bg-success fs-6">技术年年更新</span>
                <p class="mt-2 mb-0 text-muted">自主学习新技术，紧跟行业发展，持续提升</p>
              </td>
              <td>
                <span class="badge bg-warning text-dark fs-6">技术方案较老</span>
                <p class="mt-2 mb-0 text-muted">采用较为早期稳定的技术方案，相对保守</p>
              </td>
            </tr>
            <tr>
              <td class="fw-bold text-center">消息网络</td>
              <td>
                <span class="badge bg-success fs-6">消息网较为广泛</span>
                <p class="mt-2 mb-0 text-muted">与各部门、社团联系紧密，信息渠道畅通</p>
              </td>
              <td>
                <span class="badge bg-secondary fs-6">消息网相对有限</span>
                <p class="mt-2 mb-0 text-muted">主要与学校行政体系对接</p>
              </td>
            </tr>
            <tr>
              <td class="fw-bold text-center">活动经验</td>
              <td>
                <span class="badge bg-success fs-6">活动经验多</span>
                <p class="mt-2 mb-0 text-muted">大部分活动的操作流程由我们掌握并传承给下一届</p>
              </td>
              <td>
                <span class="badge bg-secondary fs-6">活动经验较少</span>
                <p class="mt-2 mb-0 text-muted">参与学校活动的机会相对有限</p>
              </td>
            </tr>
            <tr>
              <td class="fw-bold text-center">传承机制</td>
              <td>
                <span class="badge bg-success fs-6">代代相传</span>
                <p class="mt-2 mb-0 text-muted">完整的交接培训体系，知识经验有效传承</p>
              </td>
              <td>
                <span class="badge bg-secondary fs-6">相对固定</span>
                <p class="mt-2 mb-0 text-muted">人员更替较少，传承方式较为单一</p>
              </td>
            </tr>
            <tr>
              <td class="fw-bold text-center">年级活动通知</td>
              <td>
                <span class="badge bg-success fs-6">优先获取</span>
                <p class="mt-2 mb-0 text-muted">老师举办年级活动时会优先通知我们，确保第一时间响应</p>
              </td>
              <td>
                <span class="badge bg-secondary fs-6">直接组织</span>
                <p class="mt-2 mb-0 text-muted">需自行安排设备操作人员，通知渠道相对单一</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center mt-5">
        <h2 class="fw-bold mb-4">选择网络部，体验更多可能！</h2>
        <a href="/" class="btn btn-primary btn-lg">
          <i class="bi bi-house-fill me-2"></i>返回首页
        </a>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup lang="ts">

import Navbar from '@/components/Layout/Navbar.vue'
import Footer from '@/components/Layout/Footer.vue'
</script>

<style scoped>
.compare-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding-top: 80px;
}

.table {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.table thead th {
  vertical-align: middle;
  font-size: 1.1rem;
}

.badge {
  padding: 8px 16px;
}

@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }

  .table th,
  .table td {
    font-size: 0.9rem;
  }
}
</style>















































































<!-- 根据学校要求 -->
<!-- 新校长对活动是要求变严格，故按照要求更新文档 -->
<!-- 说是怕我们弄坏设备，其实这些老旧设备                   -->
<!-- 都服役了好几年，都不带换的 -->
<!-- 坏了，保修也不修 -->
<!-- 直接从源头解决提出问题的人 -->
<!-- 真有意思 -->