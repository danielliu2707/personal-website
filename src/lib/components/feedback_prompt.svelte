<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'

  let showPrompt = false
  let scrollY = 0
  let timeOnPage = 0
  let pageViews = 0
  let startTime = Date.now()
  let pageViewsIncremented = false

  // Engagement criteria - All criteria must be met for the prompt to show
  const MIN_SCROLL_PERCENT = 50 // User has scrolled at least 50% down on at least one page
  const MIN_TIME_SECONDS = 20 // User has been on page for at least 20 seconds
  const MIN_PAGE_VIEWS = 2 // User has visited at least 2 pages

  const STORAGE_KEY = 'feedback-prompt-dismissed'
  const PAGE_VIEWS_KEY = 'feedback-page-views'
  const SCROLLED_KEY = 'feedback-has-scrolled'

  function checkEngagement() {
    if (!browser) return

    // Check if user has dismissed before
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed === 'true') return

    // Increment page views only once per page load
    if (!pageViewsIncremented) {
      const storedViews = localStorage.getItem(PAGE_VIEWS_KEY)
      pageViews = storedViews ? parseInt(storedViews, 10) + 1 : 1
      localStorage.setItem(PAGE_VIEWS_KEY, String(pageViews))
      pageViewsIncremented = true
    } else {
      const storedViews = localStorage.getItem(PAGE_VIEWS_KEY)
      pageViews = storedViews ? parseInt(storedViews, 10) : 1
    }

    // Calculate scroll percentage on current page
    const scrollPercent =
      (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    // If user has scrolled 50% on current page, mark it in localStorage
    if (scrollPercent >= MIN_SCROLL_PERCENT) {
      localStorage.setItem(SCROLLED_KEY, 'true')
    }

    // Check if user has scrolled 50% on at least one page (any page)
    const hasScrolledEnough = localStorage.getItem(SCROLLED_KEY) === 'true'

    // Calculate time on page
    timeOnPage = Math.floor((Date.now() - startTime) / 1000)

    // Check if all criteria are met
    const hasSpentTime = timeOnPage >= MIN_TIME_SECONDS
    const hasViewedPages = pageViews >= MIN_PAGE_VIEWS

    if (hasScrolledEnough && hasSpentTime && hasViewedPages) {
      showPrompt = true
    }
  }

  function dismissPrompt() {
    showPrompt = false
    if (browser) {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
  }

  function openTallyPopup(event: MouseEvent) {
    if (browser) {
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
        // Dismiss after opening
        dismissPrompt()
      }
    }
  }

  function handleScroll() {
    scrollY = window.scrollY || document.documentElement.scrollTop
    
    // Check if user has scrolled 50% on current page and mark it
    const scrollPercent =
      (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    
    if (scrollPercent >= MIN_SCROLL_PERCENT && browser) {
      localStorage.setItem(SCROLLED_KEY, 'true')
    }
    
    if (!showPrompt) {
      checkEngagement()
    }
  }

  onMount(() => {
    if (browser) {
      startTime = Date.now()
      scrollY = window.scrollY || document.documentElement.scrollTop
      
      // Ensure Tally script is loaded
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
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // Check engagement periodically
      const interval = setInterval(() => {
        if (!showPrompt) {
          checkEngagement()
        }
      }, 5000) // Check every 5 seconds

      // Initial check after a delay
      setTimeout(checkEngagement, 10000) // First check after 10 seconds

      return () => {
        window.removeEventListener('scroll', handleScroll)
        clearInterval(interval)
      }
    }
  })

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll)
    }
  })
</script>

<svelte:window bind:scrollY />

{#if showPrompt && browser}
  <div
    class="fixed bottom-6 right-20 md:right-28 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
    style="animation-duration: 300ms;">
    <div
      class="bg-base-100 border-2 border-primary/30 rounded-lg shadow-xl p-4 max-w-xs backdrop-blur">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          <p class="text-sm font-semibold text-base-content mb-1">
            Enjoying the site?
          </p>
          <p class="text-xs text-base-content/70 mb-3">
            Share your feedback to help me improve!
          </p>
          <button
            data-tally-open="q4Gk2Y"
            data-tally-align-left="1"
            data-tally-hide-title="1"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            data-tally-auto-close="3000"
            data-tally-form-events-forwarding="1"
            on:click={openTallyPopup}
            class="btn btn-primary btn-sm text-xs">
            Share Feedback
          </button>
        </div>
        <button
          on:click={dismissPrompt}
          aria-label="Dismiss feedback prompt"
          class="btn btn-ghost btn-xs btn-square text-base-content/50 hover:text-base-content">
          <span class="i-heroicons-outline-x w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: fade-in 0.3s ease-out;
  }
</style>
