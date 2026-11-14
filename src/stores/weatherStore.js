import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
const CACHE_KEY = 'matanzas_last_weather';
const PREV_CACHE_KEY = 'matanzas_prev_weather';
const BASELINE_CACHE_KEY = 'matanzas_rain_baselines';
export const useWeatherStore = defineStore('weatherStore', () => {
    const loadSingleCache = (key) => {
        try {
            const cached = localStorage.getItem(key);
            if (!cached)
                return null;
            const parsed = JSON.parse(cached);
            return Array.isArray(parsed) ? parsed.at(0) ?? null : parsed;
        }
        catch {
            return null;
        }
    };
    const initialLatest = loadSingleCache(CACHE_KEY);
    const observations = ref(initialLatest ? [initialLatest] : []);
    const previousObservation = ref(loadSingleCache(PREV_CACHE_KEY));
    const isLoading = ref(false);
    const error = ref(null);
    const isFallbackData = ref(false);
    const baselineTodayMm = ref(null);
    const baselineMonthMm = ref(null);
    const baselineYearMm = ref(null);
    const latestObservation = computed(() => {
        return observations.value.length > 0 ? observations.value.at(0) ?? null : null;
    });
    // Barometer trend comparing previous reading to current reading (in inches of mercury)
    const barometerTrend = computed(() => {
        const current = latestObservation.value;
        const prev = previousObservation.value;
        if (!current || !prev)
            return null;
        if (current.barometricPressure === undefined || prev.barometricPressure === undefined)
            return null;
        const currentIn = Number((current.barometricPressure * 0.02953).toFixed(2));
        const prevIn = Number((prev.barometricPressure * 0.02953).toFixed(2));
        if (currentIn > prevIn)
            return 'up';
        if (currentIn < prevIn)
            return 'down';
        return 'steady';
    });
    // Water level trend comparing previous reading to current reading (in feet)
    const tideTrend = computed(() => {
        const current = latestObservation.value;
        const prev = previousObservation.value;
        if (!current || !prev)
            return null;
        if (current.waterLevel === null || current.waterLevel === undefined)
            return null;
        if (prev.waterLevel === null || prev.waterLevel === undefined)
            return null;
        const currentFt = Number((current.waterLevel * 3.28084).toFixed(2));
        const prevFt = Number((prev.waterLevel * 3.28084).toFixed(2));
        if (currentFt > prevFt)
            return 'incoming';
        if (currentFt < prevFt)
            return 'outgoing';
        return null; // Display nothing if equal
    });
    const calculateRainDeltaInches = (baselineMm) => {
        const obs = latestObservation.value;
        if (!obs || obs.rainAccumulation === null || obs.rainAccumulation === undefined)
            return null;
        if (baselineMm === null || baselineMm === undefined)
            return null;
        const deltaMm = obs.rainAccumulation - baselineMm;
        if (deltaMm < 0)
            return null;
        return (deltaMm / 25.4).toFixed(2);
    };
    const rainTodayInches = computed(() => calculateRainDeltaInches(baselineTodayMm.value));
    const rainMonthInches = computed(() => calculateRainDeltaInches(baselineMonthMm.value));
    const rainYearInches = computed(() => calculateRainDeltaInches(baselineYearMm.value));
    const mapObservations = (results) => {
        return results
            .map((item) => {
            const r = item.readings;
            const dateObj = new Date(item.time);
            return {
                rawTime: item.time,
                formattedDate: dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                }),
                formattedTime: dateObj.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                barometricPressure: r.at(0),
                windDirectionMin: r.at(1),
                windDirectionAvg: r.at(2),
                windDirectionMax: r.at(3),
                windSpeedMin: r.at(4),
                windSpeedAvg: r.at(5),
                windSpeedMax: r.at(6),
                airTemperature: r.at(7),
                internalTemperature: r.at(8),
                relativeHumidity: r.at(9),
                rainAccumulation: r.at(10),
                rainDuration: r.at(11),
                rainIntensity: r.at(12),
                hailAccumulation: r.at(13),
                hailDuration: r.at(14),
                hailIntensity: r.at(15),
                rainPeakIntensity: r.at(16),
                hailPeakIntensity: r.at(17),
                waterLevel: r.at(18),
                solarRadiation: r.at(19),
                heatingTemperature: r.at(20),
                heatingVoltage: r.at(21),
                supplyVoltage: r.at(22),
                refVoltage35: r.at(23)
            };
        })
            .sort((a, b) => b.rawTime - a.rawTime);
    };
    const applyNewObservations = (mappedList, fallback) => {
        const newest = mappedList.at(0);
        if (!newest)
            return;
        const currentSaved = latestObservation.value;
        // Determine the prior distinct observation for trend comparisons
        if (mappedList.length > 1) {
            previousObservation.value = mappedList.at(1) ?? null;
        }
        else if (currentSaved && currentSaved.rawTime !== newest.rawTime) {
            previousObservation.value = currentSaved;
        }
        observations.value = mappedList;
        isFallbackData.value = fallback;
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(newest));
            if (previousObservation.value) {
                localStorage.setItem(PREV_CACHE_KEY, JSON.stringify(previousObservation.value));
            }
        }
        catch {
            // Ignore storage restrictions
        }
    };
    async function queryWindow(startMs, endMs) {
        const API_URL = `/sensestream/observations/measurements/nws_1/0?start=${startMs}&end=${endMs}`;
        const response = await fetch(API_URL);
        if (!response.ok)
            throw new Error(`SenseStream API Error: ${response.statusText}`);
        const data = await response.json();
        if (data.errorCode !== 0 || !Array.isArray(data.result)) {
            throw new Error(data.errorMessage || 'Invalid API data response structure.');
        }
        return data.result;
    }
    async function fetchMidnightBaselineMm(boundaryDate, cacheKey) {
        try {
            const rawCache = localStorage.getItem(BASELINE_CACHE_KEY);
            if (rawCache) {
                const parsedCache = JSON.parse(rawCache);
                if (typeof parsedCache[cacheKey] === 'number') {
                    return parsedCache[cacheKey];
                }
            }
        }
        catch {
            // Ignore storage errors
        }
        const startLocal = new Date(boundaryDate.getFullYear(), boundaryDate.getMonth(), boundaryDate.getDate(), 0, 0, 1, 0);
        const endLocal = new Date(boundaryDate.getFullYear(), boundaryDate.getMonth(), boundaryDate.getDate(), 0, 15, 0, 0);
        try {
            const results = await queryWindow(startLocal.getTime(), endLocal.getTime());
            if (!results || results.length === 0) {
                return null;
            }
            const sortedAscending = [...results].sort((a, b) => a.time - b.time);
            const firstItem = sortedAscending.at(0);
            const firstReadingRainMm = firstItem?.readings?.at(10);
            if (typeof firstReadingRainMm === 'number') {
                try {
                    const rawCache = localStorage.getItem(BASELINE_CACHE_KEY);
                    const parsedCache = rawCache ? JSON.parse(rawCache) : {};
                    parsedCache[cacheKey] = firstReadingRainMm;
                    localStorage.setItem(BASELINE_CACHE_KEY, JSON.stringify(parsedCache));
                }
                catch {
                    // Ignore storage errors
                }
                return firstReadingRainMm;
            }
            return null;
        }
        catch (err) {
            console.warn(`Failed to fetch baseline for ${cacheKey}:`, err);
            return null;
        }
    }
    async function refreshAllRainBaselines() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const todayDate = new Date(year, month, day);
        const monthStartDate = new Date(year, month, 1);
        const yearStartDate = new Date(year, 0, 1);
        const todayKey = `day_${year}-${month + 1}-${day}`;
        const monthKey = `month_${year}-${month + 1}`;
        const yearKey = `year_${year}`;
        const [todayVal, monthVal, yearVal] = await Promise.all([
            fetchMidnightBaselineMm(todayDate, todayKey),
            fetchMidnightBaselineMm(monthStartDate, monthKey),
            fetchMidnightBaselineMm(yearStartDate, yearKey)
        ]);
        baselineTodayMm.value = todayVal;
        baselineMonthMm.value = monthVal;
        baselineYearMm.value = yearVal;
    }
    async function fetchSenseStreamData() {
        isLoading.value = true;
        error.value = null;
        const now = new Date();
        const endMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        // Query the last 15 minutes so we get both the latest reading and the prior 5-minute reading
        const fifteenMinutesMs = 15 * 60 * 1000;
        const startMs = endMs - fifteenMinutesMs;
        try {
            const [results] = await Promise.all([
                queryWindow(startMs, endMs),
                refreshAllRainBaselines()
            ]);
            if (results.length > 0) {
                applyNewObservations(mapObservations(results), false);
            }
            else {
                const twentyFourHoursMs = 24 * 60 * 60 * 1000;
                const fallbackResults = await queryWindow(endMs - twentyFourHoursMs, endMs);
                if (fallbackResults.length > 0) {
                    applyNewObservations(mapObservations(fallbackResults), true);
                }
                else if (observations.value.length > 0) {
                    isFallbackData.value = true;
                }
            }
        }
        catch (err) {
            if (observations.value.length > 0) {
                isFallbackData.value = true;
            }
            else {
                error.value = err.message || 'Failed to read from SenseStream API.';
            }
            console.error(err);
        }
        finally {
            isLoading.value = false;
        }
    }
    return {
        observations,
        previousObservation,
        latestObservation,
        barometerTrend,
        tideTrend,
        isLoading,
        error,
        isFallbackData,
        rainTodayInches,
        rainMonthInches,
        rainYearInches,
        fetchSenseStreamData
    };
});
