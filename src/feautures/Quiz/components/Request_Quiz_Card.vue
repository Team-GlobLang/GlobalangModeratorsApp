<template>
  <fwb-card class="w-full">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-2">
      <h3 class="text-lg font-bold">Creado por: {{ props.user }}</h3>
      <span class="flex flex-col font-light">
        <small>Titulo: {{ props.title }}</small>
        <small>Cantidad de preguntas: {{ props.questionsNUmber }}</small>
        <small>Idioma: {{ props.language }}</small>
      </span>
      <btn_-group
        accept-icon="pi-cloud-upload"
        accept-text="Empezar revision"
        reject-icon="pi-trash"
        reject-text="Rechazar"
        :id_item="props.id || ''"
        @accept="handleAccept"
        @reject="handleReject"
      />
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";
import Btn_Group from "../../Home/components/Btn_Group.vue";
import { useRouter } from "vue-router";
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
  id: {
    type: String,
  },
});

const router = useRouter();

const handleAccept = () => {
  router.push({ name: "review_quiz" });
};

const handleReject = () => {
  console.log("implementar logica");
};
</script>

<style scoped></style>
