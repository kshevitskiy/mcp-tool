import axios from 'axios'

export interface WodsDTO {
  id: string
  cleanID: string
  title: string
  wodRaw: string
  wodHtml: string
  publishedOn: string
  publishingState: string
  publishingDate: string
  language: string
  translations: {
    en: string
  }
  url: string
  defaultFocalPoint: string
  topicId: string
  modified: string
  modifiedBy: string
  otherHtml: any[]
  media: MediaDTO
  previous: {
    url: string
  }
  next: boolean
  portrait: boolean
  scrollFeaturedMedia: boolean
  active: string
  current: {
    url: string
  }
}

export interface MediaDTO {
  featured: FeaturedDTO[]
  thumbnail: string
  counts: {
    display: number
    raw: number
  }
  arrows: boolean
}

export interface FeaturedDTO {
  raw: string
  thumbnail: string
  portrait: boolean
  captionRaw: string
  focalPoint: string
  display: string
  index: number
  isThumbnail: boolean
}

export const client = axios.create({
  baseURL: 'https://www.crossfit.com',
  headers: {
    Accept: 'application/json',
  },
})

export function getWod({
  year,
  month,
  day,
}: {
  year: string
  month: string
  day: string
}) {
  return client.get<{ wods: WodsDTO }>(`/workout/${year}/${month}/${day}`)
}
