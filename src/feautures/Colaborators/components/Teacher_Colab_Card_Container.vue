<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col gap-8 w-full">
    <Teacher_Colaborator_Card
      user="Keirin Obando Duarte"
      category="Profesor"
      aprobe-by="Adrian Aguilar Diaz"
      title="Interprete, Comercio"
      language="Mandarin"
    />
    <fwb-button class="w-full bg-[#2C2C2C]">Ver más</fwb-button>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Teacher_Colaborator_Card from "./Teacher_Colaborator_Card.vue";
</script>

<style scoped></style>
