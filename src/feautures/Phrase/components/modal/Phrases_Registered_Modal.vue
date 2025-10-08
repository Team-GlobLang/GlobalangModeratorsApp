<template>
  <fwb-modal v-if="isOpen" @close="closeModal">
    <template #header> </template>
    <template #body>
      <div class="w-full flex flex-col items-center gap-2">
        <img
          src="../../../../assets/Warning.png"
          alt="WarningImage"
          class="rounded-full w-1/2"
        />
        <span class="text-xl">Are you sure to delete this audio?</span>
        <span class="text-sm font-bold">this action is unreversible</span>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
          Cancel
        </fwb-button>
        <fwb-button @click="handleAction" color="red"> Delete </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { FwbButton, FwbModal } from "flowbite-vue";
import { UseDeleteShort } from "../../../Audio/hooks/UseDeleteShorts";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  idRequest: {
    type: String,
    required: true,
  },
});

const DeleteMutation = UseDeleteShort();
const HandleDelte = async (id: string) => {
  try {
    await DeleteMutation.mutate(id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (err) {
    console.log("error al eliminar audio");
  }
};

const emit = defineEmits<{
  close: [];
  completed: [];
}>();

const handleAction = () => {
  HandleDelte(props.idRequest);
  emit("close");
  emit("completed");
};

const closeModal = () => {
  emit("close");
};
</script>
