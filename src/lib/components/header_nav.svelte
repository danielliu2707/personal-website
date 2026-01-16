<script lang="ts">
  export let nav: { text: string; link?: string; children?: { text: string; link: string }[] }[]
  export let path: string
  export let title: string
  export let scrollY: number
  export let pin: boolean
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- reference: https://github.com/saadeghi/daisyui/issues/1285 -->
<div class="dropdown lg:hidden">
  <label for="navbar-dropdown" tabindex="0" class="btn btn-square btn-ghost">
    <span class="i-heroicons-outline-menu-alt-1" />
  </label>
  <ul
    id="navbar-dropdown"
    tabindex="0"
    class:hidden={!pin}
    class="menu menu-compact dropdown-content bg-base-100 text-base-content shadow-lg rounded-box min-w-[14rem] max-w-[18rem] p-2
    ">
    {#each nav as { text, link, children }}
      {#if link && !children}
        <li>
          <a class:font-bold={link === path} href={link}>{text}</a>
        </li>
      {:else if children}
        <li tabindex="0">
          <span class:font-bold={children.some(({ link }) => link === path)} class="justify-between gap-1 max-w-[13rem]">
            {#if text === 'Apps'}
              <span class="flex items-center gap-1.5">
                {text}
                <span class="i-heroicons-solid-sparkles text-primary text-xs" />
              </span>
            {:else}
              {text}
            {/if}
            <span class="i-heroicons-solid-chevron-right mr-2" />
          </span>
          <ul class="bg-base-100 text-base-content shadow-lg p-2">
            {#each children as { text, link }}
              <li>
                <a class:font-bold={link === path} href={link}>{text}</a>
              </li>
            {/each}
          </ul>
        </li>
      {/if}
    {/each}
  </ul>
</div>
<div class:swap-active={scrollY > 32 && title} class="swap order-last hidden lg:inline-grid">
  <button
    on:click={() => window.scrollTo(0, 0)}
    class:hidden={scrollY < 32 || !title}
    class="swap-on btn btn-ghost text-base font-normal normal-case transition-all duration-200">
    {title}
  </button>
  <ul class:hidden={scrollY > 64 && title} class="swap-off menu menu-horizontal flex-nowrap p-0">
    {#each nav as { text, link, children }}
      {#if link && !children}
        <li>
          <a class="!rounded-btn whitespace-nowrap" class:font-bold={link === path} href={link}>{text}</a>
        </li>
      {:else if children}
        <li class="dropdown">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <div tabindex="0" class:font-bold={children.some(({ link }) => link === path)} class="!rounded-btn gap-1 cursor-pointer whitespace-nowrap" class:text-primary={text === 'Apps'}>
            {#if text === 'Apps'}
              <span class="flex items-center gap-2">
                {text}
                <span class="i-heroicons-solid-sparkles text-xs" />
              </span>
            {:else}
              {text}
            {/if}
            <span class="i-heroicons-solid-chevron-down -mr-1" />
          </div>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul tabindex="0" class="menu dropdown-content rounded-box bg-base-100 text-base-content shadow-lg p-2 w-48">
            {#each children as { text, link }}
              <li>
                <a class:font-bold={link === path} href={link}>{text}</a>
              </li>
            {/each}
          </ul>
        </li>
      {/if}
    {/each}
  </ul>
</div>
