<template>
  <fwb-card class="w-full bg-[#f6f6f6] shadow-gray-300 shadow-md rounded-lg">
    <div class="p-4 flex flex-col gap-2">
      <h2 class="text-lg font-bold">Creado por: {{ props.user }}</h2>
      <span class="flex flex-col font-light">
        <small>Title: {{ props.title }}</small>
        <small>Number of questions: {{ props.questionsNUmber }}</small>
        <small>Country: {{ props.country }}</small>
        <small>Approve by: {{ props.aprobeBy }}</small>
      </span>
      <Btn_Colab_Request
        v-if="props.status"
        accept-icon="pi-cloud-upload"
        accept-text="Review request"
        reject-icon="pi-trash"
        reject-text="Retire"
        accept-path="/request/colaborator/view/moderator"
        :id_item="props.id"
        @accept="onAccept"
        @idItem="onItemId"
        @openModal="onOpenModal"
        @isAccepted="onIsAccepted"
      />
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import Btn_Colab_Request from "../../Colaborators/components/modals/Btn_Colab_Request.vue";
//import { FwbCard } from "flowbite-vue";
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
  country: {
    type: String,
  },
  aprobeBy: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  idItem: [itemId: string];
  openModal: [isModalOpen: boolean];
  isAccepted: [isAccepeted: boolean];
  accept: [itemId: string];
}>();

const onAccept = (itemId: string) => {
  emit("accept", itemId);
};

const onItemId = (itemId: string) => {
  emit("idItem", itemId);
};

const onOpenModal = (isModalOpen: boolean) => {
  emit("openModal", isModalOpen);
};

const onIsAccepted = (isAccepeted: boolean) => {
  emit("isAccepted", isAccepeted);
};
</script>

<style scoped></style>
