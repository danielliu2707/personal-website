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
      <div
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
            <div class="flex flex-wrap gap-2 mb-6">
              {#each project.tags as tag}
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              {/each}
            </div>
          {/if}

          <!-- Action Buttons -->
          <div class="flex gap-2 mt-auto">
            {#if project.github}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer external"
                class="btn btn-outline btn-sm flex-1 gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>GitHub</span>
              </a>
            {/if}
            {#if project.demo}
              <a
                href={project.demo}
                class="btn btn-primary btn-sm flex-1 gap-2">
                <span class="i-heroicons-solid-arrow-top-right-on-square w-4 h-4" />
                <span>Try it out</span>
              </a>
            {:else if project.link}
              <!-- Fallback to old link field -->
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer external"
                class="btn btn-primary btn-sm flex-1 gap-2">
                <span class="i-heroicons-solid-arrow-top-right-on-square w-4 h-4" />
                <span>View Project</span>
              </a>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-16 pt-12 border-t border-base-content/10">
    <Footer />
  </div>
</div>
