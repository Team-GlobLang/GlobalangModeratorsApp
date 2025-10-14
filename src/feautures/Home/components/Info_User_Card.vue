<template>
  <div
    v-if="fullName"
    class="w-full rounded-xl p-4 py-6 flex items-center gap-4 bg-white shadow transition-all md:max-w-md md:mx-auto xl:max-w-lg"
  >
    <img
      :src="
        'https://ui-avatars.com/api/?name=' +
        encodeURIComponent(fullName) +
        '&background=0D8ABC&color=fff'
      "
      alt="User avatar"
      class="w-20 h-20 rounded-full border-2 border-blue-400 object-cover shadow"
    />
    <div class="flex flex-col">
      <span class="text-lg not-first:font-bold text-blue-700 mb-1">
        {{ fullName }}</span
      >
      <span class="text-md">Role: System moderator</span>
      <span class="text-md">Email: {{ email }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { userStore } from "../../../Stores/user";

const fullName = computed(() => userStore.user?.fullName);
const email = computed(() => userStore.user?.email);
</script>
