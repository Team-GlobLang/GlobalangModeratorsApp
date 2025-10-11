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
        <span class="text-xl">Are you sure to do this?</span>
        <span class="text-sm font-bold">this action is unreversible</span>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
          Cancel
        </fwb-button>
        <fwb-button @click="handleAction" color="red"> Retire </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { FwbButton, FwbModal } from "flowbite-vue";
import type { ColaboratorRequestChangeStatus } from "../../interfaces/ColaboratorRequestChangeStatusInterface";
import { ref, watch } from "vue";
import { Status } from "../../interfaces/ColaboratorRequestInterface";
import { UseRetireCollab } from "../../hooks/UseRetire";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  idRequest: {
    type: String,
    required: true,
  },

  typeAction: {
    type: Boolean,
    required: true,
  },
});

const mutationRetireCollab = UseRetireCollab();

const Data = ref<ColaboratorRequestChangeStatus>({
  id: props.idRequest,
  status: props.typeAction ? Status.ACCEPTED : Status.REJECTED,
});

const HandleAction = async () => {
  const RetireCollab: ColaboratorRequestChangeStatus = {
    id: Data.value.id,
    status: Data.value.status,
  };
  try {
    await mutationRetireCollab.mutate(RetireCollab);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (err) {
    console.log("Error al retirar colaborador");
  }
};

watch(
  () => props.typeAction,
  (newVal) => {
    Data.value.status = newVal ? Status.ACCEPTED : Status.REJECTED;
  },
  { immediate: true }
);

watch(
  () => props.idRequest,
  (newVal) => {
    Data.value.id = newVal;
  },
  { immediate: true }
);

const emit = defineEmits<{
  close: [];
  completed: [];
}>();

const handleAction = () => {
  HandleAction();
  emit("close");
  emit("completed");
};

const closeModal = () => {
  emit("close");
};
</script>
