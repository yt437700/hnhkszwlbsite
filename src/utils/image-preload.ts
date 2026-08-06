import { heroSlides } from '@/assets/data/heroData'
import { galleryData } from '@/assets/data/galleryData'
import { workData } from '@/assets/data/workData'
import { membersData } from '@/assets/data/membersData'

export function getHeroImages(): string[] {
    return heroSlides.map(slide => slide.image).filter(Boolean)
}

export function getPreloadImages(): string[] {
    const urls = new Set<string>()

    galleryData.forEach(item => {
        if (item.preview) urls.add(item.preview)
    })

    workData.forEach(item => {
        if (item.image) urls.add(item.image)
    })

    Object.values(membersData).forEach(yearList => {
        yearList.forEach(member => {
            if (member.avatar) urls.add(member.avatar)
        })
    })

    return Array.from(urls)
}