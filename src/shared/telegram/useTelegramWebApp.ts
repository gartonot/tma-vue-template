import WebApp from '@twa-dev/sdk';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

type Insets = { 
    top: number; 
    right: number; 
    bottom: number;
    left: number;
}

// Заполняем css var в :root
const applyCssVars = (vars: Record<string, number | string>) => {
    const root = document.documentElement; // HTML элемент (:root)
    const varsObject = Object.entries(vars);
    varsObject.forEach(([key, value]) => {
        const formattedValue = typeof value === 'number' ? `${value}px` : value;
        // Сетим значение переменной в :root
        root.style.setProperty(key, formattedValue);
    })
}

export const useTelegramWebApp = () => {
    // Контентный safeArea, то что телеграм считает безопасной зоной
    const contentSafeArea = reactive<Insets>({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

    // Стабильная высота вьюпорта (позже забираем из WebApp, базово берём с экрана)
    const viewportStableHeight = ref(window.innerHeight);

    const syncFromWebApp = () => {
        // Заполняем контентный safeArea
        const webAppAreaInset = {
            top: WebApp.contentSafeAreaInset.top,
            right: WebApp.contentSafeAreaInset.right,
            bottom: WebApp.contentSafeAreaInset.bottom,
            left: WebApp.contentSafeAreaInset.left,
        }
        Object.assign(contentSafeArea, webAppAreaInset);

        // Заполняем высоту из SDK телеграма
        viewportStableHeight.value = WebApp.viewportStableHeight || window.innerHeight;

        // Заполняем CSS vars из собранных safeArea и высоты viewport
        applyCssVars({
            '--tma-vue-content-safe-top': contentSafeArea.top,
            '--tma-vue-content-safe-right': contentSafeArea.right,
            '--tma-vue-content-safe-bottom': contentSafeArea.bottom,
            '--tma-vue-content-safe-left': contentSafeArea.left,

            '--tma-vue-vh-stable': viewportStableHeight.value,
        });
    }

    // Методя для проверки, что изменился viewport (наприимер открылась клавиатура)
    const onViewportChanged = () => syncFromWebApp();

    // Стартуем настройку TMA
    onMounted(() => {
        // Говорим телеграму, что мы готовы начать работу с ним
        WebApp.ready();

        // Просим растянуть приложение
        WebApp.expand();

        // Синхронизируем данные с телеграмма в наше приложение
        syncFromWebApp();

        // Пробуем открыть на весь экран, новое апи - может не везде работать
        try {
            WebApp.requestFullscreen?.();

            setTimeout(() => {
                  syncFromWebApp();
            }, 300);
        } catch {
            console.error('[TMA-vue] Method requestFullscreen failed')
        }

        WebApp.onEvent('viewportChanged', onViewportChanged);
        WebApp.onEvent('safeAreaChanged', onViewportChanged);
        WebApp.onEvent('contentSafeAreaChanged', onViewportChanged);

        // Фолбек для ресайза, на случай открытия клавиатуры
        window.addEventListener('resize', onViewportChanged);
    });

    // Уничтожаем подписки при размонтировании
    onUnmounted(() => {
        WebApp.offEvent('viewportChanged', onViewportChanged);
        WebApp.offEvent('safeAreaChanged', onViewportChanged);
        WebApp.offEvent('contentSafeAreaChanged', onViewportChanged);

        window.removeEventListener('resize', onViewportChanged);
    })

    return {
        WebApp,
        contentSafeArea,
        viewportStableHeight,
    }
}

