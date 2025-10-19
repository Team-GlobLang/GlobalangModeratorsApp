<template>
  <div class="flex flex-col items-center justify-center gap-6 h-[80dvh] px-4">
    <router-link
      :to="{ name: 'Request_Audio' }"
      class="flex flex-col items-center justify-center w-64 h-32 bg-pink-100 rounded-xl hover:bg-pink-200 shadow-md transition transform hover:-translate-y-1"
    >
      <i class="fa-solid fa-headphones text-4xl mb-2"></i>
      <span class="text-lg font-medium">Pending Shorts</span>
    </router-link>
    <router-link
      :to="{ name: 'Phrases_Registered' }"
      class="flex flex-col items-center justify-center w-64 h-32 bg-purple-100 rounded-xl hover:bg-purple-200 shadow-md transition transform hover:-translate-y-1"
    >
      <i class="fa-solid fa-book-open text-4xl mb-2"></i>
      <span class="text-lg font-medium">Registered Phrases</span>
    </router-link>
  </div>
</template>


<script setup lang="ts"></script>
