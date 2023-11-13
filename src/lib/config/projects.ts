export type Project = {
  id: string
  name: string
  tags?: string[]
  feature?: string
  description?: string
  img: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'urara',
    name: 'NYK Failures',
    tags: ['Python', 'R', 'Data Science'],
    description:
      "Exploring the failures my favourite NBA team, the New York Knicks",
    feature: 'Svelte',
    img: 'https://raw.githubusercontent.com/danielliu2707/images/main/knicks.webp?token=GHSAT0AAAAAACKGCJXQTDGN6YSBABR2MCSQZKRN7GA',
    link: 'https://github.com/danielliu2707/NYK_Failures'
  }
]