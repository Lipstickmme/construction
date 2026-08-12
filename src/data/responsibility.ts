import { images, type ImageSlot } from './images'

export type ResponsibilitySection = {
  heading: string
  /** Rendered as separate paragraphs. */
  paragraphs: string[]
}

export type ResponsibilityPage = {
  slug: string
  title: string
  image: ImageSlot
  intro?: string
  sections: ResponsibilitySection[]
}

export const responsibilityContent: ResponsibilityPage[] = [
  {
    slug: 'csr',
    title: 'Corporate Social Responsibility',
    image: images.responsibilityCsr,
    sections: [
      {
        heading: 'Corporate Social Responsibility',
        paragraphs: [
          'AtlasBridge Construction is proud to drive positive environmental and social change within our organization and our world. Together they represent a company founded on talent, innovation and celebration of the individual. We recognize that as our company grows, so do our responsibilities, and welcome the opportunity to do more. We believe that sound environmental and social policies are both ethically correct and fiscally responsible. To that end, we are committed to improving the way we work in order to better the world in which we live.',
          'To underline and expand upon these far-reaching commitments, we are pleased to present our corporate social responsibility strategy, which encompasses significant, measurable goals across a range of important environmental and social sustainability issues.',
          'Our corporate social responsibility strategy is divided into three areas: our people, our communities and our planet — each with its own targets, owners and annual reporting line.',
        ],
      },
    ],
  },
  {
    slug: 'diversity-and-inclusion',
    title: 'Diversity & Inclusion',
    image: images.responsibilityDiversity,
    sections: [
      {
        heading: 'Who we are & our pillars',
        paragraphs: [
          'Our commitment is supported by three pillars: Culture, Talent and Community.',
        ],
      },
      {
        heading: 'Who we are',
        paragraphs: [
          'Diversity and inclusion are embedded in the DNA of AtlasBridge Construction, we foster an inclusive environment where employees and customers of diverse backgrounds are respected, valued and celebrated. We are proud of our commitment to diversity, equality and inclusion, and will continue to advance these principles through meaningful short and long term actions across the globe. Our doors are open to all.',
        ],
      },
      {
        heading: 'Culture',
        paragraphs: [
          'Our commitment to diversity extends beyond representation. We are building an inclusive space where all employees have the opportunity to realize their full potential and excel, while contributing to our success in a meaningful way.',
        ],
      },
      {
        heading: 'Talent',
        paragraphs: [
          'We recruit, develop and promote on merit, and we measure whether we are getting that right. Hiring panels are mixed, pay bands are published internally, and progression criteria are written down rather than inferred.',
        ],
      },
      {
        heading: 'Community',
        paragraphs: [
          'We invest in the communities our projects sit in — apprenticeships, school outreach and supplier contracts awarded locally, tracked and reported per project.',
        ],
      },
    ],
  },
  {
    slug: 'sustainability',
    title: 'Sustainability',
    image: images.responsibilitySustainability,
    sections: [
      {
        heading: 'Sustainability',
        paragraphs: [
          'We continue to work together to make a difference and improve the quality of life in the hundreds of our communities we serve from coast to coast. We believe a commitment to community is fundamental to sustaining our success and we encourage our employees, franchisees and affiliates to participate in enhancing the well-being of the communities in which they live and work.',
          'On site that means lower-carbon mixes, electrified plant where the grid allows, and material reuse planned at design stage rather than salvaged at demolition. We publish our environmental performance annually, using the same numbers we report to our clients and regulators.',
        ],
      },
    ],
  },
]

export const findResponsibilityPage = (slug: string) =>
  responsibilityContent.find((page) => page.slug === slug)
