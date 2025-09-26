<template>
  <fwb-card class="w-full">
    <div class="w-full flex gap-8 items-center p-4 bg-[#F7F7F7]">
      <i
        :class="`pi ${props.icon} ${props.color} p-4 rounded-full`"
        style="font-size: 2rem"
      ></i>
      <div class="flex flex-col">
        <h3 class="text-2xl">{{ props.name }}</h3>
        <small>{{ props.role }}</small>
        <small>{{ props.email }}</small>
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";

const props = defineProps({
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
  },
});
</script>

<style scoped></style>
