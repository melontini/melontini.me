<script>
  import { fade, fly } from "svelte/transition";
  import { toggleState, menuState } from "./menu.svelte.js"

  let { children } = $props();
  menuState.open = false
</script>

{#if menuState.open}
  <div class="fixed w-full h-full z-10">
    <button
      transition:fade
      aria-label="Toggle Navigaton"
      class="w-full h-full absolute backdrop-blur-sm backdrop-brightness-75"
      onclick={toggleState}
    ></button>
    <div
      transition:fly={{ x: -window.innerWidth * (2/3), duration: 300, opacity: 100 }}
      class="h-full w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 bg-elevation-1 absolute overflow-y-auto"
    >
      {@render children?.()}
    </div>
  </div>

  <style>
    body {
        @apply overflow-hidden;
    }
  </style>
{/if}

