<script lang="ts">
  export let posts: any[]

  function formatDate(date: string): string {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
</script>

{#if posts.length > 0}
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Featured Posts</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each posts.slice(0, 3) as post}
        <a
          href={post.path}
          class="card bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 hover:shadow-xl transition-all duration-300 rounded-box overflow-hidden">
          <div class="card-body p-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-primary badge-sm">Featured</span>
              <span class="text-sm text-base-content/60">{formatDate(post.published ?? post.created)}</span>
            </div>
            <h3 class="text-xl font-bold mb-2">{post.title ?? post.path.slice(1)}</h3>
            {#if post.summary}
              <p class="text-base-content/70 text-sm line-clamp-3">{post.summary}</p>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}
