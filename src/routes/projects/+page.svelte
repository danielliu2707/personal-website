<script lang="ts">
  import { projects as allProjects } from '$lib/config/projects'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import { title as storedTitle } from '$lib/stores/title'

  storedTitle.set('Projects')
</script>

<Head />

<div class="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
  <h1 class="text-4xl md:text-5xl font-bold mb-12">Projects</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
    {#each allProjects as project}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer external"
        class="group relative flex flex-col rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <!-- Project Image -->
        <div class="aspect-video w-full overflow-hidden bg-base-200">
          <img
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={project.img}
            alt={project.name} />
        </div>

        <!-- Project Content -->
        <div class="flex flex-col flex-1 p-5 md:p-6">
          <h2 class="text-xl md:text-2xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
            {project.name}
          </h2>

          {#if project.description}
            <p class="text-sm md:text-base text-base-content/80 mb-4 flex-1 leading-relaxed">
              {@html project.description}
            </p>
          {/if}

          {#if project.tags && project.tags.length > 0}
            <div class="flex flex-wrap gap-2 mt-auto">
              {#each project.tags as tag}
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Hover Indicator -->
        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="i-heroicons-solid-arrow-top-right-on-square text-xl text-primary" />
        </div>
      </a>
    {/each}
  </div>

  <div class="mt-16 pt-12 border-t border-base-content/10">
    <Footer />
  </div>
</div>
