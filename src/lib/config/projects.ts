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
    id: 'nykfailures',
    name: 'NYK Failures',
    tags: ['Python', 'R', 'Data Science'],
    description:
      "Uncovering and addressing the New York Knicks' decade-long struggles while providing actionable solutions for the future. 🏀",
    feature: '',
    img: 'https://raw.githubusercontent.com/danielliu2707/personal_website/main/urara/assets/knicks.png',
    link: 'https://github.com/danielliu2707/NYK_Failures'
  },
  {
    id: 'tunebuild',
    name: 'TuneBuild',
    tags: ['Python', 'Data Science', 'Machine Learning'],
    description:
      "TuneBuild is an application that generates Spotify playlists tailored to your music taste. 🎶",
    feature: '',
    img: 'https://i.ibb.co/tpCD7t3/logo.png',
    link: 'https://github.com/danielliu2707/TuneBuild/tree/main'
  }
]

