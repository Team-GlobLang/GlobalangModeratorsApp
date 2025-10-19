<template>
  <div class="flex flex-col items-center justify-center gap-6 h-[80dvh] px-4">
    
    <router-link
      :to="{ name: 'Request_Quiz' }"
      class="flex flex-col items-center justify-center w-64 h-32 bg-blue-100 rounded-xl hover:bg-blue-200 shadow-md transition transform hover:-translate-y-1"
    >
      <i class="fa-solid fa-list text-4xl mb-2"></i>
      <span class="text-lg font-medium">Pending Quizzes</span>
    </router-link>

    <router-link
      :to="{ name: 'Quizzes_Registered' }"
      class="flex flex-col items-center justify-center w-64 h-32 bg-green-100 rounded-xl hover:bg-green-200 shadow-md transition transform hover:-translate-y-1"
    >
      <i class="fa-solid fa-file-lines text-4xl mb-2"></i>
      <span class="text-lg font-medium">Registered Quizzes</span>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>
