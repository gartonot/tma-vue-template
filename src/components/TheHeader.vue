<template>
    <header :class="$style.header">
        Header
    </header>
</template>

<script setup lang="ts">
</script>

<style module>
.header {
    padding-top: var(--tma-vue-content-safe-top);
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
    /* Custom */
    border-bottom: 1px solid black;
    height: 50px;
}
</style>