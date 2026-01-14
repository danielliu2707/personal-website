<script lang="ts">
  import { site } from '$lib/config/site'
</script>

<div class="h-card flex flex-col gap-6 mb-8 mt-10 md:mt-14">
  <a href={site.protocol + site.domain} class="hidden u-url u-uid">{site.author.name}</a>
  <div class="flex flex-col md:flex-row items-start gap-6">
    <figure class="relative group flex-shrink-0">
      {#if site.author.avatar}
        <img
          class="u-photo rounded-full shadow-xl hover:shadow-2xl transition-shadow z-10 w-32 h-32 md:w-40 md:h-40"
          src={site.author.avatar}
          alt={site.author.name} />
      {/if}
      {#if site.author.status}
        <div
          class="absolute z-20 rounded-full w-10 h-10 md:w-12 md:h-12 bottom-0 right-0 bg-base-100 shadow-xl text-xl md:text-2xl text-center flex items-center justify-center">
          {site.author.status}
        </div>
      {/if}
    </figure>
    <div class="flex-1 ml-3 md:ml-6highlight">
      <h1 class="text-4xl md:text-5xl font-bold mb-2 p-name">
        Hi, I'm
        <span class="text-primary">
          {site.author?.name ? site.author.name.split(' ')[0] : ''}
        </span>
      </h1>
      <h2 class="text-xl md:text-2xl font-semibold text-base-content/90 mt-3">
        A Data Scientist at Atlassian
      </h2>
      <p class="text-sm md:text-base text-base-content/70 mt-3">
        Welcome to my career synposis. Here, you will find my <br>
        professional updates, learnings, and projects.
      </p>
    </div>
  </div>
</div>
