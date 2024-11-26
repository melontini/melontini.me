<script>
    import { toggleState } from "./menu.svelte"
    let { children, ...others } = $props();
</script>

<button {...others} onclick={toggleState}>
    {@render children?.()}
</button>