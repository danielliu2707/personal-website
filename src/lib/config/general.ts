import type { ThemeConfig, HeadConfig, HeaderConfig, FooterConfig, DateConfig, FeedConfig } from '$lib/types/general'

export const theme: ThemeConfig = [
  {
    name: 'lemonade',
    text: '🍋 Lemonade'
  },
  {
    name: 'cmyk',
    text: '🖨 Light'
  },
  {
    name: 'night',
    text: '🌃 Night'
  },
  {
    name: 'dracula',
    text: '🧛 Dark'
  },
  {
    name: 'valentine',
    text: '🌸 Valentine'
  },
  {
    name: 'aqua',
    text: '💦 Aqua'
  },
  {
    name: 'synthwave',
    text: '🌃 Synthwave'
  },
  {
    name: 'lofi',
    text: '🎶 Lo-Fi'
  },
  {
    name: 'cupcake',
    text: '🧁 Cupcake'
  },
  {
    name: 'garden',
    text: '🏡 Garden'
  },
  {
    name: 'retro',
    text: '🌇 Retro'
  },
  {
    name: 'black',
    text: '🖤 Black'
  }
]

export const head: HeadConfig = {}

export const header: HeaderConfig = {
  nav: [
    {
      text: 'About Me',
      link: '/about_me'
    },
    {
      text: 'Resume',
      link: '/assets/resume.pdf'
    },
    {
      text: 'Projects',
      link: '/projects'
    },
    {
      text: 'Course Reflections',
      children: [
        {
          text: 'ThoughtSpot SQL',
          link: '/courses/thoughtspot'
        },
        {
          text: 'Databricks SQL',
          link: '/courses/databricks'
        }
      ]
    }
  ]
}

export const footer: FooterConfig = {
  nav: [
    {
      text: 'Linkedin',
      link: 'https://www.linkedin.com/in/daniel-liu-80693a20b/'
    },
    {
      text: 'Github',
      link: 'https://github.com/danielliu2707'
    }
  ]
}

export const date: DateConfig = {
  locales: 'en-US',
  options: {
    year: '2-digit',
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
}

export const feed: FeedConfig = {}
