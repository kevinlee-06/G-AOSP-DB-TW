<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/">
        <span class="brand-mark">G</span>
        <span>G-AOSP-DB-TW</span>
      </RouterLink>
      <nav class="header-nav" aria-label="Main navigation">
        <RouterLink to="/">Apps</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <main class="container main-content">
    <RouterView />
  </main>
</template>
