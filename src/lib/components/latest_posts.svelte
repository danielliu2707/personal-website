<script lang="ts">
  export let posts: any[]
  export let limit: number = 4
  export let showHeader: boolean = true
  export let showViewAll: boolean = true

  function formatDate(date: string): { day: string; month: string } {
    const d = new Date(date)
    const day = d.getDate().toString().padStart(2, '0')
    const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    return { day, month }
  }
</script>

{#if posts.length > 0}
  <section class="mb-0">
    {#if showHeader}
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Latest Posts</h2>
        {#if showViewAll}
          <a href="/posts" class="btn btn-primary btn-sm normal-case gap-2 shadow-md hover:shadow-lg transition-all">
            <span>View All</span>
            <span class="i-heroicons-solid-arrow-right" />
          </a>
        {/if}
      </div>
    {/if}
    <div class="space-y-4">
      {#each posts.slice(0, limit) as post}
        {@const date = formatDate(post.published ?? post.created)}
        <a
          href={post.path}
          class="flex gap-6 p-4 rounded-box hover:bg-base-200 transition-colors group">
          <div class="flex flex-col items-center min-w-[60px]">
            <div class="text-2xl font-bold">{date.day}</div>
            <div class="text-sm text-base-content/60">{date.month}</div>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
              {post.title ?? post.path.slice(1)}
            </h3>
            {#if post.summary}
              <p class="text-base-content/70 text-sm mb-2">{post.summary}</p>
            {/if}
            {#if post.tags && post.tags.length > 0}
              <div class="flex gap-2 flex-wrap">
                {#each post.tags.slice(0, 3) as tag}
                  <span class="badge badge-ghost badge-sm">#{tag}</span>
                {/each}
              </div>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}
