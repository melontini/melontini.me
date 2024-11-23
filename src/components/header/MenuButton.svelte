<script>
    import { toggleState } from "./menu.svelte.js"
    let { children, ...others } = $props();
</script>

<button {...others} onclick={toggleState}>
    {@render children?.()}
</button>