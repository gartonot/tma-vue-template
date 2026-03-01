<template>
    <div :class="$style.layout">
		<TheHeader :class="$style.header" />
		<main :class="$style.content">
			<RouterView/>
		</main>
		<TheFooter :class="$style.footer" />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useTelegramWebApp } from '@/shared/telegram/useTelegramWebApp';

useTelegramWebApp();
</script>

<style module>
.layout {
	position: fixed;
	inset: 0;
	display: flex;
	flex-direction: column;
	min-height: 0;
}
.header {
	padding-top: calc(var(--tma-vue-content-safe-top));
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
}
.content {
	overflow: auto;
	flex-grow: 1;
	min-height: 0;
	/* -webkit-overflow-scrolling: touch; */
}
.footer {
	padding-bottom: calc(var(--tma-vue-content-safe-bottom));
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
}
</style>
