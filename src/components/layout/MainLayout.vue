<script setup>
import HeaderMain from '@/components/layout/index/Header-Main.vue'
import FooterMain from '@/components/layout/index/Footer-Main.vue'
import Sidebar from '@/components/layout/index/Sidebar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderMain />

    <div class="flex-1 flex items-start max-w-[1440px] w-full mx-auto py-10">
      <Sidebar />
      <main class="flex-1 px-10">
        <router-view /> 
      </main>
    </div>

    <FooterMain />
  </div>
</template>