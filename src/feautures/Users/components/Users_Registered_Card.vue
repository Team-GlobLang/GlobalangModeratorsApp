<template>
  <fwb-card class="w-full p-2 items-center">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-2">
      <h2 class="text-2xl font-bold">{{ props.user }}</h2>
      <span class="flex flex-col font-light text-lg gap-0.5">
        <small>Email: {{ props.email }}</small>
        <small>Age: {{ props.age }} años</small>
        <small>Suscription: {{ props.suscripcion }}</small>
        <small>End date of suscription: {{ props.end_date }}</small> </span
      ><var></var>
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
