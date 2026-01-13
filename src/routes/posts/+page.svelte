<script lang="ts">
  import { onMount } from 'svelte'
  import { posts as storedPosts } from '$lib/stores/posts'
  import { title as storedTitle } from '$lib/stores/title'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import LatestPosts from '$lib/components/latest_posts.svelte'

  let allPosts: Urara.Post[]

  storedTitle.set('All Posts')

  $: storedPosts.subscribe(storedPosts => (allPosts = storedPosts.filter(post => !post.flags?.includes('unlisted'))))
</script>

<Head />

<div class="max-w-6xl mx-auto px-4 md:px-8 py-8">
  <h1 class="text-4xl font-bold mb-8">All Posts</h1>
  <LatestPosts posts={allPosts} limit={9999} showHeader={false} showViewAll={false} />
  <div class="mt-16">
    <Footer />
  </div>
</div>
