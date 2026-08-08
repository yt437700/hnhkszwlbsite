<!-- src/components/Sections/MembersSection.vue -->
<template>
  <section id="members" class="members-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">核心成员</h2>
        <p class="section-subtitle">CORE MEMBERS</p>
      </div>

      <div class="members-container">
        <div v-for="yearGroup in groupedMembers" :key="yearGroup.year" class="year-group">
          <div class="year-header">
            <h3 class="year-title">{{ yearGroup.yearTitle }}</h3>
            <span class="year-line"></span>
          </div>
          <div class="members-grid">
            <div
              v-for="(member, index) in yearGroup.members"
              :key="member.name"
              class="member-item"
              :ref="(el) => { if (el) cardRefs.push(el as HTMLElement) }"
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
import { computed, onMounted, onBeforeUpdate, onUnmounted, ref } from 'vue'
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
    yearTitle: year === 'legacy' ? '往届骨干' : `${year}届`,
    isLegacy: year === 'legacy',
    members: membersData[year] as Member[],
  }))
})

const cardRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

onBeforeUpdate(() => {
  cardRefs.value = []
})

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
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  cardRefs.value.forEach((el) => {
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.members-section {
  background: #1a1a1a;
  padding: 5rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.section-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin: 0.75rem 0 0 0;
  letter-spacing: 0.2em;
}

.members-container {
  max-width: 900px;
  margin: 0 auto;
}

.year-group {
  margin-bottom: 3rem;
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
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0.75rem 0;
}

.year-line {
  display: block;
  width: 60px;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 auto;
}

.members-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.member-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.member-item.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .members-section {
    padding: 3rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-subtitle {
    font-size: 0.875rem;
  }

  .year-group {
    margin-bottom: 2rem;
  }

  .members-grid {
    gap: 0.75rem;
  }
}
</style>