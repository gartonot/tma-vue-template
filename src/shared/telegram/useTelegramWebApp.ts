import WebApp from '@twa-dev/sdk';
import { onMounted } from 'vue';

export const useTelegramWebApp = () => {
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

        // Запрещаем вертикальный свайп
        WebApp.disableVerticalSwipes();
    });

    return {
        WebApp,
    }
}

