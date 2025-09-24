<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col gap-8 w-full">
    <Phrases_Registered_Card
      admin="Adrian Aguilar Diaz"
      meaning="Hola, amigo"
      name="Keirin Obando Duarte"
      phrase="Que mop"
    />
    <fwb-button class="w-full bg-[#2C2C2C]">Ver más</fwb-button>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Phrases_Registered_Card from "./Phrases_Registered_Card.vue";
</script>

<style scoped></style>
