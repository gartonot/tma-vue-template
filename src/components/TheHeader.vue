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
    border-bottom: 1px solid black;
}
.headerInner {
    min-height: 50px;
}
</style>