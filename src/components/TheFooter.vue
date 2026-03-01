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
    border-top: 1px solid black;
}
.footerInner {
    min-height: 50px;
}
</style>