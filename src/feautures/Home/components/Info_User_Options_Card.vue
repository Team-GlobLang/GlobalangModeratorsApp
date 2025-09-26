<template>
  <fwb-card class="w-full">
    <div class="w-full flex items-center gap-8 p-4 bg-[#F7F7F7]">
      <i
        :class="`pi ${props.icon} ${props.color} p-4 rounded-full`"
        style="font-size: 2rem"
      ></i>
      <h3 class="text-2xl">{{ props.text }}</h3>
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
  text: {
    type: String,
  },
});
</script>

<style scoped></style>
