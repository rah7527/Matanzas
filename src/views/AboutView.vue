<script setup lang="ts">
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const stationImageUrl = '/matanzas-weatherstation-2.jpg';
const jenAndSilasImageUrl = 'Jen_and_Silas.jpg'
const showImage = ref(true);
const mapContainer = ref<HTMLElement | null>(null);

const matanzasUrl = 'https://' + 'www.matanzasriverkeeper.org/';
const senseStreamUrl = 'https://' + 'www.sensestream.org/';

// Genung's Fish Camp coordinates
const lat = 29.7675;
const lon = -81.25601707497161;

const directionsUrl = 'https://' + `://apple.com{lat},${lon}`;

onMounted(() => {
  if (!mapContainer.value) return;

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

</script>

<template>
  <div class="about-page">
    <!-- Top Section: About Matanzas Riverkeeper & Weather Station -->
    <div class="info-card">
      <h2 class="section-title">About</h2>

      <div v-if="showImage" class="image-wrapper">
        <img
          :src="jenAndSilasImageUrl"
          alt="Jen and Silas"
          class="station-photo"
          @error="showImage = false"
        />
      </div>

      <div class="about-body">
        <p>
          <a :href="matanzasUrl" target="_self" class="inline-link">Matanzas Riverkeeper</a>
          is a non-profit organization dedicated to protecting the health of the Guana, Tolomato, Matanzas watershed through advocacy, education, and community engagement. Our work includes everything from advocating for stronger water quality protections, to organizing waterway cleanups, to teaching children and adults how to be good stewards of our environment. Waterkeepers combine firsthand knowledge of their waterways with an unwavering commitment to the right to clean, safe water.
        </p>
        <div v-if="showImage" class="image-wrapper">
        <img
          :src="stationImageUrl"
          alt="Matanzas Riverkeeper Weather Station"
          class="station-photo"
          @error="showImage = false"
        />
      </div>
        <p>
          Matanzas Riverkeeper and Florida Atlantic University’s Institute for Sensing and Embedded Network Systems Engineering (I-SENSE) have collaborated to provide local stakeholders with a new monitoring station located at the Matanzas Riverkeeper office installed in July of 2023. This new monitoring station measures the current water level of the Matanzas River and provides auxiliary meteorological data every five minutes in real time to
          <a :href="senseStreamUrl" target="_self" class="inline-link">SenseStream.org</a>. Providing real-time data on the current conditions of the Matanzas River will produce invaluable insight into the resiliency of our coast, keeping stakeholders well-informed of potential threats local coastal communities experience, including extreme natural events such as tropical cyclones and long-term threats such as sea-level rise.
        </p>
      </div>
    </div>

    <!-- Bottom Section: Location & Interactive Leaflet Map -->
    <div class="info-card">
      <h2 class="section-title">Location</h2>

      <div class="map-wrapper">
        <div ref="mapContainer" class="location-map"></div>
      </div>

      <div class="location-details">
        <p class="location-intro">
          Our office is located at beautiful Genung's Fish Camp in Crescent Beach:
        </p>

        <address class="office-address">
          <strong>291 Cubbedge Road</strong><br />
          <strong>St. Augustine, FL 32080</strong><br />
          <a href="tel:+19044719878" class="phone-link">(904) 471-9878</a>
        </address>

       
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}

.info-card {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 22px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 700;
  color: #262626;
  text-align: center;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.station-photo {
  width: 239px;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  object-fit: cover;
}

.about-body p {
  margin: 0 0 16px 0;
  font-size: 15px;
  line-height: 1.65;
  color: #434343;
}

.about-body p:last-child {
  margin-bottom: 0;
}

.inline-link {
  color: #1890ff;
  font-weight: 600;
  text-decoration: underline;
}

.inline-link:hover {
  color: #096dd9;
}

.map-wrapper {
  width: 100%;
  max-width: 450px;
  margin: 0 auto 18px auto;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
}

.location-map {
  width: 100%;
  height: 360px;
  z-index: 1;
}

.location-details {
  text-align: center;
}

.location-intro {
  margin: 0 0 14px 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: #434343;
}

.office-address {
  font-style: normal;
  font-size: 15px;
  line-height: 1.6;
  color: #262626;
  margin-bottom: 16px;
}

.phone-link {
  color: #1890ff;
  font-weight: 700;
  text-decoration: none;
}

.btn-directions {
  display: inline-block;
  background: #1890ff;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 8px;
}
</style>
