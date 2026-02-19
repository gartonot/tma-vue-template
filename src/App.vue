<template>
    <div :class="$style.layout">
		<TheHeader />
		<main :class="$style.content">
			<RouterView/>
		</main>
		<TheFooter />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useTelegramWebApp } from '@/shared/telegram/useTelegramWebApp';

const {
	WebApp
} = useTelegramWebApp();

alert(WebApp.version);
alert(WebApp.platform);
alert(WebApp.isExpanded);
</script>

<style module>
.layout {
	height: var(--tma-vue-vh);
	display: grid;
	grid-template-rows: auto 1fr auto;
}
.content {
	overflow: auto;
}
</style>
