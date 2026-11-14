/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { onMounted } from 'vue';
import { useTidesStore } from '@/stores/tidesStore';
const tidesStore = useTidesStore();
onMounted(() => {
    tidesStore.fetchTidePredictions();
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(tidesStore, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['btn-refresh']} */ ;
    /** @type {__VLS_StyleScopedClasses['status-message']} */ ;
    /** @type {__VLS_StyleScopedClasses['day-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['tide-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['tide-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['high']} */ ;
    /** @type {__VLS_StyleScopedClasses['tide-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['tide-label']} */ ;
    /** @type {__VLS_StyleScopedClasses['low']} */ ;
    /** @type {__VLS_StyleScopedClasses['header-text']} */ ;
    /** @type {__VLS_StyleScopedClasses['days-grid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tides-page" },
    });
    /** @type {__VLS_StyleScopedClasses['tides-page']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "tides-header" },
    });
    /** @type {__VLS_StyleScopedClasses['tides-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-text" },
    });
    /** @type {__VLS_StyleScopedClasses['header-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "station-sub" },
    });
    /** @type {__VLS_StyleScopedClasses['station-sub']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (tidesStore.value.fetchTidePredictions) },
        disabled: (tidesStore.value.isLoading),
        ...{ class: "btn-refresh" },
    });
    /** @type {__VLS_StyleScopedClasses['btn-refresh']} */ ;
    (tidesStore.value.isLoading ? 'Loading...' : '🔄 Refresh');
    if (tidesStore.value.isLoading && tidesStore.value.dailyGroups.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "status-message" },
        });
        /** @type {__VLS_StyleScopedClasses['status-message']} */ ;
    }
    else if (tidesStore.value.error && tidesStore.value.dailyGroups.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "status-message error" },
        });
        /** @type {__VLS_StyleScopedClasses['status-message']} */ ;
        /** @type {__VLS_StyleScopedClasses['error']} */ ;
        (tidesStore.value.error);
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "days-grid" },
        });
        /** @type {__VLS_StyleScopedClasses['days-grid']} */ ;
        const __VLS_0 = __VLS_tryAsConstant((tidesStore.value.dailyGroups));
        for (const [group, index] of __VLS_vFor(__VLS_nonNull(__VLS_0))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (group.dateKey),
                ...{ class: "day-card" },
                ...{ class: ({ 'is-today': index === 0 }) },
            });
            /** @type {__VLS_StyleScopedClasses['day-card']} */ ;
            /** @type {__VLS_StyleScopedClasses['is-today']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "day-card-header" },
            });
            /** @type {__VLS_StyleScopedClasses['day-card-header']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "day-title" },
            });
            /** @type {__VLS_StyleScopedClasses['day-title']} */ ;
            (group.dayHeader);
            if (index === 0) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "today-badge" },
                });
                /** @type {__VLS_StyleScopedClasses['today-badge']} */ ;
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "events-list" },
            });
            /** @type {__VLS_StyleScopedClasses['events-list']} */ ;
            const __VLS_1 = __VLS_tryAsConstant((group.events));
            for (const [event] of __VLS_vFor(__VLS_nonNull(__VLS_1))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    key: (event.id),
                    ...{ class: "tide-row" },
                });
                /** @type {__VLS_StyleScopedClasses['tide-row']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "tide-type-col" },
                });
                /** @type {__VLS_StyleScopedClasses['tide-type-col']} */ ;
                if (event.tideName === 'High') {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                        ...{ class: "tide-icon high" },
                        viewBox: "0 0 24 24",
                        'aria-label': "High Tide",
                    });
                    /** @type {__VLS_StyleScopedClasses['tide-icon']} */ ;
                    /** @type {__VLS_StyleScopedClasses['high']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                        d: "M12 19V5M5 12l7-7 7 7",
                    });
                }
                else if (event.tideName === 'Low') {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                        ...{ class: "tide-icon low" },
                        viewBox: "0 0 24 24",
                        'aria-label': "Low Tide",
                    });
                    /** @type {__VLS_StyleScopedClasses['tide-icon']} */ ;
                    /** @type {__VLS_StyleScopedClasses['low']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                        d: "M12 5v14M5 12l7 7 7-7",
                    });
                }
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "tide-label" },
                    ...{ class: (event.tideName.toLowerCase()) },
                });
                /** @type {__VLS_StyleScopedClasses['tide-label']} */ ;
                (event.tideName);
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "tide-time-col" },
                });
                /** @type {__VLS_StyleScopedClasses['tide-time-col']} */ ;
                (event.timeFormatted);
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "tide-height-col" },
                });
                /** @type {__VLS_StyleScopedClasses['tide-height-col']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
                (event.readingFeet);
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "unit" },
                });
                /** @type {__VLS_StyleScopedClasses['unit']} */ ;
                // @ts-ignore
                [tidesStore, tidesStore, tidesStore, tidesStore, tidesStore, tidesStore, tidesStore, tidesStore, tidesStore,];
            }
            // @ts-ignore
            [];
        }
    }
    // @ts-ignore
    [];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
