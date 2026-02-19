<template>
    <footer :class="$style.footer">
        <div :class="$style.footerInner">
            Footer
        </div>
    </footer>
</template>

<script setup lang="ts">
</script>

<style module>
.footer {
    padding-bottom: var(--tma-vue-content-safe-bottom);
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
    /* Custom */
    border-top: 1px solid black;
}
.footerInner {
    min-height: 50px;
}
</style>