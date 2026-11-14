<script setup lang="ts">
import { onMounted } from 'vue';
import { useTidesStore } from '@/stores/tidesStore';

const tidesStore = useTidesStore();

onMounted(() => {
  tidesStore.fetchTidePredictions();
});
</script>

<template>
  <div class="tides-page">
    <header class="tides-header">
      <div class="header-text">
        <h2>Tidal Predictions</h2>
        <p class="station-sub">Matanzas River at Route 206 (NOAA 8720651)</p>
      </div>
      <button
        @click="tidesStore.fetchTidePredictions"
        :disabled="tidesStore.isLoading"
        class="btn-refresh"
      >
        {{ tidesStore.isLoading ? 'Loading...' : '🔄 Refresh' }}
      </button>
    </header>

    <div v-if="tidesStore.isLoading && tidesStore.dailyGroups.length === 0" class="status-message">
      ⏳ Fetching 7-day NOAA tide predictions...
    </div>

    <div v-else-if="tidesStore.error && tidesStore.dailyGroups.length === 0" class="status-message error">
      ⚠️ {{ tidesStore.error }}
    </div>

    <div v-else class="days-grid">
      <div
        v-for="(group, index) in tidesStore.dailyGroups"
        :key="group.dateKey"
        class="day-card"
        :class="{ 'is-today': index === 0 }"
      >
        <div class="day-card-header">
          <span class="day-title">{{ group.dayHeader }}</span>
          <span v-if="index === 0" class="today-badge">TODAY</span>
        </div>

        <div class="events-list">
          <div
            v-for="event in group.events"
            :key="event.id"
            class="tide-row"
          >
            <div class="tide-type-col">
              <!-- High Tide Bold Up Arrow -->
              <svg
                v-if="event.tideName === 'High'"
                class="tide-icon high"
                viewBox="0 0 24 24"
                aria-label="High Tide"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>

              <!-- Low Tide Bold Down Arrow -->
              <svg
                v-else-if="event.tideName === 'Low'"
                class="tide-icon low"
                viewBox="0 0 24 24"
                aria-label="Low Tide"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>

              <span class="tide-label" :class="event.tideName.toLowerCase()">
                {{ event.tideName }}
              </span>
            </div>

            <div class="tide-time-col">
              {{ event.timeFormatted }}
            </div>

            <div class="tide-height-col">
              <strong>{{ event.readingFeet }}</strong> <span class="unit">ft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tides-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  font-family: inherit;
  box-sizing: border-box;
}

.tides-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.header-text h2 {
  margin: 0 0 4px 0;
  font-size: 18px;
  color: #262626;
}

.station-sub {
  margin: 0;
  font-size: 12px;
  color: #8c8c8c;
}

.btn-refresh {
  background: #1890ff;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.btn-refresh:disabled {
  background: #91d5ff;
  cursor: not-allowed;
}

.status-message {
  text-align: center;
  padding: 40px 0;
  font-size: 16px;
  color: #8c8c8c;
}

.status-message.error {
  color: #ff4d4f;
}

.days-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.day-card {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

.day-card.is-today {
  border-color: #91d5ff;
  box-shadow: 0 2px 10px rgba(24, 144, 255, 0.08);
}

.day-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
}

.day-title {
  font-weight: 700;
  font-size: 15px;
  color: #262626;
}

.today-badge {
  background: #1890ff;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  letter-spacing: 0.5px;
}

.events-list {
  display: flex;
  flex-direction: column;
}

.tide-row {
  display: grid;
  grid-template-columns: 1fr 1fr 0.9fr;
  align-items: center;
  padding: 9px 0;
  border-bottom: 1px dashed #f0f0f0;
  font-size: 15px;
}

.tide-row:last-child {
  border-bottom: none;
  padding-bottom: 2px;
}

.tide-type-col {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tide-icon {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}

.tide-icon.high,
.tide-label.high {
  color: #096dd9;
  font-weight: 600;
}

.tide-icon.low,
.tide-label.low {
  color: #d46b08;
  font-weight: 600;
}

.tide-time-col {
  color: #595959;
  text-align: center;
  font-weight: 500;
}

.tide-height-col {
  text-align: right;
  color: #262626;
}

.unit {
  font-size: 13px;
  color: #8c8c8c;
}

@media (min-width: 640px) {
  .header-text h2 {
    font-size: 22px;
  }
  .days-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>