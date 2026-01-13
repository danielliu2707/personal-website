import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'urara-demo.netlify.app',
  title: 'Daniel Liu',
  subtitle: '',
  lang: 'en-US',
  description: '',
  author: {
    avatar: '/assets/pfp.png',
    name: 'Daniel Liu',
  },
  themeColor: '#3D4451'
}
