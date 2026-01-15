export type Project = {
  id: string
  name: string
  tags?: string[]
  feature?: string
  description?: string
  img: string
  github?: string
  demo?: string
  link?: string // Deprecated: use github and demo instead
}

export const projects: Project[] = [
  {
    id: 'positionn',
    name: 'Positionn',
    tags: ['Python', 'Machine Learning', 'Streamlit'],
    description:
      "An app that predicts your ideal basketball position and finds your NBA twin! 🏀",
    feature: '',
    img: '/assets/positionnlogo.png',
    github: 'https://github.com/danielliu2707/positionn',
    demo: '/projects/positionn' // Will be updated later
  },
  {
    id: 'nykfailures',
    name: 'NYK Failures',
    tags: ['Python', 'R', 'EDA'],
    description:
      "Uncovering and addressing the New York Knicks' struggles while providing actionable solutions for the future. 🏀",
    feature: '',
    img: '/assets/nyklogo.png',
    github: 'https://github.com/danielliu2707/NYK_Failures',
    demo: 'https://drive.google.com/file/d/1OBnAP1nrQ0fHDhyn8HT1saRg5REImPkD/view?usp=sharing'
  },
  {
    id: 'tunebuild',
    name: 'TuneBuild',
    tags: ['Python', 'Machine Learning', 'Flask'],
    description:
      "A developer only app that generates Spotify playlists tailored to your music taste. 🎶",
    feature: '',
    img: '/assets/tunebuildlogo.png',
    github: 'https://github.com/danielliu2707/TuneBuild/tree/main',
    demo: '' // Will be updated later
  }
]

