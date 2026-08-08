<!-- src/components/Sections/MembersSection.vue -->
<template>
  <section id="members" class="members-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">骨干成员</h2>
      </div>

      <div class="members-container">
        <div v-for="yearGroup in groupedMembers" :key="yearGroup.year" class="year-group">
          <div class="year-header">
            <h3 class="year-title">{{ yearGroup.yearTitle }}</h3>
          </div>
          <div class="members-grid">
            <div
              v-for="(member, index) in yearGroup.members"
              :key="member.name"
              class="member-item"
              :style="{ '--delay': `${index * 0.05}s` }"
            >
              <MemberCard :member="member" :is-legacy="yearGroup.isLegacy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { membersData, type Member } from '@/assets/data/membersData'
import MemberCard from '@/components/UI/MemberCard.vue'

interface YearGroup {
  year: string
  yearTitle: string
  isLegacy: boolean
  members: Member[]
}

const groupedMembers = computed<YearGroup[]>(() => {
  const years = Object.keys(membersData).filter((key) => {
    const data = membersData[key]
    return data && data.length > 0
  }) as (keyof typeof membersData)[]

  const sortedYears = years.sort((a, b) => {
    if (a === 'legacy') return 1
    if (b === 'legacy') return -1
    return parseInt(b) - parseInt(a)
  })

  return sortedYears.map((year) => ({
    year,
    yearTitle: year === 'legacy' ? '往届骨干' : `${year}届骨干`,
    isLegacy: year === 'legacy',
    members: membersData[year] as Member[],
  }))
})
</script>

<style scoped>
.members-section {
  background: #1a1a1a;
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 2rem;
  color: #f8f9fa;
  margin: 0;
}

.members-container {
  max-width: 900px;
  margin: 0 auto;
}

.year-group {
  margin-bottom: 2rem;
}

.year-group:last-child {
  margin-bottom: 0;
}

.year-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.year-title {
  font-size: 1.1rem;
  color: #adb5bd;
  margin: 0;
  font-weight: 500;
}

.members-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.member-item {
  animation: fadeIn 0.3s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .members-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .year-group {
    margin-bottom: 1.5rem;
  }
}
</style>