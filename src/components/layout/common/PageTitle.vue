<script setup>
defineProps({
  tag: {
    type: String,
    default: 'About'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: 'Anyang University | Urban Information Engineering'
  }
})
</script>

<template>
  <header class="mb-10 space-y-2">
    <div class="flex items-center gap-2">
      <div class="h-[2px] w-8 bg-indigo-500"></div>
      <span class="text-indigo-500 font-bold tracking-widest text-[9px] uppercase font-a2zM">
        {{ tag }}
      </span>
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl md:text-5xl font-black text-slate-900 font-a2zM tracking-tighter leading-none">
          {{ title }}
        </h1>
        <p class="mt-2 text-slate-400 font-a2zL text-sm">
          {{ subtitle }}
        </p>
      </div>
      <div class="hidden md:block text-right border-l-2 border-slate-200 pl-4 py-1"></div>
    </div>
  </header>
</template>