<template>
  <div class="w-full flex flex-col gap-6 items-center">
    <Users_Registered_Card
      user="Akion Cheng Jimenez"
      :age="22"
      email="achengjimenez@gmail.com"
      suscripcion="Prueba gratuita"
      end_date="20/9/2026"
    />

    <Users_Registered_Card
      user="Akion Cheng Jimenez"
      :age="22"
      email="achengjimenez@gmail.com"
      suscripcion="Prueba gratuita"
      end_date="20/9/2026"
    />
    <fwb-button class="w-full bg-[#2C2C2C]">Ver más</fwb-button>
  </div>
</template>

<script setup lang="ts">
import Users_Registered_Card from "./Users_Registered_Card.vue";
import { FwbButton } from "flowbite-vue";
</script>

<style scoped></style>
