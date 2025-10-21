<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="p-4 flex flex-col gap-2">
      <p>
        <small class="font-bold text-md">{{ props.user }}</small>
        <span class="flex flex-col font-light text-sm gap-0.5">
          <small>Language: {{ props.language }}</small>
          <small>Category: {{ props.category }}</small>
        </span>
      </p>
      <fwb-button-group class="flex justify-between gap-4">
        <fwb-button
          @click="handleAction(false)"
          class="w-full flex justify-center gap-2 border-[#FF0000]"
          color="light"
          ><i class="pi pi-trash text-[#FF0000]"></i> <span>Reject</span>
        </fwb-button>
        <fwb-button
          @click="HandleViewRequest(props.id_item)"
          class="w-full flex justify-center gap-2"
          color="green"
          ><i class="pi pi-cloud-upload"></i> <span>Review</span>
        </fwb-button>
      </fwb-button-group>
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { FwbCard, FwbButtonGroup, FwbButton } from "flowbite-vue";
import type { PropType } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  id_item: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  onAction: {
    type: Function as PropType<
      (payload: { id: string; isAccepted: boolean }) => void
    >,
    required: false,
  },
});

const handleAction = (isAccepted: boolean) => {
  props.onAction?.({
    id: props.id_item!,
    isAccepted,
  });
};

const router = useRouter();
const HandleViewRequest = (id: string) => {
  router.push({
    name: "Collaborator_Request_View",
    params: { id: id },
  });
};
</script>

<style scoped></style>
