import type { LayoutLoad } from './$types'
import { injectAnalytics } from '@vercel/analytics/sveltekit'
import { dev } from '$app/environment'

injectAnalytics({ mode: dev ? 'development' : 'production' })

export const prerender = true
export const trailingSlash = 'always'
export const load: LayoutLoad = async ({ url, fetch }) => ({
  path: url.pathname,
  res: await fetch('/posts.json').then(res => res.json())
})
