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
    padding-top: calc(var(--tma-vue-content-safe-top) + 56px);
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
    /* Custom */
    border-bottom: 1px solid black;
}
.headerInner {
    min-height: 50px;
}
</style>