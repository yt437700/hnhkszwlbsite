<!-- src/components/UI/MemberCard.vue -->
<template>
  <div class="member-card" :class="{ 'is-legacy': isLegacy }">
    <div class="avatar-wrapper">
      <img :src="member.avatar" class="avatar" :alt="member.name" />
    </div>
    <div class="member-info">
      <h4 class="member-name">{{ member.name }}</h4>
      <p class="member-position">{{ member.position }}</p>
      <p v-if="member.year && member.year !== 'legacy'" class="member-year">{{ member.year }}届</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Member } from '@/assets/data/membersData'

interface Props {
  member: Member
  isLegacy?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  min-width: 110px;
}

.member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.member-card:hover .avatar {
  transform: scale(1.08);
  border-color: rgba(0, 123, 255, 0.6);
}

.avatar-wrapper {
  width: 60px;
  height: 60px;
  margin-bottom: 0.75rem;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.is-legacy .avatar {
  border-color: rgba(255, 255, 255, 0.08);
}

.member-info {
  text-align: center;
}

.member-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.member-position {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.member-year {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0.25rem 0 0 0;
}

@media (max-width: 768px) {
  .member-card {
    padding: 1rem 0.75rem;
    min-width: 85px;
  }

  .avatar-wrapper {
    width: 50px;
    height: 50px;
  }

  .member-name {
    font-size: 0.8rem;
  }

  .member-position {
    font-size: 0.7rem;
  }

  .member-year {
    font-size: 0.65rem;
  }
}
</style>