// svelte adapter
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
// svelte preprocessor
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import { vitePreprocess } from '@sveltejs/kit/vite'

const adapter = {
  auto: adapterAuto(),
  node: adapterNode(),
  static: adapterStatic({
    pages: 'build',
    assets: 'build',
    fallback: undefined
  })
}

/** @type {import("@svletejs/kit".Config)} */
export default {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],
  kit: {
    adapter: 
      process.env.ADAPTER
        ? adapter[process.env.ADAPTER.toLowerCase()]
        : adapter['static'],
    prerender: {
      handleMissingId: 'warn',
      handleHttpError: ({ path }) => {
        // Ignore 404 errors for image files during prerender
        if (path.match(/\.(jpg|jpeg|png|gif|webp|avif|JPG)$/i)) {
          return 'ignore'
        }
        // Fail for other errors
        return 'fail'
      }
    },
    csp: {
      mode: 'auto',
      directives: {
        'style-src': ['self', 'unsafe-inline', 'https://giscus.app']
      }
    }
  }
}
