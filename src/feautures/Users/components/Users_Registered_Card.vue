<template>
  <fwb-card
    class="w-full p-2 items-center bg-[#f6f6f6] shadow-gray-300 shadow-md"
  >
    <div class="p-4 flex flex-col gap-2">
      <p class="flex flex-col font-light text-sm">
        <span class="text-md font-bold">{{ props.user }}</span>
        <span>Email: {{ props.email }}</span>
        <span>Age: {{ props.age }} años</span>
        <span>Suscription: {{ props.suscripcion }}</span>
        <span>End date of suscription: {{ props.end_date }}</span>
      </p>
      <fwb-button color="green">Change suscription data</fwb-button>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { FwbCard } from "flowbite-vue";
const props = defineProps({
  user: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  suscripcion: {
    type: String,
  },
  end_date: {
    type: String,
  },
});
</script>

<style scoped></style>
