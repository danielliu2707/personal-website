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
    id: 'positionn',
    name: 'Positionn',
    tags: ['Python', 'Machine Learning', 'Streamlit'],
    description:
      "An app that predicts your ideal basketball position and finds your NBA twin! 🏀",
    feature: '',
    img: 'https://raw.githubusercontent.com/danielliu2707/positionn/refs/heads/main/img/positionn-logo.png',
    link: 'https://github.com/danielliu2707/positionn'
  },
  {
    id: 'nykfailures',
    name: 'NYK Failures',
    tags: ['Python', 'R', 'EDA'],
    description:
      "Uncovering and addressing the New York Knicks' struggles while providing actionable solutions for the future. 🏀",
    feature: '',
    img: 'https://raw.githubusercontent.com/danielliu2707/personal_website/main/urara/assets/knicks.png',
    link: 'https://github.com/danielliu2707/NYK_Failures'
  },
  {
    id: 'tunebuild',
    name: 'TuneBuild',
    tags: ['Python', 'Machine Learning', 'Flask'],
    description:
      "An App that generates Spotify playlists tailored to your music taste. 🎶",
    feature: '',
    img: 'https://i.ibb.co/tpCD7t3/logo.png',
    link: 'https://github.com/danielliu2707/TuneBuild/tree/main'
  }
]

