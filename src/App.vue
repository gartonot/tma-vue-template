<template>
    <div :class="$style.layout">
		<TheHeader :class="$style.header" />
		<main :class="$style.content">
			<pre>{{ WebApp.contentSafeAreaInset }}</pre>
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

const { WebApp } = useTelegramWebApp();
</script>

<style module>
.layout {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.header {
	padding-top: var(--tg-content-safe-area-inset-top);
    padding-left: var(--tg-content-safe-area-inset-left);
    padding-right: var(--tg-content-safe-area-inset-right);
}
.content {
	overflow: auto;
	flex-grow: 1;
	min-height: 0;
	-webkit-overflow-scrolling: touch; /* Планый скролл для IOS */
}
.footer {
	padding-bottom: var(--tg-content-safe-area-inset-bottom);
    padding-left: var(--tg-content-safe-area-inset-left);
    padding-right: var(--tg-content-safe-area-inset-right);
}
</style>
