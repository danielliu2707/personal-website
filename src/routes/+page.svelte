<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { posts as storedPosts, tags as storedTags } from '$lib/stores/posts'
  import { title as storedTitle } from '$lib/stores/title'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Profile from '$lib/components/index_profile.svelte'
  import FeaturedPosts from '$lib/components/featured_posts.svelte'
  import Highlights from '$lib/components/highlights.svelte'
  import LatestPosts from '$lib/components/latest_posts.svelte'
  import { highlights } from '$lib/config/highlights'

  let allPosts: Urara.Post[]
  let allTags: string[]
  let loaded: boolean
  let [posts, tags]: [Urara.Post[], string[]] = [[], []]

  storedTitle.set('')

  $: storedPosts.subscribe(storedPosts => (allPosts = storedPosts.filter(post => !post.flags?.includes('unlisted'))))

  $: storedTags.subscribe(storedTags => (allTags = storedTags as string[]))

  $: featuredPosts = allPosts.filter(post => post.flags?.includes('featured')).slice(0, 3)

  $: if (tags) {
    posts = !tags ? allPosts : allPosts.filter(post => tags.every(tag => post.tags?.includes(tag)))
    if (browser && window.location.pathname === '/')
      goto(tags.length > 0 ? `?tags=${tags.toString()}` : `/`, { replaceState: true })
  }

  onMount(() => {
    if (browser) {
      if ($page.url.searchParams.get('tags')) tags = $page.url.searchParams.get('tags')?.split(',') ?? []
      loaded = true
    }
  })
</script>

<Head />

<div class="max-w-6xl mx-auto px-4 md:px-8">
  <!-- Hero Section -->
  <Profile />

  <!-- Featured Posts Section -->
  {#if featuredPosts.length > 0}
    <div class="pt-8 md:pt-12 border-t border-base-content/10">
      <FeaturedPosts posts={featuredPosts} />
    </div>
  {/if}

  <!-- Highlights Section -->
  <div class="pt-12 md:pt-16 border-t border-base-content/10">
    <Highlights {highlights} />
  </div>

  <!-- Latest Posts Section -->
  <div class="pt-12 md:pt-16">
    <LatestPosts posts={allPosts} limit={4} />
  </div>

  <!-- Footer -->
  <div class="mt-20 pt-12 border-t border-base-content/10">
    <Footer />
  </div>
</div>
