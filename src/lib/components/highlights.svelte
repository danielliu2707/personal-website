<script lang="ts">
  import type { Highlight } from '$lib/types/highlight'

  export let highlights: Highlight[] = []
</script>

{#if highlights.length > 0}
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Highlights</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each highlights as highlight}
        <a
          href={highlight.link}
          class="card bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 hover:shadow-xl transition-all duration-300 rounded-box border-2 border-base-content/10 hover:border-primary">
          <div class="card-body p-6 flex flex-row items-start gap-4">
            <div class="text-4xl">{highlight.icon}</div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2">{highlight.title}</h3>
              <p class="text-base-content/70">{highlight.description}</p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}
