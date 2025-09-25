<template>
  <div class="flex flex-col">
    <div class="flex justify-end">
      <fwb-button color="green">Crear moderador</fwb-button>
    </div>
    <fwb-select
      v-model="selected"
      :options="plan"
      label="Selecciona un idioma"
    />
    <fwb-select v-model="selected" :options="email" label="Correo" />
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
