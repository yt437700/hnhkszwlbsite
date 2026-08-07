// src/assets/data/servicesData.ts
export interface ServiceItem {
  title: string
  description: string
  tags: string[]
}

export const servicesData: ServiceItem[] = [
  {
    title: '班级活动',
    description: '在经过班主任（或相关负责人）与主管领导申请后，在小礼堂进行活动排练，使用舞台，更接近真实演出时的场景。',
    tags: ['小礼堂', '舞台排练'],
  },
  {
    title: '年级会议',
    description: '场地承办军训开幕式、表彰大会、年级会议、文化教育、级部学生会会议等。',
    tags: ['会议', '表彰', '军训'],
  },
  {
    title: '校级活动',
    description: '曾承办校庆、全体教职工会议、各级会议/学习等校级重要活动。',
    tags: ['校庆', '教职工会议'],
  },
  {
    title: '外来活动',
    description: '承办他校/组织的各类典礼、晚会、节日庆典等；曾承办武警海口支队的文艺汇演等活动。',
    tags: ['外校活动', '文艺汇演'],
  },
]