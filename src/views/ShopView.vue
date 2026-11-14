<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const shopUrl = 'https://' + 'www.matanzasriverkeeper.org/store';

const closeView = () => {
  router.push({ name: 'weather' });
};
</script>

<template>
  <div class="shop-page">
    <div class="embed-toolbar">
      <button type="button" @click="closeView" class="btn-close">
        ✕ Close
      </button>
      <span class="embed-title">Matanzas Riverkeeper Store</span>
      <span class="toolbar-spacer"></span>
    </div>

    <div class="shop-content">
      <div class="shop-card">
        <div class="shop-icon">🛒</div>
        <h2>Shop Matanzas Riverkeeper Gear</h2>
        <p>
          Support clean water in the Guana, Tolomato, and Matanzas rivers with official Matanzas Riverkeeper gear.
        </p>
        <p class="pickup-note">
          Order online or pick up at Genung's Fish Camp (291 Cubbedge Road, St. Augustine, FL 32080).
        </p>

        <a
          :href="shopUrl"
          target="_self"
          class="btn-shop-launch"
        >
          Open Official Store
        </a>

        <span class="helper-caption">Opens securely in your browser for checkout</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.embed-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f0f5ff;
  border-bottom: 1px solid #d6e4ff;
  gap: 8px;
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
}

.embed-title {
  font-size: 13px;
  font-weight: 600;
  color: #1d39c4;
  text-align: center;
}

.toolbar-spacer {
  width: 64px;
}

.shop-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px;
  width: 100%;
  box-sizing: border-box;
}

.shop-card {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 28px 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.shop-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.shop-card h2 {
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #262626;
}

.shop-card p {
  margin: 0 0 12px 0;
  font-size: 15px;
  line-height: 1.5;
  color: #595959;
}

.pickup-note {
  font-size: 13px !important;
  color: #8c8c8c !important;
  margin-bottom: 24px !important;
}

.btn-shop-launch {
  display: inline-block;
  background: #1890ff;
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.25);
}

.helper-caption {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: #8c8c8c;
}
</style>

