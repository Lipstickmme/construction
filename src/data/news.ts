import { images, type ImageSlot } from './images'

export type NewsPost = {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: ImageSlot
}

/**
 * The reference's Latest News carousel had no posts published at capture
 * time, so these are placeholders with the right shape. Replace them (or wire
 * this up to a CMS) once there is real editorial to show.
 */
export const latestNews: NewsPost[] = [
  {
    id: 'bridge-deck-replacement',
    title: 'Bridge deck replacement completed ahead of schedule',
    excerpt:
      'Staged night closures kept the crossing open through the works, returning the deck to full load capacity three weeks early.',
    date: 'June 2025',
    category: 'Infrastructure',
    image: images.newsOne,
  },
  {
    id: 'low-carbon-concrete',
    title: 'Low-clinker mixes now standard across our sites',
    excerpt:
      'A year of trial pours gave us the test data to move to lower-carbon concrete without changing the programme or the spec.',
    date: 'May 2025',
    category: 'Sustainability',
    image: images.newsTwo,
  },
  {
    id: 'apprenticeship-intake',
    title: 'Largest apprenticeship intake in the company’s history',
    excerpt:
      'Twenty-four apprentices join across formwork, plant and site engineering, each paired with a supervising engineer from day one.',
    date: 'April 2025',
    category: 'Careers',
    image: images.newsThree,
  },
]
