<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterLink, useRoute } from 'vue-router'
import { getApp, getAppIcon } from '../data'

const route = useRoute()
const app = computed(() => getApp(String(route.params.packageName)))
useHead(() => ({
  title: app.value
    ? `${app.value.name} GrapheneOS 相容性 | G-AOSP-DB-TW`
    : '找不到 App | G-AOSP-DB-TW',
  meta: [
    {
      name: 'description',
      content: app.value
        ? `${app.value.name}（${app.value.packageName}）在 GrapheneOS 上的相容性、測試歷史與最低環境需求。`
        : '找不到指定的 App 相容性資料。',
    },
    {
      property: 'og:title',
      content: app.value
        ? `${app.value.name} GrapheneOS 相容性 | G-AOSP-DB-TW`
        : '找不到 App | G-AOSP-DB-TW',
    },
    {
      property: 'og:description',
      content: app.value
        ? `${app.value.name}（${app.value.packageName}）在 GrapheneOS 上的相容性、測試歷史與最低環境需求。`
        : '找不到指定的 App 相容性資料。',
    },
  ],
  link: [{ rel: 'canonical', href: `/apps/${route.params.packageName}` }],
}))

const googlePlayUrl = computed(
  () => `https://play.google.com/store/apps/details?id=${app.value?.packageName}&hl=zh_TW&pli=1`,
)

const requirementLabels = {
  gms: 'GMS',
  gmsForNotifications: 'GMS for notifications',
  tee: 'TEE',
  playIntegrity: 'Play Integrity',
  exploitProtectionCompatibilityMode: 'Exploit Protection Compatibility Mode',
}

function requirementValue(value) {
  if (value === null) return 'Unknown'
  return value ? 'Required' : 'Not required'
}
</script>

<template>
  <template v-if="app">
    <p class="breadcrumb"><RouterLink to="/">App Overview</RouterLink> / {{ app.name }}</p>
    <section class="page-heading detail-heading">
      <div>
        <div class="eyebrow">Application details</div>
        <div class="app-title">
          <img class="detail-icon" :src="getAppIcon(app.packageName)" :alt="`${app.name} icon`">
          <h1>{{ app.name }}</h1>
        </div>
        <p class="package-name">{{ app.packageName }}</p>
        <a
          class="external-link"
          :href="googlePlayUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Google Play ↗
        </a>
      </div>
      <span :class="['compatibility', app.compatible ? 'is-compatible' : 'is-incompatible']">
        {{ app.compatible ? 'Compatible' : 'Not compatible' }}
      </span>
    </section>

    <p v-if="app.notes" class="notes">{{ app.notes }}</p>

    <section>
      <h2>History</h2>
      <div v-for="(entry, index) in app.history" :key="`${entry.date}-${index}`" class="history-card">
        <div class="history-header">
          <div>
            <h3>{{ entry.date }}</h3>
            <p class="muted">
              Profile: {{ entry.profile ?? 'Not applicable' }}
            </p>
            <p class="muted test-version">
              <span v-if="entry.appVersion">App {{ entry.appVersion }}</span>
              <span v-if="entry.versionCode"> · versionCode {{ entry.versionCode }}</span>
              <span v-if="entry.grapheneOSVersion"> · GrapheneOS {{ entry.grapheneOSVersion }}</span>
              <span v-if="entry.androidVersion"> · Android {{ entry.androidVersion }}</span>
            </p>
          </div>
          <span :class="['compatibility', entry.compatible ? 'is-compatible' : 'is-incompatible']">
            {{ entry.compatible ? 'Compatible' : 'Not compatible' }}
          </span>
        </div>

        <p v-if="entry.notes" class="notes">{{ entry.notes }}</p>

        <dl class="requirements">
          <template v-for="(label, key) in requirementLabels" :key="key">
            <dt>{{ label }}</dt>
            <dd>{{ requirementValue(entry.requirements[key]) }}</dd>
          </template>
        </dl>
      </div>
      <p v-if="app.history.length === 0" class="muted">No test history yet.</p>
    </section>
  </template>

  <section v-else class="page-heading">
    <h1>App not found</h1>
    <p><RouterLink to="/">Back to overview</RouterLink></p>
  </section>
</template>
