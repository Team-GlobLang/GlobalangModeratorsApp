<template>
  <fwb-select
    v-model="selected"
    :options="countries"
    label="Choose a language"
  />
  <fwb-select v-model="selected" :options="status" label="Choose a status" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FwbSelect } from "flowbite-vue";

const selected = ref("");
const countries = [
  { value: "us", name: "United States" },
  { value: "ca", name: "Canada" },
  { value: "fr", name: "France" },
];

const status = [
  { value: "act", name: "Activa" },
  { value: "ina", name: "Inactivo" },
];
</script>

<style scoped></style>
