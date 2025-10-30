<template>
  <div
    class="w-11/12 mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-8 border border-gray-200 transition animate-fade-in"
  >
    <div class="space-y-5">
      <h3 class="text-xl font-bold text-gray-900 pb-2 border-b">
        {{ props.name }} Info
      </h3>

      <div class="flex justify-between items-start">
        <span
          class="text-sm font-semibold text-gray-500 uppercase tracking-wide"
          >Full name</span
        >
        <span class="text-gray-900 text-base font-medium text-right break-all">
          {{ props.name }}
        </span>
      </div>

      <div class="flex justify-between items-start">
        <span
          class="text-sm font-semibold text-gray-500 uppercase tracking-wide"
          >Email</span
        >
        <span class="text-gray-900 text-base font-medium text-right break-all">
          {{ props.email }}
        </span>
      </div>

      <div class="flex justify-between items-start">
        <span
          class="text-sm font-semibold text-gray-500 uppercase tracking-wide"
          >Languages</span
        >
        <span
          class="text-gray-900 text-sm bg-blue-100 px-2 py-0.5 rounded-md font-medium"
        >
          {{ props.Languages }}
        </span>
      </div>

      <div v-if="props.message" class="flex flex-col">
        <span
          class="text-sm font-semibold text-gray-500 uppercase tracking-wider"
          >Details</span
        >
        <p
          class="mt-2 text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl whitespace-pre-line shadow-inner"
        >
          {{ props.message }}
        </p>
      </div>
    </div>

    <div
      v-if="props.filesUrls && props.filesUrls.length > 0"
      class="grid grid-cols-3 md:grid-cols-4 gap-6 mt-4"
    >
      <template v-if="props.category === 'COLABORATOR'">
        <div class="mt-4">
          <span
            class="text-sm font-semibold text-gray-500 uppercase tracking-wide"
          >
            Pronunciation example
          </span>
          <audio
            class="mt-2"
            v-for="(url, index) in props.filesUrls"
            :key="index"
            controls
            :src="url"
          ></audio>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(url, index) in props.filesUrls"
          :key="index"
          @click="
            openFile(url);
            isModalOpen = true;
          "
          class="cursor-pointer group relative bg-gray-100 hover:bg-blue-600 hover:text-white transition p-4 rounded-2xl shadow-sm flex flex-col items-center gap-3"
        >
          <i class="pi pi-file text-4xl group-hover:text-white"></i>
          <span class="text-xs font-medium text-center w-full truncate">
            Document {{ index + 1 }}
          </span>

          <span
            class="absolute top-2 right-2 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition"
          >
            Preview
          </span>
        </div>
        <ViewFileMd v-model="isModalOpen" :file="selectedFile" />
      </template>
    </div>
    <div class="flex w-full justify-between gap-6 pt-4">
      <FwbButton
        @click="handleAction(false)"
        color="light"
        class="w-full flex items-center justify-center gap-2 rounded-xl border border-red-600 text-red-600 hover:bg-red-50 hover:border-red-700 hover:text-red-700 transition font-medium py-3"
      >
        <i class="pi pi-times"></i>
        Reject
      </FwbButton>

      <FwbButton
        @click="handleAction(true)"
        color="green"
        class="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition font-medium py-3 shadow-md"
      >
        <i class="pi pi-check"></i>
        Approve
      </FwbButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { FwbButton } from "flowbite-vue";
import ViewFileMd from "./modals/ViewFileMd.vue";
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
  category: String,
});

const handleAction = (isAccepted: boolean) => {
  props.onAction?.({
    id: props.id_item!,
    isAccepted,
  });
};

const openFile = (url: string) => {
  selectedFile.value = url;
};

const selectedFile = ref<string | null>(null);
const isModalOpen = ref(false);
</script>

<style scoped></style>
