<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'

  let activeTab: 'experience' | 'education' | 'extracurriculars' = 'experience'

  $: categoryLabel = activeTab === 'experience' ? 'EXPERIENCE' : activeTab === 'education' ? 'EDUCATION' : 'EXTRAS'
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
        class:bg-base-100={activeTab === 'education'}
        class:text-primary={activeTab === 'education'}
        on:click={() => (activeTab = 'education')}>
        Education
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
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Feb 2026 - Present</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">Data Science Associate · Atlassian</h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">Coming soon!</p>
            </div>
          </div>
        </article>

        <!-- Acenda -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Feb 2025 - Dec 2025</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">Junior Data Scientist · Acenda</h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Built AWS SageMaker ML models in the AI team for an automated customer document processing system.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Improved entity extraction accuracy on customer claims documents by 13.8% by redesigning the text extraction
                    and training pipeline for the ML model.
                    <a
                      href="https://www.canva.com/design/DAGqYW-nyug/cgc3hXV59Okbcmns92ybRw/edit?utm_content=DAGqYW-nyug&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="link link-primary font-medium hover:underline">
                      (presentation)
                    </a>
                  </span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Increased policy number extraction accuracy on customer policy documents by 10.1% by uncovering dataset bias
                    and introducing diverse training data to improve model robustness.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Canva -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Dec 2024 - Feb 2025</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">Data Science Intern · Canva</h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Product analytics and user interviews with the Canva Docs team to increase usage of the product.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Shaped the team's cross-product adoption strategy by leading external user interviews and authoring a
                    research report with product recommendations, garnering 200+ internal views and 30+ comments.
                  </span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Researched data-driven product adoption strategies to influence stakeholder decisions around boosting Canva
                    Docs usage, resulting in a prototype for experimentation.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Newmont -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Nov 2023 - Feb 2024</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">Data Science Intern · Newmont</h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Developed data solutions to improve safety and efficiency in mining operations.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Improved safety monitoring for geotech engineers by productionalising a PowerBI dashboard based on industry
                    barrier management regulations.
                  </span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Streamlined machinery defect identification by creating a PowerApp, eliminating manual paper defect records.
                  </span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>
                    Identified the top causes and required actions for disruptions to mining processes using natural language
                    processing in Python.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- MRPV -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Jan 2023 - Jul 2023</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">Data Analytics Intern · MRPV</h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Supported the team's data analysis and HR reporting needs.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Automated HR's employee report generation using Pandas and OpenPyXL for internal stakeholders.</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Produced stakeholder reports using Python and Excel to provide insights on over 600 employees.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  {:else if activeTab === 'education'}
    <section aria-label="Education timeline">
      <div class="relative border-l border-base-content/15 pl-6 space-y-10">
        <!-- Monash -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">2022 - 2025</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">
                B.CompSci (Data Science) / B.Com (Business Analytics) · Monash University
              </h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Built a foundation in statistics, data analysis, and machine learning.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>WAM 88.27 / 4.0 GPA.</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Awarded the IT Excellence Scholarship ($24,000) and IBL Placement Scholarship ($19,000).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Top scorer in Statistical Machine Learning (Unit Prize, 2025).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Top scorer in Introduction to Data Analysis (Unit Prize, 2024).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Selected for the Monash Minds Leadership Program (Top 1% of first-year students).</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Rossmoyne Senior High School -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">2016 - 2021</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">Rossmoyne Senior High School</h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">Completed secondary education.</p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>ATAR: 99.60</span>
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
        <!-- MAC -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Dec 2023 - Dec 2025</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">
                Committee Officer · Monash Association of Coding
              </h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Served as a panelist at Monash tech community events and promoted coding events to increase student
                participation.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Marketing Officer (Dec 2024 - Dec 2025).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Sponsorship Officer (Dec 2023 - Dec 2024).</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- CCA -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Apr 2022 - Dec 2025</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">
                Committee Executive · Computing & Commerce Association
              </h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Ran one of Monash's largest student societies; focusing on tech and business events.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Publications Officer (Dec 2024 - Nov 2025).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Treasurer (Dec 2023 - Nov 2024).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Sponsorship Officer (Dec 2022 - Nov 2023).</span>
                </li>
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>First Year Representative (Apr 2022 - Nov 2022).</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Vinnies -->
        <article class="relative">
          <div class="absolute -left-[9px] w-4 h-4 rounded-full border-2 border-primary bg-base-100 shadow-sm"></div>
          <div
            class="ml-4 md:ml-6 rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md hover:shadow-xl transition-shadow relative">
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                {categoryLabel}
              </span>
            </div>
            <div class="p-5 md:p-6">
              <p class="text-xs uppercase tracking-wide text-primary font-semibold">Nov 2019 - Feb 2021</p>
              <h2 class="text-lg md:text-xl font-bold text-base-content mt-2">Retail Volunteer · Vinnies Australia</h2>
              <p class="text-sm md:text-base text-base-content/80 mt-4 leading-relaxed">
                Volunteered to support poverty alleviation efforts through retail operations.
              </p>
              <ul class="list-none text-sm md:text-base text-base-content/80 mt-4 space-y-2">
                <li class="flex gap-2 items-baseline">
                  <span class="text-primary font-semibold">&raquo;</span>
                  <span>Sorted through donations, organized stock, and provided customer service.</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  {/if}

  <!-- Footer -->
  <div class="mt-20 pt-12 border-t border-base-content/10">
    <Footer />
  </div>
</main>
