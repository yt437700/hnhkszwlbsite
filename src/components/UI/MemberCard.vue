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
  padding: 1.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 130px;
}

.member-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.avatar-wrapper {
  width: 64px;
  height: 64px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffc107;
  transition: transform 0.2s;
}

.member-card:hover .avatar {
  transform: scale(1.1);
}

.is-legacy .avatar {
  border-color: #adb5bd;
}

.member-info {
  text-align: center;
}

.member-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.member-position {
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0;
}

@media (max-width: 768px) {
  .member-card {
    padding: 1rem;
    min-width: 110px;
  }

  .avatar-wrapper {
    width: 56px;
    height: 56px;
  }

  .member-name {
    font-size: 0.8rem;
  }

  .member-position {
    font-size: 0.7rem;
  }
}
</style>