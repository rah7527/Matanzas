<script setup lang="ts">
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
  if (!obs) return '';
  if (obs.formattedDate) return obs.formattedDate;
  return new Date(obs.rawTime).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
});

const airTempFahrenheit = computed(() => {
  const obs = weatherStore.latestObservation;
  if (!obs || obs.airTemperature === null || obs.airTemperature === undefined) return '--';
  return ((obs.airTemperature * 9) / 5 + 32).toFixed(1);
});

const barometerInches = computed(() => {
  const obs = weatherStore.latestObservation;
  if (!obs || obs.barometricPressure === null || obs.barometricPressure === undefined) return '--';
  return (obs.barometricPressure * 0.02953).toFixed(2);
});

const waterLevelFeet = computed(() => {
  const obs = weatherStore.latestObservation;
  if (!obs || obs.waterLevel === null || obs.waterLevel === undefined) return '--';
  return (obs.waterLevel * 3.28084).toFixed(2);
});

const windSpeedAvgMph = computed(() => {
  const obs = weatherStore.latestObservation;
  if (!obs || obs.windSpeedAvg === null || obs.windSpeedAvg === undefined) return '--';
  return (obs.windSpeedAvg * 2.23694).toFixed(1);
});
// Convert wind direction degrees (0-360) into a 16-point compass direction (±11.25° per sector)
const windCompassDirection = computed(() => {
  const obs = weatherStore.latestObservation;
  if (!obs || obs.windDirectionAvg === null || obs.windDirectionAvg === undefined) return '';

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
</script>

<template>
  <div class="weather-page">
    <header class="weather-header">
      <div class="header-left">
        <h2>Current Conditions</h2>
      </div>
      <button 
        @click="weatherStore.fetchSenseStreamData" 
        :disabled="weatherStore.isLoading"
        class="btn-refresh"
      >
        {{ weatherStore.isLoading ? 'Refreshing...' : '🔄 Refresh Latest' }}
      </button>
    </header>

    <div v-if="weatherStore.isLoading && !weatherStore.latestObservation" class="status-message">
      ⏳ Fetching latest 5-minute reading...
    </div>
    <div v-else-if="weatherStore.error && !weatherStore.latestObservation" class="status-message error">
      ⚠️ {{ weatherStore.error }}
    </div>
    <div v-else-if="!weatherStore.latestObservation" class="status-message">
      No data available yet. Tap Refresh to check again.
    </div>

    <div v-else class="latest-container">
      <div class="latest-banner" :class="{ fallback: weatherStore.isFallbackData }">
        <span>
          🕒 {{ weatherStore.isFallbackData ? 'Last Reading:' : 'Latest Post:' }} 
          <strong>{{ formattedPostDate }} {{ weatherStore.latestObservation.formattedTime }}</strong>
        </span>
        <span v-if="weatherStore.isFallbackData" class="fallback-badge">LAST GOOD</span>
        <span v-else class="live-badge">LIVE</span>
      </div>

      <div class="sensor-card">
        <!-- Row 1: Temperature -->
        <div class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Temperature:</span>
            <strong class="metric-value">{{ airTempFahrenheit }} °F</strong>
          </div>
          <div class="col-extra"></div>
        </div>

        <!-- Row 2: Humidity -->
        <div class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Humidity:</span>
            <strong class="metric-value">{{ weatherStore.latestObservation.relativeHumidity }} %</strong>
          </div>
          <div class="col-extra"></div>
        </div>
 <!-- Row 3: Barometer + Bold Rising/Falling/Steady SVG Arrow -->
        <div class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Barometer:</span>
            <strong class="metric-value">{{ barometerInches }} in</strong>
          </div>
          <div class="col-extra">
            <!-- Rising Arrow -->
            <svg
              v-if="weatherStore.barometerTrend === 'up'"
              class="trend-icon up"
              viewBox="0 0 24 24"
              aria-label="Barometer Rising"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>

            <!-- Falling Arrow -->
            <svg
              v-else-if="weatherStore.barometerTrend === 'down'"
              class="trend-icon down"
              viewBox="0 0 24 24"
              aria-label="Barometer Falling"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>

            <!-- Steady Horizontal Double-Headed Arrow -->
            <svg
              v-else-if="weatherStore.barometerTrend === 'steady'"
              class="trend-icon steady"
              viewBox="0 0 24 24"
              aria-label="Barometer Steady"
            >
              <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />
            </svg>
          </div>
        </div>

       <!-- Row 4: Water Level + Incoming/Outgoing Tide -->
        <div class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Water Level:</span>
            <strong class="metric-value">{{ waterLevelFeet }} ft</strong>
          </div>
          <div class="col-extra">
            <span v-if="weatherStore.tideTrend === 'incoming'" class="tide-status incoming">
              Incoming Tide
            </span>
            <span v-else-if="weatherStore.tideTrend === 'outgoing'" class="tide-status outgoing">
              Outgoing Tide
            </span>
          </div>
        </div>

        <!-- Row 5: Rain Today -->
        <div v-if="weatherStore.rainTodayInches !== null" class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Rain Today:</span>
            <strong class="metric-value">{{ weatherStore.rainTodayInches }} in</strong>
          </div>
          <div class="col-extra"></div>
        </div>

        <!-- Row 6: Rain - Month -->
        <div v-if="weatherStore.rainMonthInches !== null" class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Rain - {{ currentMonthName }}:</span>
            <strong class="metric-value">{{ weatherStore.rainMonthInches }} in</strong>
          </div>
          <div class="col-extra"></div>
        </div>

        <!-- Row 7: Rain - Year -->
        <div v-if="weatherStore.rainYearInches !== null" class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Rain - {{ currentYear }}:</span>
            <strong class="metric-value">{{ weatherStore.rainYearInches }} in</strong>
          </div>
          <div class="col-extra"></div>
        </div>

        <!-- Row 8: Wind Speed -->
        <div class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Wind Speed:</span>
            <strong class="metric-value">{{ windSpeedAvgMph }} mph</strong>
          </div>
          <div class="col-extra"></div>
        </div>

         <!-- Row 9: Wind Direction + 16-Point Compass Bearing -->
        <div class="metric-row">
          <div class="col-primary">
            <span class="metric-label">Wind Direction:</span>
            <strong class="metric-value">{{ weatherStore.latestObservation.windDirectionAvg }}°</strong>
          </div>
          <div class="col-extra">
            <span v-if="windCompassDirection" class="compass-badge">
              {{ windCompassDirection }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 16px;
  font-family: inherit;
  box-sizing: border-box;
}
.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.weather-header h2 {
  margin: 0;
  font-size: 18px;
  color: #262626;
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
  appearance: none;
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

.latest-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #0050b3;
  gap: 8px;
}
.latest-banner.fallback {
  background: #fffbe6;
  border-color: #ffe58f;
  color: #ad6800;
}

.live-badge {
  background: #52c41a;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 12px;
  white-space: nowrap;
}
.fallback-badge {
  background: #faad14;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 12px;
  white-space: nowrap;
}

.sensor-card {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

/* Two-Column Grid Row: Primary Metric (Left) + Secondary/Trend Column (Right) */
.metric-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  align-items: center;
  font-size: 15px;
  color: #595959;
  padding: 10px 0;
  border-bottom: 1px dashed #f0f0f0;
  gap: 12px;
}
.metric-row:last-child {
  border-bottom: none;
}

.col-primary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.metric-value {
  color: #262626;
  text-align: right;
}

.col-extra {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 20px;
  font-weight: 600;
  color: #262626;
}

.trend-icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  display: block;
}
.trend-icon.up {
  color: #389e0d;
}
.trend-icon.down {
  color: #cf1322;
}
.trend-icon.steady {
  color: #595959;
}

.trend-arrow.up {
  color: #389e0d;
}
.trend-arrow.down {
  color: #cf1322;
}
.trend-arrow.steady {
  color: #595959;
}
.compass-badge {
  font-size: 14px;
  font-weight: 700;
  color: #262626;
  letter-spacing: 0.5px;
}
@media (min-width: 600px) {
  .weather-header h2 {
    font-size: 22px;
  }
  .latest-banner {
    font-size: 14px;
  }
}
</style>