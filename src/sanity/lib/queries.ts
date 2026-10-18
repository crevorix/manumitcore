import { groq } from 'next-sanity'

export const roadmapQuery = groq`*[_type == "roadmapPhase"] | order(phase asc) {
  phase,
  title,
  quarter,
  status,
  icon,
  summary,
  milestones,
  highlight
}`

export const faqQuery = groq`*[_type == "faqEntry"] | order(order asc) {
  category,
  question,
  answer,
  order
}`

// `active != false` keeps campaigns created before the toggle existed visible.
// asset->url resolves the image to a full cdn.sanity.io URL, so no image-url
// helper package is needed.
export const fundraisersQuery = groq`*[_type == "fundraiser" && active != false] | order(order asc) {
  title,
  description,
  gofundmeUrl,
  order,
  "imageUrl": image.asset->url
}`
