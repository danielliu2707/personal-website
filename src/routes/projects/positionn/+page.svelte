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

  let result:
    | {
        position: string
        probability: number
        twin: string
        twin_stats: Record<string, number | string>
      }
    | null = null

  let fieldErrors = {
    points: '',
    rebounds: '',
    assists: '',
    steals: '',
    blocks: '',
    turnovers: '',
    height_cm: '',
    weight_kg: ''
  }

  async function predict() {
    loading = true
    error = null
    result = null
    fieldErrors = {
      points: '',
      rebounds: '',
      assists: '',
      steals: '',
      blocks: '',
      turnovers: '',
      height_cm: '',
      weight_kg: ''
    }

    const endpoint = mode === 'stats' ? '/predict/stats' : '/predict/dimensions'

    // Coerce values to numbers
    const p = Number(points)
    const r = Number(rebounds)
    const a = Number(assists)
    const s = Number(steals)
    const b = Number(blocks)
    const t = Number(turnovers)
    const h = Number(height_cm)
    const w = Number(weight_kg)

    // Frontend validation with per-field errors
    if (Number.isNaN(p) || p < 0 || p > 80) {
      fieldErrors.points = 'Value must be between 0 and 80.'
    }
    if (Number.isNaN(r) || r < 0 || r > 40) {
      fieldErrors.rebounds = 'Value must be between 0 and 40.'
    }
    if (Number.isNaN(a) || a < 0 || a > 30) {
      fieldErrors.assists = 'Value must be between 0 and 30.'
    }
    if (Number.isNaN(s) || s < 0 || s > 20) {
      fieldErrors.steals = 'Value must be between 0 and 20.'
    }
    if (Number.isNaN(b) || b < 0 || b > 20) {
      fieldErrors.blocks = 'Value must be between 0 and 20.'
    }
    if (Number.isNaN(t) || t < 0 || t > 20) {
      fieldErrors.turnovers = 'Value must be between 0 and 20.'
    }
    if (Number.isNaN(h) || h < 100 || h > 250) {
      fieldErrors.height_cm = 'Value must be between 100 and 250 cm.'
    }
    if (Number.isNaN(w) || w < 30 || w > 250) {
      fieldErrors.weight_kg = 'Value must be between 30 and 250 kg.'
    }

    if (Object.values(fieldErrors).some(message => message && message.length > 0)) {
      error = 'Please fix the highlighted fields before predicting.'
      loading = false
      return
    }

    const body =
      mode === 'stats'
        ? {
            points: p,
            rebounds: r,
            assists: a,
            steals: s,
            blocks: b,
            turnovers: t
          }
        : {
            height_cm: h,
            weight_kg: w
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
          <label class="label-text block mb-1" for="points">
            Points per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 0 and 80" />
          </label>
          <input
            id="points"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            min="0"
            max="80"
            bind:value={points} />
          {#if fieldErrors.points}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.points}
            </p>
          {/if}
        </div>
        <div>
          <label class="label-text block mb-1" for="rebounds">
            Rebounds per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 0 and 40" />
          </label>
          <input
            id="rebounds"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            min="0"
            max="40"
            bind:value={rebounds} />
          {#if fieldErrors.rebounds}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.rebounds}
            </p>
          {/if}
        </div>
        <div>
          <label class="label-text block mb-1" for="assists">
            Assists per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 0 and 30" />
          </label>
          <input
            id="assists"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            min="0"
            max="30"
            bind:value={assists} />
          {#if fieldErrors.assists}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.assists}
            </p>
          {/if}
        </div>
        <div>
          <label class="label-text block mb-1" for="steals">
            Steals per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 0 and 20" />
          </label>
          <input
            id="steals"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            min="0"
            max="20"
            bind:value={steals} />
          {#if fieldErrors.steals}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.steals}
            </p>
          {/if}
        </div>
        <div>
          <label class="label-text block mb-1" for="blocks">
            Blocks per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 0 and 20" />
          </label>
          <input
            id="blocks"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            min="0"
            max="20"
            bind:value={blocks} />
          {#if fieldErrors.blocks}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.blocks}
            </p>
          {/if}
        </div>
        <div>
          <label class="label-text block mb-1" for="turnovers">
            Turnovers per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 0 and 20" />
          </label>
          <input
            id="turnovers"
            class="input input-bordered w-full"
            type="number"
            step="0.1"
            min="0"
            max="20"
            bind:value={turnovers} />
          {#if fieldErrors.turnovers}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.turnovers}
            </p>
          {/if}
        </div>
      </div>
    {:else}
      <!-- Dimensions form -->
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="label-text block mb-1" for="height_cm">
            Height (cm)
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 100 and 250 cm" />
          </label>
          <input
            id="height_cm"
            class="input input-bordered w-full"
            type="number"
            min="100"
            max="250"
            bind:value={height_cm} />
          {#if fieldErrors.height_cm}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.height_cm}
            </p>
          {/if}
        </div>
        <div>
          <label class="label-text block mb-1" for="weight_kg">
            Weight (kg)
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle"
              title="Enter a value between 30 and 250 kg" />
          </label>
          <input
            id="weight_kg"
            class="input input-bordered w-full"
            type="number"
            min="30"
            max="250"
            bind:value={weight_kg} />
          {#if fieldErrors.weight_kg}
            <p class="mt-1 text-xs text-error flex items-center gap-1">
              <span class="i-heroicons-exclamation-circle w-3 h-3" />
              {fieldErrors.weight_kg}
            </p>
          {/if}
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

