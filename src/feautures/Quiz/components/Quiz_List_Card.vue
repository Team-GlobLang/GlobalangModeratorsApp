<template>
  <FwbCard class="w-full p-2 items-center">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-2">
      <h3 class="text-lg font-bold">Creado por: {{ props.user }}</h3>
      <span class="flex flex-col font-light">
        <small>Title: {{ props.title }}</small>
        <small>Number of questions: {{ props.questionsNUmber }}</small>
        <small>Language: {{ props.language }}</small>
        <small>Approved by: {{ props.approbeBy }}</small>
      </span>
      <Btn_Group
        accept-icon="pi-cloud-upload"
        accept-text="Ver preguntas"
        reject-icon="pi-trash"
        reject-text="Rechazar"
        :id_item="props.id || ''"
      />
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import Btn_Group from '@shared/Components/Btn_Group.vue';


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
  approbeBy: {
    type: String,
  },
  id: {
    type: String,
  },
});
</script>

<style scoped></style>
