/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const reportUrl = 'https://survey123.arcgis.com/share/6aeefc813ace4f76b055077f5da96dfe';
const isLoading = ref(true);
const closeView = () => {
    router.push({ name: 'weather' });
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(isLoading, {});
    void {};
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "embed-page" },
    });
    /** @type {__VLS_StyleScopedClasses['embed-page']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "embed-toolbar" },
    });
    /** @type {__VLS_StyleScopedClasses['embed-toolbar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_unwrap(closeView, {})) },
        type: "button",
        ...{ class: "btn-close" },
    });
    /** @type {__VLS_StyleScopedClasses['btn-close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "embed-title" },
    });
    /** @type {__VLS_StyleScopedClasses['embed-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_unwrap(reportUrl, {})),
        target: "_blank",
        rel: "noopener noreferrer",
        ...{ class: "btn-external" },
    });
    /** @type {__VLS_StyleScopedClasses['btn-external']} */ ;
    if (isLoading.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "loading-bar" },
        });
        /** @type {__VLS_StyleScopedClasses['loading-bar']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.iframe, __VLS_intrinsics.iframe)({
        ...{ onLoad: (...[$event]) => {
                void $event;
                return (isLoading.value = false);
                // @ts-ignore
                [closeView, reportUrl, isLoading, isLoading,];
            } },
        src: (__VLS_unwrap(reportUrl, {})),
        title: "Matanzas Riverkeeper Pollution Observation Reporting Tool",
        ...{ class: "embed-frame" },
        allow: "geolocation *; camera *",
    });
    /** @type {__VLS_StyleScopedClasses['embed-frame']} */ ;
    // @ts-ignore
    [reportUrl,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
