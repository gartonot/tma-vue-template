import WebApp from '@twa-dev/sdk';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

type WebAppTyped = typeof WebApp;
type SafeAreaInsetTyped = typeof WebApp.safeAreaInset | typeof WebApp.contentSafeAreaInset;

type Insets = { 
    top: number; 
    right: number; 
    bottom: number;
    left: number;
}

const readInsets = (object: SafeAreaInsetTyped): Insets => ({
    top: object.top,
    right: object.right,
    bottom: object.bottom,
    left: object.left,
})

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
    // Глобальные safeArea (края экрана)
    const safeArea = reactive<Insets>({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });
    // Контентный safeArea, то что телеграм считает безопасной зоной
    const contentSafeArea = reactive<Insets>({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

    // Высота вьюпорта
    const viewportHeight = ref(window.innerHeight);
    // Стабильная высота вьюпорта (позже забираем из WebApp, базово берём с экрана)
    const viewportStableHeight = ref(window.innerHeight);

    const syncFromWebApp = () => {
        // Заполняем глобальный safeArea
        Object.assign(safeArea, readInsets(WebApp.safeAreaInset));
        // Заполняем контентный safeArea
        Object.assign(contentSafeArea, readInsets(WebApp.contentSafeAreaInset));

        // Заполняем высоту из SDK телеграма
        viewportHeight.value = WebApp.viewportHeight || window.innerHeight;
        viewportStableHeight.value = WebApp.viewportStableHeight || viewportHeight.value;

        // Заполняем CSS vars из собранных safeArea и высоты viewport
        applyCssVars({
            '--tma-vue-safe-top': safeArea.top,
            '--tma-vue-safe-right': safeArea.right,
            '--tma-vue-safe-bottom': safeArea.bottom,
            '--tma-vue-safe-left': safeArea.left,

            '--tma-vue-content-safe-top': contentSafeArea.top,
            '--tma-vue-content-safe-right': contentSafeArea.right,
            '--tma-vue-content-safe-bottom': contentSafeArea.bottom,
            '--tma-vue-content-safe-left': contentSafeArea.left,

            '--tma-vue-vh': viewportHeight.value, // Текущая высота
            '--tma-vue-vh-stable': viewportStableHeight.value, // Стабильная высота
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

        // Пробуем открыть на весь экран, новое апи - может не везде работать
        try {
            WebApp.requestFullscreen?.();
        } catch {
            console.error('[TMA-vue] Method requestFullscreen failed')
        }

        // Синхронизируем данные с телеграмма в наше приложение
        syncFromWebApp();

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
        safeArea,
        contentSafeArea,
        viewportHeight,
        viewportStableHeight,
        // syncFromWebApp, // Пока что функция приватная, но если понадобиться снаружи, убрать комментарий текущей строки
    }
}

