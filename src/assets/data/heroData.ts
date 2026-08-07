// src/assets/data/heroData.ts
export interface Slide {
  image: string
  alt: string
  active?: boolean
}
import heroImage1 from '/public/images/slide/670613968e908.jpg'
import heroImage2 from '/public/images/slide/670613968e908.jpg'
import heroImage3 from '/public/images/slide/670613950c57a.jpg'

export const heroSlides: Slide[] = [
  {
    image: heroImage1,
    alt: '网络部活动照片',
    active: false,
  },
  {
    image: heroImage2,
    alt: '网络部工作场景',
    active: true,
  },
  {
    image: heroImage3,
    alt: '网络部设备操作',
    active: false,
  },
]
