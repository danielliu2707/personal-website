<script lang="ts">
  import type { Highlight } from '$lib/types/highlight'
  import { apps } from '$lib/config/apps'

  let items: Highlight[] = apps
</script>

{#if items.length > 0}
  <section class="mb-0">
    <h2 class="text-3xl font-bold mb-8">Apps</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each items as app}
        <a
          href={app.link}
          class="card bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 hover:shadow-xl transition-all duration-300 rounded-box border-2 border-base-content/10 hover:border-primary">
          <div class="card-body p-6 flex flex-row items-start gap-4">
            <div class="text-4xl">{app.icon}</div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2">{app.title}</h3>
              <p class="text-base-content/70">{app.description}</p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}

