<template>
  <fwb-card class="w-full">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-2">
      <h2 class="text-lg font-bold">Creado por: {{ props.user }}</h2>
      <span class="flex flex-col font-light">
        <small>Title: {{ props.title }}</small>
        <small>Number of questions: {{ props.questionsNUmber }}</small>
        <small>Language: {{ props.language }}</small>
        <small>Approve by: {{ props.aprobeBy }}</small>
      </span>
      <btn_-group
        accept-icon="pi-cloud-upload"
        accept-text="See questions"
        reject-icon="pi-trash"
        reject-text="Delete"
        :id_item="props.id || ''"
        @accept="handleAccept"
        @reject="handleReject"
      />
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import Btn_Group from "../../Home/components/Btn_Group.vue";
import { FwbCard } from "flowbite-vue";
const props = defineProps({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  questionsNUmber: {
    type: Number,
  },
  language: {
    type: String,
  },
  aprobeBy: {
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
