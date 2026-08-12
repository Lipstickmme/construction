import { images, type ImageSlot } from './images'

export type HeroSlide = {
  id: string
  /** First half of the headline, rendered white. */
  titleLead: string
  /** Second half, rendered in brand gold. */
  titleAccent: string
  body: string
  image: ImageSlot
}

/** Eyebrow above every slide's headline. */
export const heroEyebrow = 'Construction services'

export const heroSlides: HeroSlide[] = [
  {
    id: 'solutions',
    titleLead: 'Construction',
    titleAccent: 'Solutions',
    body: 'From sustainable infrastructure to smart cities, we create spaces that adapt, inspire, and connect communities.',
    image: images.hero1,
  },
  {
    id: 'dreams',
    titleLead: 'Building',
    titleAccent: 'your dreams.',
    body: 'Honoring architectural vision, delivers exceptional execution and outstanding client services.',
    image: images.hero2,
  },
  {
    id: 'future',
    titleLead: 'Building',
    titleAccent: 'the future.',
    body: 'Honoring architectural vision, delivers exceptional execution and outstanding client services.',
    image: images.hero3,
  },
]
