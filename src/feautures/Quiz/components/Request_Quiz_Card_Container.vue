<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->

  <div class="flex flex-col gap-8 w-full">
    <Request_Quiz_Card
      user="Akion Cheng jimenez"
      title="Español basico"
      language="Tico"
      :questionsNUmber="2"
    />

    <Request_Quiz_Card
      user="Keirin Obando Duarte"
      title="Ingles avanzado"
      language="Newyorkino"
      :questionsNUmber="10"
    />

    <fwb-button class="w-full bg-[#2C2C2C]">Ver más</fwb-button>
  </div>
</template>

<script setup lang="ts">
import Request_Quiz_Card from "../components/Request_Quiz_Card.vue";
import { FwbButton } from "flowbite-vue";
</script>

<style scoped></style>
