<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { site } from '$lib/config/site'
  import { footer as footerConfig } from '$lib/config/general'
  let className: string | undefined = undefined
  export { className as class }
  export let sticky: boolean = false
  export let rounded: boolean = false

  function openTallyPopup(event: MouseEvent) {
    if (browser) {
      // Check if Tally is loaded and use JavaScript API
      if (typeof window !== 'undefined' && (window as any).Tally) {
        event.preventDefault()
        ;(window as any).Tally.openPopup('q4Gk2Y', {
          alignLeft: true,
          hideTitle: true,
          emoji: {
            text: '👋',
            animation: 'wave'
          },
          autoClose: 3000
        })
      }
    }
  }

  onMount(() => {
    // Wait for Tally script to load if it's not already loaded
    if (browser) {
      const checkTally = () => {
        if ((window as any).Tally) {
          return
        }
        const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]')
        if (!existingScript) {
          const script = document.createElement('script')
          script.src = 'https://tally.so/widgets/embed.js'
          script.async = true
          document.head.appendChild(script)
        }
      }
      checkTally()
      setTimeout(checkTally, 100)
    }
  })
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
        <span class="text-base-content/30">•</span>
        <button
          data-tally-open="q4Gk2Y"
          data-tally-align-left="1"
          data-tally-hide-title="1"
          data-tally-emoji-text="👋"
          data-tally-emoji-animation="wave"
          data-tally-auto-close="3000"
          data-tally-form-events-forwarding="1"
          on:click={openTallyPopup}
          class="link link-hover text-primary hover:text-primary-focus transition-colors bg-transparent border-none p-0 cursor-pointer">
          Feedback
        </button>
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
          class="link link-hover text-base-content/50 hover:text-base-content/70 transition-colors">
          SvelteKit
        </a>
        and
        <a
          href="https://github.com/importantimport/urara"
          rel="noopener noreferrer external"
          target="_blank"
          class="link link-hover text-base-content/50 hover:text-base-content/70 transition-colors">
          Urara
        </a>
      </p>
    </div>
  </div>
</footer>
