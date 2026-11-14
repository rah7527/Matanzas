<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const reportUrl = 'https://survey123.arcgis.com/share/6aeefc813ace4f76b055077f5da96dfe';
const isLoading = ref(true);

const closeView = () => {
  router.push({ name: 'weather' });
};
</script>

<template>
  <div class="embed-page">
    <div class="embed-toolbar">
      <button type="button" @click="closeView" class="btn-close">
        ✕ Close
      </button>
      <span class="embed-title">Report Pollution</span>
      <a
        :href="reportUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-external"
      >
        Browser ↗
      </a>
    </div>

    <div v-if="isLoading" class="loading-bar">
      ⏳ Loading reporting form...
    </div>

    <iframe
      :src="reportUrl"
      title="Matanzas Riverkeeper Pollution Observation Reporting Tool"
      class="embed-frame"
      allow="geolocation *; camera *"
      @load="isLoading = false"
    ></iframe>
  </div>
</template>

<style scoped>
.embed-page {
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 137px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  min-height: 400px;
  width: 100%;
  background: #ffffff;
  overflow: hidden;
}

.embed-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f0f5ff;
  border-bottom: 1px solid #d6e4ff;
  gap: 8px;
  flex-shrink: 0;
}

.btn-close {
  background: #ffffff;
  color: #262626;
  border: 1px solid #d9d9d9;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.embed-title {
  font-size: 13px;
  font-weight: 600;
  color: #1d39c4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.btn-external {
  background: #1890ff;
  color: #ffffff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.loading-bar {
  text-align: center;
  padding: 12px;
  font-size: 13px;
  color: #8c8c8c;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.embed-frame {
  flex: 1;
  width: 100%;
  border: none;
  display: block;
}
</style>
