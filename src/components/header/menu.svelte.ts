export const menuState = $state({
    open: false
});

export function toggleState() {
    menuState.open = !menuState.open
}