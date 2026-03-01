<template>
    <div :class="$style.layout">
		<TheHeader :class="$style.header" />
		<main :class="$style.content">
			<pre>{{ contentSafeArea }}</pre>
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

const { contentSafeArea } = useTelegramWebApp();
</script>

<style module>
.layout {
	display: flex;
	flex-direction: column;
	height: var(--tma-vue-vh-stable);
	min-height: 0;
}
.header {
	/* padding-top: var(--tma-vue-content-safe-top); */
	padding-top: var(--tg-content-safe-area-inset-top);
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
}
.content {
	overflow: auto;
	flex-grow: 1;
	min-height: 0;
	-webkit-overflow-scrolling: touch; /* Планый скролл для IOS */
}
.footer {
	/* padding-bottom: var(--tma-vue-content-safe-bottom); */
	padding-bottom: var(--tg-content-safe-area-inset-bottom);
    padding-left: var(--tma-vue-content-safe-left);
    padding-right: var(--tma-vue-content-safe-right);
}
</style>
