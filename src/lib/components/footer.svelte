<script lang="ts">
  import { site } from '$lib/config/site'
  import { footer as footerConfig } from '$lib/config/general'
  let className: string | undefined = undefined
  export { className as class }
  export let sticky: boolean = false
  export let rounded: boolean = false
</script>

<footer
  id="footer"
  class="footer bg-base-200/50 border-t border-base-content/10 py-12 px-4 md:px-8 {sticky
    ? 'sticky bottom-0 z-0 md:static'
    : ''} {className ?? ''}">
  <div class="w-full max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-center gap-8">
      <!-- Left: Copyright -->
      <div class="text-sm text-base-content/70">
        <p>
          © {new Date().toJSON().substring(0, 4)} {site.author.name}. All rights reserved.
        </p>
      </div>

      <!-- Center: Links -->
      <div class="flex flex-wrap items-center justify-center gap-4 text-sm">
        <a href="/" class="link link-hover text-base-content/70 hover:text-primary transition-colors">
          Home
        </a>
        <span class="text-base-content/30">•</span>
        <a
          href="https://github.com/danielliu2707/personal-website"
          rel="noopener noreferrer external"
          target="_blank"
          class="link link-hover text-base-content/70 hover:text-primary transition-colors">
          Source Code
        </a>
      </div>
    </div>

    <!-- Bottom: Powered by -->
    <div class="mt-8 pt-8 border-t border-base-content/10 text-center">
      <p class="text-xs text-base-content/50">
        Built with
        <a
          href="https://kit.svelte.dev"
          rel="noopener noreferrer external"
          target="_blank"
          class="link link-hover text-primary">
          SvelteKit
        </a>
        and
        <a
          href="https://github.com/importantimport/urara"
          rel="noopener noreferrer external"
          target="_blank"
          class="link link-hover text-primary">
          Urara
        </a>
      </p>
    </div>
  </div>
</footer>
