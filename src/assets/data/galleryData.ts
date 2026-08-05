// src/assets/data/heroData.ts
export interface Slide {
  image: string
  alt: string
  active?: boolean
}

// 导入图片资源
import slide1 from '@/assets/images/slide/670613988744c.jpg'
import slide2 from '@/assets/images/slide/670613968e908.jpg'
import slide3 from '@/assets/images/slide/670613950c57a.jpg'

export const heroSlides: Slide[] = [
  {
    image: slide1,
    alt: '网络部活动照片',
    active: false,
  },
  {
    image: slide2,
    alt: '网络部工作场景',
    active: true,
  },
  {
    image: slide3,
    alt: '网络部设备操作',
    active: false,
  },
]
// src/assets/data/galleryData.ts
export interface GalleryItem {
  id: string
  title: string
  description: string
  preview: string
  full: string
  category: string
  alt: string
}

// 导入图片资源
import image1Full from '@/assets/images/6706146ba031d.jpg'
import image1Preview from '@/assets/images/preview_6706146ba031d.jpg'
import image2Full from '@/assets/images/67061383c525d.jpg'
import image2Preview from '@/assets/images/preview_67061383c525d.jpg'
import image3Full from '@/assets/images/670613960ec62.jpg'
import image3Preview from '@/assets/images/preview_670613960ec62.jpg'
import image4Full from '@/assets/images/670613950c57a.jpg'
import image4Preview from '@/assets/images/preview_670613950c57a.jpg'
import image5Full from '@/assets/images/67061396b32d7.jpg'
import image5Preview from '@/assets/images/preview_67061396b32d7.jpg'
import image6Full from '@/assets/images/67061381b0bc2.jpg'
import image6Preview from '@/assets/images/preview_67061381b0bc2.jpg'
import image7Full from '@/assets/images/dfc2cb6e-55d2-42ea-803f-27828495ccce.jpg'
import image7Preview from '@/assets/images/preview_dfc2cb6e-55d2-42ea-803f-27828495ccce.jpg'

export const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: '团队合照',
    description: '24届喊楼时网络部23，24，25届的珍贵合照',
    preview: image1Preview,
    full: image1Full,
    category: 'team',
    alt: '网络部合照',
  },
  {
    id: '7',
    title: '团队合照',
    description: '24届阳光体育界晚上社团日活动时网络部26，27，28届的珍贵合照',
    preview: image7Preview,
    full: image7Full,
    category: 'team',
    alt: '网络部合照',
  },
  {
    id: '2',
    title: '校庆活动',
    description: '校庆时的中控台操作现场，保障活动顺利进行',
    preview: image2Preview,
    full: image2Full,
    category: 'event',
    alt: '校庆中控台',
  },
  {
    id: '3',
    title: '校园歌手大赛',
    description: '活动现场的导播与灯控，共同协作创造完美舞台效果',
    preview: image3Preview,
    full: image3Full,
    category: 'operation',
    alt: '导播与灯控',
  },
  {
    id: '4',
    title: '校运会社团日',
    description: '校运会社团日的灯控台操作，为活动增添光彩',
    preview: image4Preview,
    full: image4Full,
    category: 'operation',
    alt: '灯控台',
  },
  {
    id: '5',
    title: '接待外来活动',
    description: '接待外来活动时使用自带设备提供技术支持',
    preview: image5Preview,
    full: image5Full,
    category: 'event',
    alt: '自带设备',
  },
  {
    id: '6',
    title: '设备操作练习',
    description: '使用雾机进行练习时的操作场景，提升团队技能',
    preview: image6Preview,
    full: image6Full,
    category: 'operation',
    alt: '雾机操作',
  },
]
