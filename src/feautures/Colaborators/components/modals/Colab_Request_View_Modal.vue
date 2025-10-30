<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Warning"
    :style="{ width: '25rem' }"
    :pt="{
      mask: { class: 'backdrop-blur-sm bg-opacity-50 ' },
    }"
    class="bg-white! p-4 shadow-gray-400! shadow-lg! rounded-lg!"
  >
    <div class="px-6 py-6">
      <div class="w-full flex flex-col items-center gap-2 text-center">
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          :class="typeAction ? 'bg-green-100' : 'bg-red-100'"
        >
          <i
            class="pi text-3xl!"
            :class="
              typeAction
                ? 'pi-check-circle text-green-600'
                : 'pi-times-circle text-red-600'
            "
          ></i>
        </div>
        <span class="text-lg font-semibold text-gray-900">
          Are you sure you want to do this?
        </span>
        <span class="text-sm text-gray-600 font-medium">
          This action is irreversible.
        </span>
      </div>
      <div class="py-4 border-t border-gray-200 flex justify-between gap-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          @click="handleAction"
          class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200"
          :class="
            typeAction
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          "
        >
          {{ typeAction ? "Accept" : isRegistered ? "Retire" : "Reject" }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "primevue/dialog";

import { computed, ref, watch } from "vue";
import { Status } from "../../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestChangeStatus } from "../../interfaces/ColaboratorRequestChangeStatusInterface";
import { UseChangeRequestStatus } from "../../hooks/UseChangeRequestStatus";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  isOpen: {
    type: Boolean,
  },

  typeAction: {
    type: Boolean,
  },

  idRequest: {
    type: String,
    required: true,
  },
  isRegistered: {
    type: Boolean,
    requiered: false,
  },
});

const showModal = computed({
  get: () => props.isOpen,
  set: (value) => {
    if (!value) {
      emit("close");
    }
  },
});

const mutationChangeRequest = UseChangeRequestStatus();

const Data = ref<ColaboratorRequestChangeStatus>({
  id: props.idRequest,
  status: props.typeAction ? `${Status.ACCEPTED}` : `${Status.REJECTED}`,
});

const router = useRouter();
const route = useRoute();
const HandleAction = async () => {
  const colaboratorRequestChangeStatus: ColaboratorRequestChangeStatus = {
    id: Data.value.id,
    status: Data.value.status,
  };
  mutationChangeRequest.mutate(colaboratorRequestChangeStatus, {
    onSuccess: () => {
      emit("completed");
      if (route.path.includes("/registered/teachers")) {
        return;
      } else {
        router.replace({ name: "Request_Collaborator" });
      }
    },
  });
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
