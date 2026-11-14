/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/rhowa/Documents/Projects/Matanzas/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const stationImageUrl = '/matanzas-weatherstation-2.jpg';
const jenAndSilasImageUrl = 'Jen_and_Silas.jpg';
const showImage = ref(true);
const mapContainer = ref(null);
const matanzasUrl = 'https://' + 'www.matanzasriverkeeper.org/';
const senseStreamUrl = 'https://' + 'www.sensestream.org/';
// Genung's Fish Camp coordinates
const lat = 29.7675;
const lon = -81.25601707497161;
const directionsUrl = 'https://' + `://apple.com{lat},${lon}`;
onMounted(() => {
    if (!mapContainer.value)
        return;
    const map = L.map(mapContainer.value).setView([lat, lon], 16);
    const tileUrl = 'https://' + '{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileUrl, {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.circleMarker([lat, lon], {
        radius: 10,
        fillColor: '#1890ff',
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.95
    })
        .addTo(map)
        .bindPopup("<strong>Matanzas Riverkeeper</strong><br>Genung's Fish Camp")
        .openPopup();
    // Force Leaflet to recalculate container dimensions after Vue finishes rendering
    setTimeout(() => {
        map.invalidateSize();
    }, 150);
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(showImage, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['about-body']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-link']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "about-page" },
    });
    /** @type {__VLS_StyleScopedClasses['about-page']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-card" },
    });
    /** @type {__VLS_StyleScopedClasses['info-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "section-title" },
    });
    /** @type {__VLS_StyleScopedClasses['section-title']} */ ;
    if (showImage.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "image-wrapper" },
        });
        /** @type {__VLS_StyleScopedClasses['image-wrapper']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            ...{ onError: (...[$event]) => {
                    void $event;
                    if (!(showImage.value))
                        throw 0;
                    return (showImage.value = false);
                    // @ts-ignore
                    [showImage, showImage,];
                } },
            src: (__VLS_unwrap(jenAndSilasImageUrl, {})),
            alt: "Jen and Silas",
            ...{ class: "station-photo" },
        });
        /** @type {__VLS_StyleScopedClasses['station-photo']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "about-body" },
    });
    /** @type {__VLS_StyleScopedClasses['about-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_unwrap(matanzasUrl, {})),
        target: "_self",
        ...{ class: "inline-link" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-link']} */ ;
    if (showImage.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "image-wrapper" },
        });
        /** @type {__VLS_StyleScopedClasses['image-wrapper']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            ...{ onError: (...[$event]) => {
                    void $event;
                    if (!(showImage.value))
                        throw 0;
                    return (showImage.value = false);
                    // @ts-ignore
                    [showImage, showImage, jenAndSilasImageUrl, matanzasUrl,];
                } },
            src: (__VLS_unwrap(stationImageUrl, {})),
            alt: "Matanzas Riverkeeper Weather Station",
            ...{ class: "station-photo" },
        });
        /** @type {__VLS_StyleScopedClasses['station-photo']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_unwrap(senseStreamUrl, {})),
        target: "_self",
        ...{ class: "inline-link" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-link']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-card" },
    });
    /** @type {__VLS_StyleScopedClasses['info-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "section-title" },
    });
    /** @type {__VLS_StyleScopedClasses['section-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "map-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['map-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "mapContainer",
        ...{ class: "location-map" },
    });
    /** @type {__VLS_StyleScopedClasses['location-map']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "location-details" },
    });
    /** @type {__VLS_StyleScopedClasses['location-details']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "location-intro" },
    });
    /** @type {__VLS_StyleScopedClasses['location-intro']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.address, __VLS_intrinsics.address)({
        ...{ class: "office-address" },
    });
    /** @type {__VLS_StyleScopedClasses['office-address']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.br)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.br)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: "tel:+19044719878",
        ...{ class: "phone-link" },
    });
    /** @type {__VLS_StyleScopedClasses['phone-link']} */ ;
    // @ts-ignore
    [stationImageUrl, senseStreamUrl,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
