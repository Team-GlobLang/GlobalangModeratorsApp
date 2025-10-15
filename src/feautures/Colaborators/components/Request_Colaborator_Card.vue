<template>
  <fwb-card class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="p-4 flex flex-col gap-2">
      <p>
        <small class="font-bold text-md">{{ props.user }}</small>
        <span class="flex flex-col font-light text-sm gap-0.5">
          <small>Language: {{ props.language }}</small>
          <small>Category: {{ props.category }}</small>
        </span>
      </p>
      <div class="w-full flex flex-col">
        <Btn_Colab_Request
          accept-icon="pi-cloud-upload"
          accept-text="Review request"
          reject-icon="pi-trash"
          reject-text="Reject"
          accept-path="/request/colaborator/view/moderator"
          :id_item="props.id_item || ''"
          @accept="onAccept"
          @idItem="onItemId"
          @openModal="onOpenModal"
          @isAccepted="onIsAccepted"
        />
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import Btn_Colab_Request from "./modals/Btn_Colab_Request.vue";
//import { FwbCard } from "flowbite-vue"; //fbw_CARD tiene resrecciones con el w-full
const props = defineProps({
  id_item: {
    type: String,
  },
  user: {
    type: String,
  },
  category: {
    type: String,
  },
  language: {
    type: String,
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
