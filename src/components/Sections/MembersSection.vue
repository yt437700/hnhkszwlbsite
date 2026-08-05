<!-- src/components/Sections/MembersSection.vue -->
<template>
  <section id="members" class="py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center mb-4">
        <div class="col-lg-8 text-center">
          <h2 class="display-5 fw-bold mb-3">骨干成员</h2>
          <p class="lead text-muted">网络部的核心团队</p>
        </div>
      </div>

      <template v-for="year in sortedYears" :key="year">
        <div class="row mb-4">
          <div class="col-12">
            <h5 class="text-center border-bottom pb-2 mb-4">{{ getYearTitle(year) }}</h5>
          </div>
          <template v-if="year === 'legacy'">
            <div v-for="member in membersData[year]" :key="member.name" class="col-auto mb-3">
              <div class="text-center">
                <img
                  :data-src="member.avatar || '/assets/images/avatar/default.jpg'"
                  class="lazyload rounded-circle img-thumbnail border-warning border-2 mb-2"
                  width="84"
                  height="84"
                  :alt="member.name"
                />
                <h6 class="fw-bold mb-1 small">{{ member.name }}</h6>
                <p class="text-muted small mb-0">{{ member.position }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="member in membersData[year]" :key="member.name" class="col mb-3">
              <MemberCard :member="member" />
            </div>
          </template>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { membersData } from '@/assets/data/membersData'
import MemberCard from '@/components/UI/MemberCard.vue'

const sortedYears = computed(() => {
  const years = Object.keys(membersData).filter((key) => {
    if(membersData[key])
    return membersData[key]?.length > 0
  })
  return years.sort((a, b) => {
    if (a === 'legacy') return 1
    if (b === 'legacy') return -1
    return parseInt(b) - parseInt(a)
  })
})

const getYearTitle = (year: string) => {
  if (year === 'legacy') return '往届骨干'
  return `${year}届骨干`
}
</script>
