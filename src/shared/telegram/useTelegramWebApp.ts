import WebApp from '@twa-dev/sdk';
import { onMounted, onUnmounted, ref } from 'vue';

export const useTelegramWebApp = () => {
    const telegramTopOffset = ref(0);

     const sync = () => {
        const viewportStableHeight = WebApp.viewportStableHeight || window.innerHeight;
        const viewportHeight = WebApp.viewportHeight || viewportStableHeight;

        telegramTopOffset.value = Math.max(0, viewportStableHeight - viewportHeight);
    };


    // Стартуем настройку TMA
    onMounted(() => {
        // Говорим телеграму, что мы готовы начать работу с ним
        WebApp.ready();

        // Просим растянуть приложение
        WebApp.expand();

        // Пробуем открыть на весь экран, новое апи - может не везде работать
        try {
            WebApp.requestFullscreen?.();
        } catch {
            console.error('[TMA-vue] Method requestFullscreen failed')
        }

        sync();

        // Запрещаем вертикальный свайп
        WebApp.disableVerticalSwipes();

        WebApp.onEvent('viewportChanged', sync);
        window.addEventListener('resize', sync);
    });

    onUnmounted(() => {
        WebApp.offEvent('viewportChanged', sync);
        window.removeEventListener('resize', sync);
    })

    return {
        WebApp,
        telegramTopOffset,
    }
}

