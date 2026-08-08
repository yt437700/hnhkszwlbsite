<!-- src/components/Sections/MembersSection.vue -->
<template>
  <section id="members" class="members-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">骨干成员</h2>
        <p class="section-subtitle">Network Department Core Team</p>
      </div>

      <div class="members-container">
        <div v-for="yearGroup in groupedMembers" :key="yearGroup.year" class="year-group">
          <div class="year-header">
            <span class="year-badge">{{ yearGroup.yearTitle }}</span>
          </div>
          <div class="members-grid">
            <div
              v-for="(member, index) in yearGroup.members"
              :key="member.name"
              class="member-item"
              :style="{ '--delay': `${index * 0.1}s` }"
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
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #6c757d;
  font-size: 1rem;
}

.members-container {
  max-width: 1200px;
  margin: 0 auto;
}

.year-group {
  margin-bottom: 3.5rem;
}

.year-group:last-child {
  margin-bottom: 0;
}

.year-header {
  text-align: center;
  margin-bottom: 2rem;
}

.year-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: #ffc107;
  color: #212529;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.25rem;
}

.members-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.member-item {
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .members-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
  }

  .year-group {
    margin-bottom: 2.5rem;
  }

  .members-grid {
    gap: 1rem;
  }
}
</style>