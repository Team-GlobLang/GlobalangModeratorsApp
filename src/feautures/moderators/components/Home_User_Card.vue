<template>
  <fwb-card class="w-full p-2 flex items-center">
    <div class="flex gap-2">
      <i
        class="pi pi-user bg-[#C9F2FF] p-7 rounded-full"
        style="font-size: 2rem"
      ></i>
      <span>
        <h2 class="text-md font-bold">¡Bienvenido {{ props.name }}!</h2>
        <h3 class="text-sm">{{ props.role }}</h3>
        <p class="text-sm">
          Hemos recibido {{ props.notifyNumber }} nuevas solicitudes que
          requieren aprobacion de moderadores.
        </p>
      </span>
    </div>
  </fwb-card>
</template>

<script setup>
import { FwbCard } from "flowbite-vue";
const props = defineProps({
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  notifyNumber: {
    type: String,
  },
});
</script>
