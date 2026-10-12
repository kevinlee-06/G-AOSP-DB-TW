<script setup>
import { RouterLink } from 'vue-router'
import { apps, getAppIcon } from '../data'
</script>

<template>
  <section class="page-heading">
    <div class="eyebrow">G-AOSP-DB-TW</div>
    <h1>台灣 App 的 GrapheneOS 相容性資料庫</h1>
    <p>以 Pixel 9a + GrapheneOS 為主要測試平台，記錄台灣金融與支付 App 的相容性與最低環境需求。</p>
  </section>

  <div class="app-list" role="list">
    <article v-for="app in apps" :key="app.packageName" class="app-row">
      <div>
        <RouterLink class="app-link" :to="`/apps/${app.packageName}`">
          <img class="app-icon" :src="getAppIcon(app.packageName)" :alt="`${app.name} icon`">
          <span>
            <span class="app-name">{{ app.name }}</span>
            <span class="package-name">{{ app.packageName }}</span>
          </span>
        </RouterLink>
      </div>
      <div class="app-meta">
        <span v-for="category in app.categories" :key="category" class="tag">
          {{ category }}
        </span>
        <span :class="['compatibility', app.compatible ? 'is-compatible' : 'is-incompatible']">
          {{ app.compatible ? 'Compatible' : 'Not compatible' }}
        </span>
      </div>
    </article>
  </div>
</template>
