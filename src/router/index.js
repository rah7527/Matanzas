import { createRouter, createWebHistory } from 'vue-router';
import WeatherView from '@/views/WeatherView.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'weather',
            component: WeatherView
        },
        {
            path: '/tides',
            name: 'tides',
            component: () => import('@/views/TidesView.vue')
        },
        {
            path: '/page-one',
            name: 'external-one',
            component: () => import('@/views/ReportView.vue')
        },
        {
            path: '/page-two',
            name: 'external-two',
            component: () => import('@/views/ShopView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutView.vue')
        }
    ]
});
export default router;
