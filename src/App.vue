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
	safeArea,
	contentSafeArea
} = useTelegramWebApp();

alert(JSON.stringify(safeArea));
alert(JSON.stringify(contentSafeArea));
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
