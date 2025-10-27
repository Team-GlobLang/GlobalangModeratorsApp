<template>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left text-lg font-bold">Full name:</span>
    <span class="text-left text-base">{{ props.name }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left text-lg font-bold">Email:</span>
    <span class="text-left text-base">{{ props.email }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left text-lg font-bold">Languages spoken:</span>
    <span class="text-left text-base">{{ props.Languages }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left text-lg font-bold">Details:</span>
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
  <fwb-button-group class="flex w-full justify-between gap-4">
    <fwb-button
      @click="handleAction(false)"
      class="w-full flex justify-center gap-2 border-[#FF0000] rounded-lg!"
      color="light"
      ><i class="pi pi-trash text-[#FF0000]"></i> <span>Reject</span>
    </fwb-button>
    <fwb-button
      @click="handleAction(true)"
      class="w-full flex justify-center gap-2 rounded-lg!"
      color="green"
      ><i class="pi pi-cloud-upload"></i> <span>Approve</span>
    </fwb-button>
  </fwb-button-group>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { FwbButtonGroup, FwbButton } from "flowbite-vue";
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
  onAction: {
    type: Function as PropType<
      (payload: { id: string; isAccepted: boolean }) => void
    >,
    required: false,
  },
});

const selectedFile = ref<string>();

const handleAction = (isAccepted: boolean) => {
  props.onAction?.({
    id: props.id_item!,
    isAccepted,
  });
};

const openFile = (url: string) => {
  selectedFile.value = url;
};
</script>

<style scoped></style>
