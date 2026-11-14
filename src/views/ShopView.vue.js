/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useRouter } from 'vue-router';
const router = useRouter();
const shopUrl = 'https://' + 'www.matanzasriverkeeper.org/store';
const closeView = () => {
    router.push({ name: 'weather' });
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    void {};
    /** @type {__VLS_StyleScopedClasses['shop-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['shop-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "shop-page" },
    });
    /** @type {__VLS_StyleScopedClasses['shop-page']} */ ;
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "toolbar-spacer" },
    });
    /** @type {__VLS_StyleScopedClasses['toolbar-spacer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "shop-content" },
    });
    /** @type {__VLS_StyleScopedClasses['shop-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "shop-card" },
    });
    /** @type {__VLS_StyleScopedClasses['shop-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "shop-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['shop-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "pickup-note" },
    });
    /** @type {__VLS_StyleScopedClasses['pickup-note']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_unwrap(shopUrl, {})),
        target: "_self",
        ...{ class: "btn-shop-launch" },
    });
    /** @type {__VLS_StyleScopedClasses['btn-shop-launch']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "helper-caption" },
    });
    /** @type {__VLS_StyleScopedClasses['helper-caption']} */ ;
    // @ts-ignore
    [closeView, shopUrl,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
