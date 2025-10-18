<template>
  <fwb-card class="w-full bg-white shadow-gray-300 shadow-md rounded-lg">
    <div class="w-full flex items-center gap-8 p-4 text-2xl">
      <i :class="`pi ${props.icon} ${props.color} p-4 rounded-full`"></i>
      <h3>{{ props.text }}</h3>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
