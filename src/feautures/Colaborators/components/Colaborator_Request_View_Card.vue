<template>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Full name:</span>
    <span class="text-left">{{ props.name }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Email:</span>
    <span class="text-left">{{ props.email }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Languages spoken:</span>
    <span class="text-left">{{ props.Languages }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Details:</span>
    <p class="text-left">
      {{ props.message }}
    </p>
  </div>
  <div
    v-if="props.filesUrls && props.filesUrls.length > 0"
    class="flex flex-wrap gap-2"
  >
    <i
      v-for="(url, index) in props.filesUrls"
      :key="index"
      @click="() => openFile(url)"
      class="pi pi-file hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      style="font-size: 2.5rem"
    ></i>
  </div>
  <Btn_Group_Without_Icon
    accept-text="Approve"
    reject-text="Reject"
    color-accept="bg-[#00A1FF]"
    color-reject="bg-[#900B09]"
    :id_item="props.id_item || ''"
    @idItem="IdItem"
    @openModal="openModal"
    @isAccepted="onIsAccepted"
  />
</template>

<script setup lang="ts">
import Btn_Group_Without_Icon from "../../Home/components/Btn_Group_Without_Icon.vue";
const props = defineProps({
  id_item: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  Languages: {
    type: String,
  },
  message: {
    type: String,
  },
  filesUrls: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits<{
  idItem: [itemId: string];
  openModal: [isModalOpen: boolean];
  isAccepted: [isAccepeted: boolean];
}>();

const IdItem = (itemId: string) => {
  emit("idItem", itemId);
};

const openModal = (isModalOpen: boolean) => {
  emit("openModal", isModalOpen);
};

const onIsAccepted = (isAccepted: boolean) => {
  emit("isAccepted", isAccepted);
};

const openFile = (url: string) => {
  //CAMBIAR POR IFRAME LIBRARY
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped></style>
