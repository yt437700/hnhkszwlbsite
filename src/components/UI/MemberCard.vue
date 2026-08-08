<!-- src/components/UI/MemberCard.vue -->
<template>
  <div class="member-card" :class="{ 'is-legacy': isLegacy }">
    <div class="avatar-wrapper">
      <img :src="member.avatar" class="avatar" :alt="member.name" />
    </div>
    <div class="member-info">
      <h4 class="member-name">{{ member.name }}</h4>
      <p class="member-position">{{ member.position }}</p>
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
  padding: 1rem;
  min-width: 100px;
}

.member-card:hover .avatar {
  border-color: #ffc107;
}

.avatar-wrapper {
  width: 56px;
  height: 56px;
  margin-bottom: 0.5rem;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #dee2e6;
  transition: border-color 0.2s;
}

.is-legacy .avatar {
  border-color: #e9ecef;
}

.member-info {
  text-align: center;
}

.member-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #212529;
  margin-bottom: 0.125rem;
  line-height: 1.3;
}

.member-position {
  font-size: 0.7rem;
  color: #6c757d;
  margin: 0;
}

@media (max-width: 768px) {
  .member-card {
    padding: 0.75rem;
    min-width: 80px;
  }

  .avatar-wrapper {
    width: 48px;
    height: 48px;
  }

  .member-name {
    font-size: 0.75rem;
  }

  .member-position {
    font-size: 0.65rem;
  }
}
</style>