<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="flex flex-col gap-2">
      <p class="flex flex-col font-light text-sm">
        <span class="text-md font-bold">{{ props.user }}</span>
        <span>Email: {{ props.email }}</span>
        <span>Age: {{ props.age }} años</span>
        <span>Suscription: {{ props.suscripcion }}</span>
        <span>End date of suscription: {{ props.end_date }}</span>
      </p>
      <FwbButton color="green">Change Suscription</FwbButton>
    </div>
  </FwbCard>
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
