<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
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
        top_players: Array<{
          rank: number
          player_id: number
          name: string
          year: number
          similarity_score: number
          stats: Record<string, number>
        }>
      }
    | null = null

  let selectedPlayerIndex = 0
  let isHighlighting = false
  let showScrollPrompt = false
  let scrollPromptStartTime = 0
  let userInputStats: Record<string, number> | null = null

  function headshotUrl(playerId: number) {
    return `${HEADSHOT_BASE}/${playerId}.png`
  }

  function nbaStatsUrl(playerId: number) {
    // NBA stats URL for the player
    return `https://www.nba.com/stats/player/${playerId}`
  }

  function statMeta(statKey: string) {
    const key = statKey.toLowerCase()
    if (key.includes('point')) {
      return { icon: 'i-heroicons-solid-sparkles', label: 'Points' }
    }
    if (key.includes('assist')) {
      return { icon: 'i-heroicons-solid-user-group', label: 'Assists' }
    }
    if (key.includes('rebound') || key.includes('reb')) {
      // Use a different, more obvious icon for rebounds
      return { icon: 'i-heroicons-solid-arrow-up-on-square-stack', label: 'Rebounds' }
    }
    if (key.includes('steal')) {
      return { icon: 'i-heroicons-solid-finger-print', label: 'Steals' }
    }
    if (key.includes('block')) {
      return { icon: 'i-heroicons-solid-shield-check', label: 'Blocks' }
    }
    if (key.includes('turnover')) {
      return { icon: 'i-heroicons-solid-arrow-uturn-right', label: 'Turnovers' }
    }
    return { icon: '', label: statKey.replace(/_/g, ' ') }
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

  function selectPlayer(index: number) {
    if (result && result.top_players && index >= 0 && index < result.top_players.length) {
      selectedPlayerIndex = index
      // Trigger highlight animation
      isHighlighting = true
      setTimeout(() => {
        isHighlighting = false
      }, 1000)
      // Scroll to the player comparison section with header offset
      setTimeout(() => {
        const playerSection = document.getElementById('player-comparison-section')
        if (playerSection) {
          // Try to find the header/navbar element
          const header = document.querySelector('header') || 
                        document.querySelector('.navbar') || 
                        document.querySelector('nav')
          const headerHeight = header ? header.getBoundingClientRect().height : 100
          const elementPosition = playerSection.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight - 24 // 24px extra padding
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  async function predict() {
    loading = true
    error = null
    result = null
    selectedPlayerIndex = 0
    showScrollPrompt = false
    userInputStats = null
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
      // Store user input stats for comparison
      if (mode === 'stats') {
        userInputStats = {
          points: p,
          rebounds: r,
          assists: a,
          steals: s,
          blocks: b,
          turnovers: t
        }
      } else {
        userInputStats = null
      }
      // Show scroll prompt immediately after results are received
      if (result && result.top_players) {
        showScrollPrompt = true
        scrollPromptStartTime = Date.now()
        // Hide after 12 seconds
        setTimeout(() => {
          showScrollPrompt = false
        }, 12000)
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Something went wrong.'
    } finally {
      loading = false
    }
  }

  // Hide scroll prompt when user scrolls (but only after minimum display time)
  function handleScroll() {
    if (showScrollPrompt && Date.now() - scrollPromptStartTime > 4000) {
      showScrollPrompt = false
    }
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
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

    <div class="flex flex-col items-center pt-4 space-y-2">
      <button
        type="button"
        class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] {mode === 'dimensions' ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}"
        on:click|preventDefault={predict}
        disabled={loading || mode === 'dimensions'}>
        {#if loading}
          <span class="loading loading-spinner loading-sm"></span>
          Calculating...
        {:else}
          <span class="text-xl">🏀</span>
          Predict Position
        {/if}
      </button>
      {#if mode === 'dimensions'}
        <p class="text-sm text-base-content/70 text-center">
          Dimensions prediction is not ready yet. Please use Statistics mode.
        </p>
      {/if}
    </div>

    {#if error}
      <p class="text-error mt-4 text-sm">{error}</p>
    {/if}
  </section>

  {#if result}
    <section class="space-y-6 animate-in fade-in duration-500">
      <!-- Scroll Prompt -->
      {#if showScrollPrompt && result && result.top_players}
        <div class="w-full rounded-xl bg-primary/10 border border-primary/30 px-6 py-5 flex items-center justify-center gap-3">
          <svg class="w-5 h-5 text-primary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <p class="text-sm md:text-base text-base-content font-medium">
            Scroll all the way to the bottom to explore {result.top_players.length} similar players and find your NBA match!
          </p>
        </div>
      {/if}

      <!-- Position Prediction Card -->
      <div
        class="relative overflow-hidden rounded-2xl border-2 border-primary/30 shadow-xl p-6 md:p-8 space-y-6 bg-base-900/80">
        <!-- Background image + gradient overlay -->
        <div class="absolute inset-0 pointer-events-none">
          <div
            class="w-full h-full bg-[url('/assets/basketbackgroundpositionn.jpeg')] bg-cover bg-center opacity-40" />
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 opacity-70" />
        </div>

        <!-- Foreground content -->
        <div class="relative space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-3xl">🏀</span>
            <p class="text-sm uppercase tracking-wide text-base-content/80 font-semibold">
              Your Basketball Analysis
            </p>
          </div>

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
      {#if result.top_players && result.top_players[selectedPlayerIndex]}
        {@const selectedPlayer = result.top_players[selectedPlayerIndex]}
        <div
          id="player-comparison-section"
          class="rounded-2xl bg-base-100/80 backdrop-blur border-2 border-base-content/10 shadow-lg p-6 md:p-8 space-y-6 scroll-mt-24 transition-all duration-500 {isHighlighting ? 'ring-4 ring-primary ring-offset-2 shadow-2xl' : ''}">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">⭐</span>
            <h2 class="text-xl md:text-2xl font-bold">Your #{selectedPlayer.rank} NBA Match</h2>
          </div>

          <div class="flex flex-col md:flex-row gap-6 items-start">
            <!-- Player Info & Headshot -->
            <div class="flex flex-col items-center md:items-start gap-4 flex-shrink-0">
              <div class="relative">
                <img
                  src={headshotUrl(selectedPlayer.player_id)}
                  alt={selectedPlayer.name}
                  class="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl shadow-xl border-4 border-primary/20"
                  loading="lazy"
                  on:error={onHeadshotError} />
              </div>
              <div class="text-center md:text-left">
                <p class="text-lg md:text-xl font-bold text-base-content">
                  {selectedPlayer.year}
                </p>
                <p class="text-xl md:text-2xl font-bold text-primary mt-1">
                  {selectedPlayer.name}
                </p>
              </div>
            </div>

            <!-- Stats Table -->
            {#if selectedPlayer.stats}
              <div class="flex-1 w-full space-y-4">
                <div class="overflow-x-auto">
                  <table class="table table-zebra w-full">
                    <thead>
                      <tr class="bg-base-200">
                        <th class="font-semibold">Season Statistics</th>
                        <th class="font-semibold text-right">Per Game</th>
                        {#if userInputStats}
                          <th class="font-semibold text-right">vs Your Stats</th>
                        {/if}
                      </tr>
                    </thead>
                    <tbody>
                      {#each Object.entries(selectedPlayer.stats) as [stat, value]}
                        {@const meta = statMeta(stat)}
                        {@const userValue = userInputStats ? userInputStats[stat] : null}
                        {@const difference = userValue !== null ? Number(value) - userValue : null}
                        <tr>
                          <td class="capitalize font-medium">
                            <div class="flex items-center gap-2">
                              {#if meta.icon}
                                <span class={`${meta.icon} w-4 h-4 text-primary`} />
                              {/if}
                              <span>{meta.label}</span>
                            </div>
                          </td>
                          <td class="text-right font-semibold">{value}</td>
                          {#if userInputStats && difference !== null}
                            <td class="text-right font-semibold {difference > 0 ? 'text-success' : difference < 0 ? 'text-error' : 'text-base-content'}">
                              {difference > 0 ? '+' : ''}{difference.toFixed(1)}
                            </td>
                          {/if}
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>

                <div class="pt-2">
                  <a
                    href={nbaStatsUrl(selectedPlayer.player_id)}
                    target="_blank"
                    rel="noopener noreferrer external"
                    class="btn btn-ghost btn-sm px-0 text-sm normal-case text-primary flex items-center gap-2 group">
                    <span class="i-heroicons-arrow-top-right-on-square-20-solid w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span class="underline-offset-4 group-hover:underline">
                      View full {selectedPlayer.name} stats on NBA.com
                    </span>
                  </a>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Similar Players Gallery -->
      {#if result.top_players && result.top_players.length > 0}
        <div class="rounded-2xl bg-base-100/80 backdrop-blur border-2 border-base-content/10 shadow-lg p-6 md:p-8 space-y-6">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">👥</span>
            <h2 class="text-xl md:text-2xl font-bold">Similar Players Gallery</h2>
          </div>

          <div class="rounded-xl bg-primary/15 border-2 border-primary/30 px-4 py-3 mb-6 flex items-center gap-3">
            <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
            </svg>
            <p class="text-sm md:text-base font-semibold text-primary">
              Click on any player's face to view their stats and see how they match up with yours!
            </p>
          </div>

          <div class="overflow-x-auto overflow-y-visible -mx-6 md:-mx-8 px-6 md:px-8 py-6 scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200">
            <div class="flex gap-4 pb-4" style="scroll-behavior: smooth; width: max-content;">
              {#each result.top_players as player, index}
                <div class="flex-shrink-0 w-48 md:w-56 text-center space-y-3 py-2">
                  <div
                    class="relative group cursor-pointer {selectedPlayerIndex === index ? 'ring-4 ring-primary ring-offset-2 rounded-2xl' : ''}"
                    on:click={() => selectPlayer(index)}
                    role="button"
                    tabindex="0"
                    on:keydown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        selectPlayer(index)
                      }
                    }}>
                    <img
                      src={headshotUrl(player.player_id)}
                      alt={player.name}
                      class="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg border-2 {selectedPlayerIndex === index ? 'border-primary' : 'border-base-content/10'} group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
                      loading="lazy"
                      on:error={onHeadshotError}
                      style="transform-origin: center;" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-base-content/70">{player.year}</p>
                    <p class="text-base md:text-lg font-bold text-base-content mt-1">{player.name}</p>
                    <p class="text-xs text-base-content/60 mt-1">
                      {(player.similarity_score * 100).toFixed(1)}% similar
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </section>
  {/if}

  <div class="mt-16 pt-12 border-t border-base-content/10">
    <Footer />
  </div>
</div>

