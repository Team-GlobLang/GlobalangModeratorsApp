<template>
  <fwb-card class="w-full">
    <div class="bg-white rounded-lg p-4 flex justify-center gap-4">
      <i class="pi pi-play-circle" style="font-size: 4rem"></i>
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-bold">Creado por: {{ props.name }}</h3>
        <span class="flex flex-col font-light text-lg gap-2">
          <small>Frase: {{ props.phrase }} </small>
          <small>Significado: {{ props.meaning }} </small>
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
