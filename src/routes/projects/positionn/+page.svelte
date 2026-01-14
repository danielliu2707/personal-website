<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'

  const API_BASE = 'https://positionn-api.onrender.com'

  type Mode = 'stats' | 'dimensions'

  let mode: Mode = 'stats'
  let loading = false
  let error: string | null = null

  // Stats inputs
  let points = 2
  let rebounds = 2
  let assists = 2
  let steals = 2
  let blocks = 2
  let turnovers = 2

  // Dimensions inputs
  let height_cm = 180
  let weight_kg = 75
  let wingspan_cm = 185

  let result:
    | {
        position: string
        probability: number
        twin: string
        twin_stats: Record<string, number | string>
      }
    | null = null

  async function predict() {
    loading = true
    error = null
    result = null

    const endpoint = mode === 'stats' ? '/predict/stats' : '/predict/dimensions'

    const body =
      mode === 'stats'
        ? {
            points,
            rebounds,
            assists,
            steals,
            blocks,
            turnovers
          }
        : {
            height_cm,
            weight_kg,
            wingspan_cm
          }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      result = await res.json()
    } catch (e) {
      error = e instanceof Error ? e.message : 'Something went wrong.'
    } finally {
      loading = false
    }
  }
</script>

<Head />

<div class="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-10">
  <header class="space-y-3">
    <p class="text-sm uppercase tracking-wide text-primary font-semibold">App</p>
    <h1 class="text-3xl md:text-4xl font-bold">NBA Position Predictor</h1>
    <p class="text-base-content/70 text-sm md:text-base max-w-2xl">
      Enter your stats or dimensions to discover your ideal NBA position and the player you most closely resemble.
    </p>
  </header>

  <section class="rounded-2xl bg-base-100/80 backdrop-blur border border-base-content/10 shadow-md p-5 md:p-6 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 class="text-xl md:text-2xl font-bold">Enter Your Details</h2>
        <p class="text-base-content/70 text-sm md:text-base mt-1">
          Switch between player statistics and physical dimensions, then hit predict to see your results.
        </p>
      </div>

      <!-- Tabs -->
      <div class="tabs tabs-boxed self-start md:self-end">
        <button
          type="button"
          class="tab text-xs md:text-sm"
          class:tab-active={mode === 'stats'}
          on:click={() => (mode = 'stats')}>
          Player Statistics
        </button>
        <button
          type="button"
          class="tab text-xs md:text-sm"
          class:tab-active={mode === 'dimensions'}
          on:click={() => (mode = 'dimensions')}>
          Player Dimensions
        </button>
      </div>
    </div>

    {#if mode === 'stats'}
      <!-- Stats form -->
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="label-text block mb-1" for="points">Points per game</label>
          <input
            id="points"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            bind:value={points} />
        </div>
        <div>
          <label class="label-text block mb-1" for="rebounds">Rebounds per game</label>
          <input
            id="rebounds"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            bind:value={rebounds} />
        </div>
        <div>
          <label class="label-text block mb-1" for="assists">Assists per game</label>
          <input
            id="assists"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            bind:value={assists} />
        </div>
        <div>
          <label class="label-text block mb-1" for="steals">Steals per game</label>
          <input
            id="steals"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            bind:value={steals} />
        </div>
        <div>
          <label class="label-text block mb-1" for="blocks">Blocks per game</label>
          <input
            id="blocks"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            bind:value={blocks} />
        </div>
        <div>
          <label class="label-text block mb-1" for="turnovers">Turnovers per game</label>
          <input
            id="turnovers"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            bind:value={turnovers} />
        </div>
      </div>
    {:else}
      <!-- Dimensions form -->
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="label-text block mb-1" for="height_cm">Height (cm)</label>
          <input
            id="height_cm"
            class="input input-bordered w-full"
            type="number"
            bind:value={height_cm} />
        </div>
        <div>
          <label class="label-text block mb-1" for="weight_kg">Weight (kg)</label>
          <input
            id="weight_kg"
            class="input input-bordered w-full"
            type="number"
            bind:value={weight_kg} />
        </div>
        <div>
          <label class="label-text block mb-1" for="wingspan_cm">Wingspan (cm)</label>
          <input
            id="wingspan_cm"
            class="input input-bordered w-full"
            type="number"
            bind:value={wingspan_cm} />
        </div>
      </div>
    {/if}

    <button
      type="button"
      class="btn btn-primary mt-2"
      on:click|preventDefault={predict}
      disabled={loading}>
      {#if loading}
        Calculating...
      {:else}
        Predict Position
      {/if}
    </button>

    {#if error}
      <p class="text-error mt-4 text-sm">{error}</p>
    {/if}
  </section>

  {#if result}
    <section class="space-y-4">
      <div>
        <p class="text-sm text-base-content/70 mb-1">Your Basketball Analysis</p>
        <p class="text-lg md:text-xl">
          You project as a
          <span class="text-primary font-semibold">{result.position}</span>
          {#if typeof result.probability === 'number'}
            ({(result.probability * 100).toFixed(1)}% probability)
          {/if}
        </p>
      </div>

      <div class="rounded-2xl bg-base-200/40 border border-base-content/10 p-4 md:p-5 space-y-4">
        <h2 class="text-base md:text-lg font-semibold">NBA Player Comparison</h2>
        <p class="font-medium">
          {result.twin}
        </p>

        {#if result.twin_stats}
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full text-xs md:text-sm">
              <thead>
                <tr>
                  <th>Statistic</th>
                  <th>Per Game</th>
                </tr>
              </thead>
              <tbody>
                {#each Object.entries(result.twin_stats) as [stat, value]}
                  <tr>
                    <td>{stat}</td>
                    <td>{value}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <div class="mt-16 pt-12 border-t border-base-content/10">
    <Footer />
  </div>
</div>

