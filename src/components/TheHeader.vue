<template>
    <header :class="$style.header">
        <div :class="$style.headerInner">
            Header
        </div>
    </header>
</template>

<script setup lang="ts">
</script>

<style module>
.header {
    --tg-top-offset: 58.8px; /* стандартная высота top bar */
    padding-top: max(
        var(--tma-vue-content-safe-top, 0px),
        env(safe-area-inset-top),
        var(--tg-top-offset)
    );
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
    /* Custom */
    border-bottom: 1px solid black;
}
.headerInner {
    min-height: 50px;
}
</style>