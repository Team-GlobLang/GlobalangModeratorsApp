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

  <div v-if="selectedFile" class="w-full mt-4">
    <div class="relative border rounded-lg overflow-hidden shadow-md">
      <iframe
        :src="selectedFile"
        class="w-full h-[600px]"
        frameborder="0"
      ></iframe>
      <button
        @click="selectedFile = undefined"
        class="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
      >
        Cerrar
      </button>
    </div>
  </div>

  <div
    v-if="props.filesUrls && props.filesUrls.length > 0 && !selectedFile"
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
    color-accept="bg-[#009951]"
    color-reject="border-[#FF0000]"
    :id_item="props.id_item || ''"
    textColorApprove="white"
    textColorReject="black"
    @idItem="IdItem"
    @openModal="openModal"
    @isAccepted="onIsAccepted"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
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

const selectedFile = ref<string>();

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
  selectedFile.value = url;
};
</script>

<style scoped></style>
