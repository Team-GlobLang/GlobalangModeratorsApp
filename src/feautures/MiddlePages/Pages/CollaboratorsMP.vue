<template>
  <div class="flex flex-col items-center justify-center gap-6 h-[80dvh] px-4">
    <router-link
      :to="{ name: 'Request_Collaborator' }"
      class="flex flex-col items-center justify-center w-64 h-32 bg-yellow-100 rounded-xl hover:bg-yellow-200 shadow-md transition transform hover:-translate-y-1"
    >
      <i class="fa-solid fa-chalkboard-user text-4xl mb-2"></i>
      <span class="text-lg font-medium">Pending Collaborators</span>
    </router-link>

    <router-link
      :to="{ name: 'Teacher_Collaborator_Registered' }"
      class="flex flex-col items-center justify-center w-64 h-32 bg-orange-100 rounded-xl hover:bg-orange-200 shadow-md transition transform hover:-translate-y-1"
    >
      <i class="fa-solid fa-user-tie text-4xl mb-2"></i>
      <span class="text-lg font-medium">Registered Teachers</span>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>
