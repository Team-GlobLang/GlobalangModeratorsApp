<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col items-center gap-8 w-full">
    <Request_Audio_Card
      name="Akion Cheng Jimenez"
      meaning="Que tal todo?"
      phrase="Todo Nais Firulais"
    />

    <fwb-button class="w-full bg-[#2C2C2C]">Ver más</fwb-button>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Request_Audio_Card from "./Request_Audio._Card.vue";
</script>

<style scoped></style>
