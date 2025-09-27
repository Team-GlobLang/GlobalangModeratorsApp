<template>
  <fwb-select
    v-model="selected"
    :options="language"
    label="Choose  a language"
  />
  <fwb-select v-model="selected" :options="status" label="Choose a status" />
</template>

<script setup lang="ts">
import { FwbSelect } from "flowbite-vue";
import { ref } from "vue";

const selected = ref("");
const language = [
  { value: "pp", name: "Prueba premium" },
  { value: "pm", name: "Pro max" },
  { value: "es", name: "estandar" },
];

const status = [
  { value: "act", name: "Activa" },
  { value: "ina", name: "Inactivo" },
];
</script>

<style scoped></style>
