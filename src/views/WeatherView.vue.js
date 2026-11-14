/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { onMounted, computed } from 'vue';
import { useWeatherStore } from '@/stores/weatherStore';
const weatherStore = useWeatherStore();
onMounted(() => {
    weatherStore.fetchSenseStreamData();
});
const currentMonthName = computed(() => {
    return new Date().toLocaleString('en-US', { month: 'long' });
});
const currentYear = computed(() => {
    return new Date().getFullYear();
});
// Ensure date formats cleanly even if an older cached object didn't have formattedDate yet
const formattedPostDate = computed(() => {
    const obs = weatherStore.latestObservation;
    if (!obs)
        return '';
    if (obs.formattedDate)
        return obs.formattedDate;
    return new Date(obs.rawTime).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
});
const airTempFahrenheit = computed(() => {
    const obs = weatherStore.latestObservation;
    if (!obs || obs.airTemperature === null || obs.airTemperature === undefined)
        return '--';
    return ((obs.airTemperature * 9) / 5 + 32).toFixed(1);
});
const barometerInches = computed(() => {
    const obs = weatherStore.latestObservation;
    if (!obs || obs.barometricPressure === null || obs.barometricPressure === undefined)
        return '--';
    return (obs.barometricPressure * 0.02953).toFixed(2);
});
const waterLevelFeet = computed(() => {
    const obs = weatherStore.latestObservation;
    if (!obs || obs.waterLevel === null || obs.waterLevel === undefined)
        return '--';
    return (obs.waterLevel * 3.28084).toFixed(2);
});
const windSpeedAvgMph = computed(() => {
    const obs = weatherStore.latestObservation;
    if (!obs || obs.windSpeedAvg === null || obs.windSpeedAvg === undefined)
        return '--';
    return (obs.windSpeedAvg * 2.23694).toFixed(1);
});
// Convert wind direction degrees (0-360) into a 16-point compass direction (±11.25° per sector)
const windCompassDirection = computed(() => {
    const obs = weatherStore.latestObservation;
    if (!obs || obs.windDirectionAvg === null || obs.windDirectionAvg === undefined)
        return '';
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];
    // Normalize negative or >360 angles safely, then shift by +11.25° so each 22.5° bin centers on its bearing
    const normalized = ((obs.windDirectionAvg % 360) + 360) % 360;
    const index = Math.floor(((normalized + 11.25) % 360) / 22.5);
    return directions.at(index) ?? '';
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(weatherStore, {});
    __VLS_withDotValue(windCompassDirection, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['weather-header']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-refresh']} */ ;
    /** @type {__VLS_StyleScopedClasses['status-message']} */ ;
    /** @type {__VLS_StyleScopedClasses['latest-banner']} */ ;
    /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['up']} */ ;
    /** @type {__VLS_StyleScopedClasses['trend-arrow']} */ ;
    /** @type {__VLS_StyleScopedClasses['down']} */ ;
    /** @type {__VLS_StyleScopedClasses['trend-arrow']} */ ;
    /** @type {__VLS_StyleScopedClasses['steady']} */ ;
    /** @type {__VLS_StyleScopedClasses['weather-header']} */ ;
    /** @type {__VLS_StyleScopedClasses['latest-banner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "weather-page" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-page']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "weather-header" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-left" },
    });
    /** @type {__VLS_StyleScopedClasses['header-left']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (weatherStore.value.fetchSenseStreamData) },
        disabled: (weatherStore.value.isLoading),
        ...{ class: "btn-refresh" },
    });
    /** @type {__VLS_StyleScopedClasses['btn-refresh']} */ ;
    (weatherStore.value.isLoading ? 'Refreshing...' : '🔄 Refresh Latest');
    if (weatherStore.value.isLoading && !weatherStore.value.latestObservation) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "status-message" },
        });
        /** @type {__VLS_StyleScopedClasses['status-message']} */ ;
    }
    else if (weatherStore.value.error && !weatherStore.value.latestObservation) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "status-message error" },
        });
        /** @type {__VLS_StyleScopedClasses['status-message']} */ ;
        /** @type {__VLS_StyleScopedClasses['error']} */ ;
        (weatherStore.value.error);
    }
    else if (!weatherStore.value.latestObservation) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "status-message" },
        });
        /** @type {__VLS_StyleScopedClasses['status-message']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "latest-container" },
        });
        /** @type {__VLS_StyleScopedClasses['latest-container']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "latest-banner" },
            ...{ class: ({ fallback: weatherStore.value.isFallbackData }) },
        });
        /** @type {__VLS_StyleScopedClasses['latest-banner']} */ ;
        /** @type {__VLS_StyleScopedClasses['fallback']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (weatherStore.value.isFallbackData ? 'Last Reading:' : 'Latest Post:');
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (__VLS_unwrap(formattedPostDate, {}));
        (weatherStore.value.latestObservation.formattedTime);
        if (weatherStore.value.isFallbackData) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "fallback-badge" },
            });
            /** @type {__VLS_StyleScopedClasses['fallback-badge']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "live-badge" },
            });
            /** @type {__VLS_StyleScopedClasses['live-badge']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "sensor-card" },
        });
        /** @type {__VLS_StyleScopedClasses['sensor-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "metric-row" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-primary" },
        });
        /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "metric-label" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "metric-value" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
        (__VLS_unwrap(airTempFahrenheit, {}));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-extra" },
        });
        /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "metric-row" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-primary" },
        });
        /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "metric-label" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "metric-value" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
        (weatherStore.value.latestObservation.relativeHumidity);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-extra" },
        });
        /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "metric-row" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-primary" },
        });
        /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "metric-label" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "metric-value" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
        (__VLS_unwrap(barometerInches, {}));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-extra" },
        });
        /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        if (weatherStore.value.barometerTrend === 'up') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "trend-icon up" },
                viewBox: "0 0 24 24",
                'aria-label': "Barometer Rising",
            });
            /** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
            /** @type {__VLS_StyleScopedClasses['up']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                d: "M12 19V5M5 12l7-7 7 7",
            });
        }
        else if (weatherStore.value.barometerTrend === 'down') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "trend-icon down" },
                viewBox: "0 0 24 24",
                'aria-label': "Barometer Falling",
            });
            /** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
            /** @type {__VLS_StyleScopedClasses['down']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                d: "M12 5v14M5 12l7 7 7-7",
            });
        }
        else if (weatherStore.value.barometerTrend === 'steady') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "trend-icon steady" },
                viewBox: "0 0 24 24",
                'aria-label': "Barometer Steady",
            });
            /** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
            /** @type {__VLS_StyleScopedClasses['steady']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                d: "M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4",
            });
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "metric-row" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-primary" },
        });
        /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "metric-label" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "metric-value" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
        (__VLS_unwrap(waterLevelFeet, {}));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-extra" },
        });
        /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        if (weatherStore.value.tideTrend === 'incoming') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "tide-status incoming" },
            });
            /** @type {__VLS_StyleScopedClasses['tide-status']} */ ;
            /** @type {__VLS_StyleScopedClasses['incoming']} */ ;
        }
        else if (weatherStore.value.tideTrend === 'outgoing') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "tide-status outgoing" },
            });
            /** @type {__VLS_StyleScopedClasses['tide-status']} */ ;
            /** @type {__VLS_StyleScopedClasses['outgoing']} */ ;
        }
        if (weatherStore.value.rainTodayInches !== null) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "metric-row" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "col-primary" },
            });
            /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "metric-label" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
                ...{ class: "metric-value" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
            (weatherStore.value.rainTodayInches);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "col-extra" },
            });
            /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        }
        if (weatherStore.value.rainMonthInches !== null) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "metric-row" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "col-primary" },
            });
            /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "metric-label" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
            (__VLS_unwrap(currentMonthName, {}));
            __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
                ...{ class: "metric-value" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
            (weatherStore.value.rainMonthInches);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "col-extra" },
            });
            /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        }
        if (weatherStore.value.rainYearInches !== null) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "metric-row" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "col-primary" },
            });
            /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "metric-label" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
            (__VLS_unwrap(currentYear, {}));
            __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
                ...{ class: "metric-value" },
            });
            /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
            (weatherStore.value.rainYearInches);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "col-extra" },
            });
            /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "metric-row" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-primary" },
        });
        /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "metric-label" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "metric-value" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
        (__VLS_unwrap(windSpeedAvgMph, {}));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-extra" },
        });
        /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "metric-row" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-primary" },
        });
        /** @type {__VLS_StyleScopedClasses['col-primary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "metric-label" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "metric-value" },
        });
        /** @type {__VLS_StyleScopedClasses['metric-value']} */ ;
        (weatherStore.value.latestObservation.windDirectionAvg);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-extra" },
        });
        /** @type {__VLS_StyleScopedClasses['col-extra']} */ ;
        if (windCompassDirection.value) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "compass-badge" },
            });
            /** @type {__VLS_StyleScopedClasses['compass-badge']} */ ;
            (windCompassDirection.value);
        }
    }
    // @ts-ignore
    [weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, weatherStore, formattedPostDate, airTempFahrenheit, barometerInches, waterLevelFeet, currentMonthName, currentYear, windSpeedAvgMph, windCompassDirection, windCompassDirection,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
