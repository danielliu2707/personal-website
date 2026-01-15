<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'

  const API_BASE = 'https://positionn-api.fly.dev'
  const HEADSHOT_BASE =
    'https://raw.githubusercontent.com/danielliu2707/positionn/main/player_headshots'

  type Mode = 'stats' | 'dimensions'

  let mode: Mode = 'stats'
  let loading = false
  let error: string | null = null

  // Stats inputs
  let points = 0
  let rebounds = 0
  let assists = 0
  let steals = 0
  let blocks = 0
  let turnovers = 0

  // Dimensions inputs
  let height_cm = 180
  let weight_kg = 75

  let result:
    | {
        position: string
        probability: number
        position_code?: string
        probabilities?: Record<string, number>
        twin: {
          player_id: number
          name: string
          year: number
        }
        twin_stats: Record<string, number | string>
      }
    | null = null

  function headshotUrl(playerId: number) {
    return `${HEADSHOT_BASE}/${playerId}.png`
  }

  function nbaStatsUrl(playerId: number) {
    // NBA stats URL for the player
    return `https://www.nba.com/stats/player/${playerId}`
  }

  function onHeadshotError(event: Event) {
    // If a headshot isn't available for this player_id, hide the image gracefully.
    const img = event.currentTarget
    if (img && img instanceof HTMLImageElement) img.style.display = 'none'
  }

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
  <header class="space-y-4 mb-8">
    <div class="flex items-center gap-3">
      <div>
        <p class="text-sm uppercase tracking-wide text-primary font-semibold mb-1">App</p>
        <h1 class="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          NBA Position Predictor
        </h1>
      </div>
    </div>
    <p class="text-base-content/70 text-base md:text-lg max-w-3xl leading-relaxed">
      Enter your stats or dimensions to discover your ideal NBA position and the player you most closely resemble.
    </p>
  </header>

  <section class="rounded-2xl bg-gradient-to-br from-base-100/90 to-base-200/50 backdrop-blur border-2 border-base-content/10 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-2xl">📊</span>
          <h2 class="text-xl md:text-2xl font-bold">Enter Your Details</h2>
        </div>
        <p class="text-base-content/70 text-sm md:text-base">
          Switch between player statistics and physical dimensions, then hit predict to see your results.
        </p>
      </div>

      <!-- Tabs -->
      <div class="tabs tabs-boxed self-start md:self-end bg-base-200/50">
        <button
          type="button"
          class="tab text-xs md:text-sm font-semibold transition-all"
          class:tab-active={mode === 'stats'}
          on:click={() => (mode = 'stats')}>
          📈 Statistics
        </button>
        <button
          type="button"
          class="tab text-xs md:text-sm font-semibold transition-all"
          class:tab-active={mode === 'dimensions'}
          on:click={() => (mode = 'dimensions')}>
          📏 Dimensions
        </button>
      </div>
    </div>

    {#if mode === 'stats'}
      <!-- Stats form -->
      <div class="grid md:grid-cols-3 gap-4">
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="points">
            Points per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 0 and 80" />
          </label>
          <input
            id="points"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.points ? 'input-error' : ''}"
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
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="rebounds">
            Rebounds per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 0 and 40" />
          </label>
          <input
            id="rebounds"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.rebounds ? 'input-error' : ''}"
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
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="assists">
            Assists per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 0 and 30" />
          </label>
          <input
            id="assists"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.assists ? 'input-error' : ''}"
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
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="steals">
            Steals per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 0 and 20" />
          </label>
          <input
            id="steals"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.steals ? 'input-error' : ''}"
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
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="blocks">
            Blocks per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 0 and 20" />
          </label>
          <input
            id="blocks"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.blocks ? 'input-error' : ''}"
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
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="turnovers">
            Turnovers per game
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 0 and 20" />
          </label>
          <input
            id="turnovers"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.turnovers ? 'input-error' : ''}"
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
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="height_cm">
            Height (cm)
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 100 and 250 cm" />
          </label>
          <input
            id="height_cm"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.height_cm ? 'input-error' : ''}"
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
        <div class="space-y-2">
          <label class="label-text block font-semibold" for="weight_kg">
            Weight (kg)
            <span
              class="i-heroicons-information-circle text-xs text-base-content/60 ml-1 align-middle cursor-help"
              title="Enter a value between 30 and 250 kg" />
          </label>
          <input
            id="weight_kg"
            class="input input-bordered w-full hover:border-primary/50 focus:border-primary transition-colors {fieldErrors.weight_kg ? 'input-error' : ''}"
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

    <div class="flex justify-center pt-4">
      <button
        type="button"
        class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
        on:click|preventDefault={predict}
        disabled={loading}>
        {#if loading}
          <span class="loading loading-spinner loading-sm"></span>
          Calculating...
        {:else}
          <span class="text-xl">🏀</span>
          Predict Position
        {/if}
      </button>
    </div>

    {#if error}
      <p class="text-error mt-4 text-sm">{error}</p>
    {/if}
  </section>

  {#if result}
    <section class="space-y-6 animate-in fade-in duration-500">
      <!-- Position Prediction Card -->
      <div class="rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 border-2 border-primary/30 shadow-xl p-6 md:p-8 space-y-6">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">🏀</span>
          <p class="text-sm uppercase tracking-wide text-base-content/60 font-semibold">Your Basketball Analysis</p>
        </div>
        
        <div class="space-y-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p class="text-base text-base-content/70 mb-2">You project as a</p>
              <div class="flex items-center gap-3 flex-wrap">
                <span class="badge badge-lg badge-primary text-lg px-4 py-3 font-bold">
                  {result.position}
                </span>
                {#if typeof result.probability === 'number'}
                  <span class="text-2xl md:text-3xl font-bold text-base-content">
                    {(result.probability * 100).toFixed(1)}%
                  </span>
                {/if}
              </div>
            </div>
          </div>

          <!-- Probability Progress Bar -->
          {#if typeof result.probability === 'number'}
            <div class="space-y-2">
              <div class="w-full bg-base-300 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  class="bg-gradient-to-r from-primary to-primary-focus h-full rounded-full transition-all duration-1000 ease-out"
                  style="width: {(result.probability * 100)}%">
                </div>
              </div>
            </div>
          {/if}

          <!-- Probability Breakdown -->
          {#if result.probabilities && Object.keys(result.probabilities).length > 1}
            <div class="pt-4 border-t border-base-content/10">
              <p class="text-sm font-semibold text-base-content/80 mb-3">Position Probabilities</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                {#each Object.entries(result.probabilities) as [pos, prob]}
                  {@const isPrimary = pos === result.position_code}
                  <div class="rounded-lg bg-base-100/50 p-3 border {isPrimary ? 'border-primary shadow-md' : 'border-base-content/10'}">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-semibold {isPrimary ? 'text-primary' : 'text-base-content/70'}">
                        {pos === 'G' ? 'Guard' : pos === 'F' ? 'Forward' : pos === 'C' ? 'Center' : pos}
                      </span>
                      <span class="text-xs font-bold {isPrimary ? 'text-primary' : 'text-base-content/60'}">
                        {(prob * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div class="w-full bg-base-200 rounded-full h-2">
                      <div
                        class="h-2 rounded-full transition-all duration-1000 ease-out {isPrimary ? 'bg-primary' : 'bg-base-content/30'}"
                        style="width: {(prob * 100)}%">
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Player Comparison Card -->
      <div class="rounded-2xl bg-base-100/80 backdrop-blur border-2 border-base-content/10 shadow-lg p-6 md:p-8 space-y-6">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-2xl">⭐</span>
          <h2 class="text-xl md:text-2xl font-bold">Your NBA Twin</h2>
        </div>

        <div class="flex flex-col md:flex-row gap-6 items-start">
          <!-- Player Info & Headshot -->
          <div class="flex flex-col items-center md:items-start gap-4 flex-shrink-0">
            {#if result.twin?.player_id}
              <div class="relative">
                <img
                  src={headshotUrl(result.twin.player_id)}
                  alt={result.twin.name}
                  class="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl shadow-xl border-4 border-primary/20"
                  loading="lazy"
                  on:error={onHeadshotError} />
              </div>
            {/if}
            <div class="text-center md:text-left">
              <p class="text-lg md:text-xl font-bold text-base-content">
                {#if result.twin?.year}
                  {result.twin.year}
                {/if}
              </p>
              <p class="text-xl md:text-2xl font-bold text-primary mt-1">
                {result.twin.name}
              </p>
            </div>
          </div>

          <!-- Stats Table -->
          {#if result.twin_stats}
            <div class="flex-1 w-full space-y-4">
              <div>
                <p class="text-sm font-semibold text-base-content/80 mb-3">Season Statistics</p>
                <div class="overflow-x-auto">
                  <table class="table table-zebra w-full">
                    <thead>
                      <tr class="bg-base-200">
                        <th class="font-semibold">Statistic</th>
                        <th class="font-semibold text-right">Per Game</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each Object.entries(result.twin_stats) as [stat, value]}
                        <tr>
                          <td class="capitalize font-medium">{stat.replace(/_/g, ' ')}</td>
                          <td class="text-right font-semibold">{value}</td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              </div>

              {#if result.twin?.player_id}
                <div class="pt-2">
                  <a
                    href={nbaStatsUrl(result.twin.player_id)}
                    target="_blank"
                    rel="noopener noreferrer external"
                    class="btn btn-ghost btn-sm px-0 text-sm normal-case text-primary flex items-center gap-2 group">
                    <span class="i-heroicons-arrow-top-right-on-square-20-solid w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span class="underline-offset-4 group-hover:underline">
                      View full {result.twin.name} stats on NBA.com
                    </span>
                  </a>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </section>
  {/if}

  <div class="mt-16 pt-12 border-t border-base-content/10">
    <Footer />
  </div>
</div>

