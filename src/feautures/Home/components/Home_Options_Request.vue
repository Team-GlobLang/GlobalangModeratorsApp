<template>
  <FwbCard class="w-full p-2 flex items-center">
    <div class="flex w-full gap-2">
      <i
        :class="`pi ${props.icon} ${bgColor} p-7 rounded-full`"
        style="font-size: 2rem"
      ></i>
      <span>
        <h2 class="text-md font-bold">{{ title }}</h2>
        <p class="text-sm">{{ description }}</p>
      </span>
      <div class="flex items-center">
        <span :class="`p-1 ${bgColor} rounded-full text-sm`">{{
          requestNumber
        }}</span>
        <i class="pi pi-chevron-right rounded-full" style="font-size: 1rem"></i>
      </div>
    </div>
  </FwbCard>
</template>
<script setup>
import { FwbCard } from "flowbite-vue";
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  requestNumber: {
    type: String,
  },
  icon: {
    type: String,
  },
  bgColor: {
    type: String,
  },
});
</script>
