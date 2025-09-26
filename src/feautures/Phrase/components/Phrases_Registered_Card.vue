<template>
  <fwb-card class="w-full items-center">
    <div class="bg-white rounded-lg p-4 flex justify-center gap-6">
      <i class="pi pi-play-circle" style="font-size: 4rem"></i>
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold">{{ props.phrase }}</h2>
        <span class="flex flex-col font-light text-lg">
          <small>Significado: {{ props.meaning }} </small>
          <small>Creado por: {{ props.name }} </small>
          <small>Aporbado por: {{ props.name }} </small>
        </span>

        <fwb-button
          class="w-full flex flex-row items-center justify-center gap-2 p border border-[#FF0000] rounded-md p-2 text-lg"
        >
          <i class="pi pi-trash text-[#FF0000]"></i>
          <small>Eliminar</small>
        </fwb-button>
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";
const props = defineProps({
  name: {
    type: String,
  },
  phrase: {
    type: String,
  },
  meaning: {
    type: String,
  },
  admin: {
    type: String,
  },
  id: {
    type: String,
  },
});

const handleAccept = () => {
  console.log("Implementar logica");
};

const handleReject = () => {
  console.log("Implementar logica");
};
</script>

<style scoped></style>
