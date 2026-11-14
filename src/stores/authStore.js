import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useAuthStore = defineStore('authStore', () => {
    // Read initial state from localStorage
    const isAuthenticated = ref(localStorage.getItem('is_auth') === 'true');
    const userEmail = ref(localStorage.getItem('user_email'));
    function login(email) {
        isAuthenticated.value = true;
        userEmail.value = email;
        localStorage.setItem('is_auth', 'true');
        localStorage.setItem('user_email', email);
    }
    function logout() {
        isAuthenticated.value = false;
        userEmail.value = null;
        localStorage.removeItem('is_auth');
        localStorage.removeItem('user_email');
    }
    return { isAuthenticated, userEmail, login, logout };
});
