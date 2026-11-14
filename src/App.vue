<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-shell">
    <!-- Persistent Top Brand Header (Inline SVG - Never Breaks) -->
    <header class="app-header">
      <!-- Persistent Top Brand Header -->
    <header class="app-header">
      <img
        src="/MatanzasRiverkeeper.jpg"
        alt="Matanzas Riverkeeper"
        class="brand-logo"
      />
    </header>
    </header>

    <main class="page-content">
      <RouterView />
    </main>

    <!-- Persistent Bottom Navigation Bar -->
    <nav class="bottom-nav">
      <RouterLink :to="{ name: 'weather' }" class="nav-item">
        <span class="nav-icon">🌦️</span>
        <span class="nav-label">Weather</span>
      </RouterLink>
      <RouterLink :to="{ name: 'tides' }" class="nav-item">
        <span class="nav-icon">🌊</span>
        <span class="nav-label">Tides</span>
      </RouterLink>
      <RouterLink :to="{ name: 'external-one' }" class="nav-item">
        <span class="nav-icon">💬</span>
        <span class="nav-label">Report</span>
      </RouterLink>
      <RouterLink :to="{ name: 'external-two' }" class="nav-item">
        <span class="nav-icon">🛒</span>
        <span class="nav-label">Shop</span>
      </RouterLink>
      <RouterLink :to="{ name: 'about' }" class="nav-item">
        <span class="nav-icon">ℹ️</span>
        <span class="nav-label">About</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
}
</style>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  padding-top: calc(10px + env(safe-area-inset-top));
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
}

.brand-logo {
  height: 86px;
  width: auto;
  max-width: 100%;
  display: block;
}

.page-content {
  flex: 1;
  padding-bottom: calc(76px + env(safe-area-inset-bottom));
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 8px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #8c8c8c;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  gap: 3px;
  flex: 1;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}

.nav-icon {
  font-size: 20px;
  line-height: 1;
}

.nav-item.router-link-exact-active {
  color: #1890ff;
  font-weight: 700;
}
</style>