<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col items-center gap-8 w-full">
    <Quiz_Registerd_Card
      user="Keirin Obando Duarte"
      language="Tico"
      aprobe-by="Adrian Aguilar Diaz"
      title="Español intermedio"
      :questions-n-umber="12"
    />
    <fwb-button class="w-full bg-[#2C2C2C]">Ver más</fwb-button>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Quiz_Registerd_Card from "./Quiz_Registerd_Card.vue";
</script>

<style scoped></style>
