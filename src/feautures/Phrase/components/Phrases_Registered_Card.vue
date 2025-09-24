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

        <btn_-group
          accept-icon="pi-cloud-upload"
          accept-text="Aprobar"
          reject-icon="pi-trash"
          reject-text="Rechazar"
          :id_item="props.id || ''"
          @accept="handleAccept"
          @reject="handleReject"
        />
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import Btn_Group from "../../Home/components/Btn_Group.vue";
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
