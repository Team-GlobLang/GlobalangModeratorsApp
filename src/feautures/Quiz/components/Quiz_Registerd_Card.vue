<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-bold">Creado por: {{ props.user }}</h2>
      <span class="flex flex-col font-light">
        <small>Title: {{ props.title }}</small>
        <small>Number of questions: {{ props.questionsNUmber }}</small>
        <small>Country: {{ props.country }}</small>
        <small>Approve by: {{ props.aprobeBy }}</small>
      </span>
      <Btn_Colab_Request
        v-if="status"
        accept-icon="pi-cloud-upload"
        accept-text="Review request"
        reject-icon="pi-trash"
        reject-text="Retire"
        accept-path="/request/colaborator/view/moderator"
        :status="props.status"
        :id_item="props.id"
        @accept="onAccept"
        @idItem="onItemId"
        @openModal="onOpenModal"
        @isAccepted="onIsAccepted"
      />
      <FwbButton
        v-if="!props.status"
        @click="onAccept(props.id)"
        class="flex flex-1 flex-row items-center justify-center gap-2 bg-[#009951] rounded-md text-white p-1.5 text-sm"
      >
        <i class="pi pi-cloud-upload"></i>
        <small>See Request</small>
      </FwbButton>
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import Btn_Colab_Request from "@shared/Components/Btn_Colab_Request.vue";
import { FwbCard } from "flowbite-vue";
import { FwbButton } from "flowbite-vue";

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
