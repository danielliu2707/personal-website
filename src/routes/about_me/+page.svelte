<script lang="ts">
  import Head from '$lib/components/head.svelte'

  let activeTab: 'experience' | 'extracurriculars' = 'experience'
</script>

<Head />

<main class="max-w-4xl mx-auto px-4 md:px-0 py-10 md:py-16">
  <section class="mb-6 text-left">
    <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">Timeline</h1>
    <div class="inline-flex rounded-full bg-base-200 p-1 text-sm">
      <button
        type="button"
        class="px-4 py-2 rounded-full transition-colors"
        class:bg-base-100={activeTab === 'experience'}
        class:text-primary={activeTab === 'experience'}
        on:click={() => (activeTab = 'experience')}>
        Experience
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-full transition-colors"
        class:bg-base-100={activeTab === 'extracurriculars'}
        class:text-primary={activeTab === 'extracurriculars'}
        on:click={() => (activeTab = 'extracurriculars')}>
        Extracurriculars
      </button>
    </div>
  </section>

  {#if activeTab === 'experience'}
    <section aria-label="Professional experience timeline">
      <div class="relative border-l border-base-content/15 pl-6 space-y-10">
        <!-- Atlassian -->
        <article class="relative">
          <div
            class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm">
          </div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow">
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">
                Feb 2026 - Present
              </p>
              <h2 class="text-lg md:text-xl font-semibold mt-1">
                Data Science Associate · Atlassian
              </h2>
              <p class="text-sm text-base-content/70 mt-3">
                Coming soon!
              </p>
            </div>
          </div>
        </article>

        <!-- Acenda -->
        <article class="relative">
          <div
            class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm">
          </div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow">
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">
                Feb 2025 - Dec 2025
              </p>
              <h2 class="text-lg md:text-xl font-semibold mt-1">
                Junior Data Scientist · Acenda
              </h2>
              <p class="text-sm text-base-content/70 mt-3">
                Applied AWS machine learning services to build and improve ML models for Kiroku: Acenda's automated customer document processing
                system.
              </p>
              <ul class="list-none text-sm text-base-content/70 mt-3 space-y-1">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Boosted claims data extraction accuracy by 13.8% by redesigning the text extraction and training pipeline
                    for a custom NER model used to process customer claim documents
                    <a href="https://www.canva.com/design/DAGqYW-nyug/cgc3hXV59Okbcmns92ybRw/edit?utm_content=DAGqYW-nyug&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" rel="noopener noreferrer" class="link link-primary font-medium hover:underline">
                      (presentation)
                    </a>
                  </span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Owned small experiments end-to-end: problem framing, modelling, and evaluation.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Canva -->
        <article class="relative">
          <div
            class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm">
          </div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow">
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">
                Feb 2024 - Sep 2025
              </p>
              <h2 class="text-lg md:text-xl font-semibold mt-1">
                Applied Scientist · Canva
              </h2>
              <p class="text-sm text-base-content/70 mt-3">
                Worked across generative imaging features and applied ML systems, from prototype models to
                shipped product. Learned how to translate research ideas into delightful, reliable UX.
              </p>
              <ul class="list-none text-sm text-base-content/70 mt-3 space-y-1">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Collaborated with engineers, designers, and PMs to ship ML-powered features.</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Owned small experiments end-to-end: problem framing, modelling, and evaluation.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Canva – Data Science Intern -->
        <article class="relative">
          <div
            class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm">
          </div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow">
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">
                Nov 2023 - Feb 2024
              </p>
              <h2 class="text-lg md:text-xl font-semibold mt-1">
                Data Science Intern · Canva
              </h2>
              <p class="text-sm text-base-content/70 mt-3">
                My first taste of large-scale product analytics and experimentation. I spent most of my time
                deep in SQL, dashboards, and documentation.
              </p>
              <ul class="list-none text-sm text-base-content/70 mt-3 space-y-1">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Shipped analyses that informed growth and product decisions.</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Built reusable SQL and metrics definitions for the broader team.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Monash -->
        <article class="relative">
          <div
            class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm">
          </div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow">
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">
                2021 - 2024
              </p>
              <h2 class="text-lg md:text-xl font-semibold mt-1">
                B.CompSci / B.Com · Monash University
              </h2>
              <p class="text-sm text-base-content/70 mt-3">
                Studied Computer Science and Commerce (Data Science & Business Analytics), while getting
                heavily involved in the Computing & Commerce Association.
              </p>
              <ul class="list-none text-sm text-base-content/70 mt-3 space-y-1">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Held committee roles in a large student society (treasurer, marketing, sponsorship).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Built a foundation in statistics, machine learning, and software engineering.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  {:else}
    <section aria-label="Extracurricular timeline">
      <div class="relative border-l border-base-content/15 pl-6 space-y-10">
        <!-- CCA leadership -->
        <article class="relative">
          <div
            class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm">
          </div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow">
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">
                2022 - 2024
              </p>
              <h2 class="text-lg md:text-xl font-semibold mt-1">
                Computing & Commerce Association · Committee Member
              </h2>
              <p class="text-sm text-base-content/70 mt-3">
                Helped run one of Monash's largest student societies, focusing on events, sponsorship,
                and community for students interested in tech and business.
              </p>
              <ul class="list-none text-sm text-base-content/70 mt-3 space-y-1">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Held roles across treasury, marketing, and sponsorship.</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Coordinated events that connected students with industry partners.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Personal projects / writing -->
        <article class="relative">
          <div
            class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm">
          </div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow">
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">
                Ongoing
              </p>
              <h2 class="text-lg md:text-xl font-semibold mt-1">
                Personal Projects & Writing
              </h2>
              <p class="text-sm text-base-content/70 mt-3">
                Building small tools, writing reflections, and sharing learnings about careers,
                data science, and software engineering.
              </p>
              <ul class="list-none text-sm text-base-content/70 mt-3 space-y-1">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Maintain this website as a living portfolio and writing outlet.</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Experiment with new stacks and ML ideas outside of work.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  {/if}
</main>
