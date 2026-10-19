<script setup>
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'
import { apps, getAppIcon } from '../data'

useHead({
  title: '台灣 App GrapheneOS 相容性資料庫 | G-AOSP-DB-TW',
  meta: [
    {
      name: 'description',
      content: '查詢台灣金融、支付與生活 App 在 Pixel 9a 與 GrapheneOS 上的相容性、測試歷史與最低環境需求。',
    },
    {
      property: 'og:title',
      content: '台灣 App GrapheneOS 相容性資料庫 | G-AOSP-DB-TW',
    },
    {
      property: 'og:description',
      content: '查詢台灣金融、支付與生活 App 在 Pixel 9a 與 GrapheneOS 上的相容性、測試歷史與最低環境需求。',
    },
  ],
  link: [{ rel: 'canonical', href: '/' }],
})

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedCompatibility = ref('')

const categories = computed(() =>
  [...new Set(apps.flatMap((app) => app.categories))].sort(),
)

const filteredApps = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()

  return apps.filter((app) => {
    const matchesCategory =
      !selectedCategory.value || app.categories.includes(selectedCategory.value)
    const matchesCompatibility =
      !selectedCompatibility.value ||
      String(app.compatible) === selectedCompatibility.value
    const matchesQuery =
      !query ||
      app.name.toLocaleLowerCase().includes(query) ||
      app.packageName.toLocaleLowerCase().includes(query)

    return matchesCategory && matchesCompatibility && matchesQuery
  })
})
</script>

<template>
  <section class="page-heading">
    <div class="eyebrow">G-AOSP-DB-TW</div>
    <h1>台灣 App 的 GrapheneOS 相容性資料庫</h1>
    <p>以 Pixel 9a + GrapheneOS 為主要測試平台，記錄台灣金融與支付 App 的相容性與最低環境需求。</p>
  </section>

  <section class="filters" aria-label="Filter applications">
    <label class="filter-field">
      <span>關鍵字</span>
      <input v-model="searchQuery" type="search" placeholder="搜尋 App 名稱或 package">
    </label>
    <label class="filter-field">
      <span>分類</span>
      <select v-model="selectedCategory">
        <option value="">全部分類</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </label>
    <label class="filter-field">
      <span>相容性</span>
      <select v-model="selectedCompatibility">
        <option value="">全部</option>
        <option value="true">Compatible</option>
        <option value="false">Not compatible</option>
      </select>
    </label>
  </section>

  <div v-if="filteredApps.length > 0" class="app-list" role="list">
    <article v-for="app in filteredApps" :key="app.packageName" class="app-row">
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
  <p v-else class="empty-state">找不到符合條件的 App。</p>
</template>
