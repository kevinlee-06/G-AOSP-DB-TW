<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: '關於 G-AOSP-DB-TW',
  meta: [
    {
      name: 'description',
      content: '了解 G-AOSP-DB-TW 的測試平台、資料範圍與 GrapheneOS App 相容性資料來源。',
    },
    {
      property: 'og:title',
      content: '關於 G-AOSP-DB-TW',
    },
    {
      property: 'og:description',
      content: '了解 G-AOSP-DB-TW 的測試平台、資料範圍與 GrapheneOS App 相容性資料來源。',
    },
  ],
  link: [{ rel: 'canonical', href: '/about' }],
})
</script>

<template>
  <section class="page-heading about-heading">
    <div class="eyebrow">About</div>
    <h1>About G-AOSP-DB-TW</h1>
    <p>
      G-AOSP-DB-TW 是一份由 GitHub 維護的台灣 Android App 相容性資料庫，
      主要記錄金融、支付與相關服務在 GrapheneOS 上的最低環境需求。
    </p>
  </section>

  <section class="about-card">
    <h2>Test platform</h2>
    <p>主要測試平台為 Google Pixel 9a 搭配 GrapheneOS。</p>
  </section>

  <section class="about-card">
    <h2>Reference for AOSP</h2>
    <p>
      GrapheneOS 基於 AOSP，因此本資料對其他 AOSP 系統具有參考價值。
      但不同裝置、ROM、Android 版本與系統設定可能造成不同結果，
      資料不代表對所有 AOSP 環境的相容性保證。
    </p>
  </section>

  <section class="about-card">
    <h2>What is recorded?</h2>
    <p>
      每個 App 會記錄相容性、測試日期、Profile，以及正常使用所需的 GMS、
      TEE、Play Integrity 與 Exploit Protection Compatibility Mode。
    </p>
  </section>

  <section class="about-card">
    <h2>Contribute</h2>
    <p>
      如果你希望請求測試某個 App、回報相容性問題，或修正與補充現有資料，
      歡迎到 GitHub Repository 開立 Issue。
    </p>
    <a
      class="repository-link"
      href="https://github.com/kevinlee-06/G-AOSP-DB-TW"
      target="_blank"
      rel="noopener noreferrer"
    >
      Open GitHub Repository ↗
    </a>
  </section>

  <section class="about-card">
    <h2>Trademark notice</h2>
    <p>
      Android 是 Google LLC 的商標。GrapheneOS 是 GrapheneOS Foundation 的商標。
      本專案與 Google LLC、GrapheneOS Foundation 或所提及的 App 開發者沒有官方隸屬或背書關係。
    </p>
  </section>
</template>
