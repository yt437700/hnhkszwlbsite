// src/assets/data/benefitsData.ts
export interface BenefitItem {
  title: string
  description: string
  icon: string
}

export const benefitsData: BenefitItem[] = [
  {
    // 新校长严格管理小礼堂使用，确保安全和规范，不允许随意使用设备
    title: '活动室使用权 (提前申请)',
    description: '经允许后，可使用学校小礼堂作为活动空间，为部门活动提供便利场所。',
    icon: 'bi-house-door-fill',
  },
  {
    title: '技术培训',
    description: '为新成员提供设备操作和技术培训，帮助快速掌握所需技能。',
    icon: 'bi-laptop-fill',
  },
  {
    title: '活动参与机会',
    description: '参与学校各类大型活动的技术支持工作，获得实践经验。',
    icon: 'bi-ticket-perforated-fill',
  },
  {
    title: '团队交流活动',
    description: '参与部门组织的各类交流活动，结识志同道合的伙伴。',
    icon: 'bi-people-fill',
  },
]
