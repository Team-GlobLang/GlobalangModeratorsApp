<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end">
      <fwb-button color="green">Register a moderator</fwb-button>
    </div>
    <fwb-select v-model="selected" :options="plan" label="Choose a language" />
    <fwb-select v-model="selected" :options="email" label="email" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FwbSelect } from "flowbite-vue";
import { FwbButton } from "flowbite-vue";

const selected = ref("");
const plan = [
  { value: "pp", name: "Prueba premium" },
  { value: "pm", name: "Pro max" },
  { value: "es", name: "estandar" },
];

const email = [
  { value: "act", name: "Activa" },
  { value: "ina", name: "Inactivo" },
];
</script>

<style scoped></style>
