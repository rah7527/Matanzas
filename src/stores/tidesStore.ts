import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface TideEvent {
  id: string;
  tideName: 'High' | 'Low' | 'Unknown';
  tideType: string;
  timeFormatted: string;
  readingFeet: string;
}

export interface TideDayGroup {
  dateKey: string;
  dayHeader: string;
  events: TideEvent[];
}

const CACHE_KEY = 'matanzas_tides_cache';

export const useTidesStore = defineStore('tidesStore', () => {
  const dailyGroups = ref<TideDayGroup[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const lastUpdated = ref<string | null>(null);

  const STATION_ID = '8720651'; // Matanzas River at Route 206
  const DATUM = 'NAVD';   

  // Formats a local Date into "yyyyMMdd" for NOAA API query params
  const formatNoaaParamDate = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}${mm}${dd}`;
  };

  // Parses NOAA timestamp "yyyy-MM-dd HH:mm" safely across Safari/Chrome on iOS
  const parseNoaaTimestamp = (tStr: string): Date => {
    const parts = tStr.split(' ');
    const datePart = parts.at(0) ?? '';
    const timePart = parts.at(1) ?? '00:00';

    const dateNums = datePart.split('-').map(Number);
    const timeNums = timePart.split(':').map(Number);

    return new Date(
      dateNums.at(0) ?? 2026,
      (dateNums.at(1) ?? 1) - 1,
      dateNums.at(2) ?? 1,
      timeNums.at(0) ?? 0,
      timeNums.at(1) ?? 0,
      0
    );
  };

  async function fetchTidePredictions() {
    isLoading.value = true;
    error.value = null;

    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);

    const beginStr = formatNoaaParamDate(today);
    const endStr = formatNoaaParamDate(endDate);

    const params = new URLSearchParams({
      begin_date: beginStr,
      end_date: endStr,
      station: STATION_ID,
      product: 'predictions',
      datum: DATUM,
      time_zone: 'lst_ldt',
      interval: 'hilo',
      units: 'english',
      application: 'Matanzas_WebApp',
      format: 'json'
    });

const url = `/noaa/api/prod/datagetter?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`NOAA API Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'NOAA returned an error.');
      }

      if (!Array.isArray(data.predictions)) {
        throw new Error('No tidal prediction data returned.');
      }

      // Group predictions by local calendar date
      const groupsMap = new Map<string, TideDayGroup>();

      data.predictions.forEach((item: any, idx: number) => {
        const tideDate = parseNoaaTimestamp(item.t);
        const dateKey = `${tideDate.getFullYear()}-${tideDate.getMonth() + 1}-${tideDate.getDate()}`;

        const dayHeader = tideDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        const timeFormatted = tideDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        });

        let tideName: 'High' | 'Low' | 'Unknown' = 'Unknown';
        if (item.type === 'H') tideName = 'High';
        else if (item.type === 'L') tideName = 'Low';

        const numericVal = parseFloat(item.v);
        const readingFeet = Number.isNaN(numericVal) ? item.v : numericVal.toFixed(2);

        const eventObj: TideEvent = {
          id: `${item.t}-${idx}`,
          tideName,
          tideType: item.type,
          timeFormatted,
          readingFeet
        };

        if (!groupsMap.has(dateKey)) {
          groupsMap.set(dateKey, {
            dateKey,
            dayHeader,
            events: []
          });
        }
        groupsMap.get(dateKey)?.events.push(eventObj);
      });

      dailyGroups.value = Array.from(groupsMap.values());
      lastUpdated.value = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });

      // Cache successful tide predictions for offline/fallback use
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          groups: dailyGroups.value,
          updated: lastUpdated.value
        }));
      } catch {
        // Ignore storage errors
      }
    } catch (err: any) {
      // Load cached predictions if offline or network fails
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          dailyGroups.value = parsed.groups ?? [];
          lastUpdated.value = parsed.updated ?? null;
        } else {
          error.value = err.message || 'Failed to load NOAA tide predictions.';
        }
      } catch {
        error.value = err.message || 'Failed to load NOAA tide predictions.';
      }
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    dailyGroups,
    isLoading,
    error,
    lastUpdated,
    fetchTidePredictions
  };
});