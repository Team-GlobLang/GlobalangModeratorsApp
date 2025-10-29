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
          :class="isActive ? 'bg-red-100' : 'bg-green-100'"
        >
          <i
            class="pi text-3xl!"
            :class="
              isActive
                ? 'pi-times-circle text-red-600'
                : 'pi-check-circle text-green-600'
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
            isActive
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700 '
          "
        >
          {{ isActive ? "Deactive" : "Activate" }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Dialog from "primevue/dialog";
import { useChangeUserInfo } from "../../hooks/useChangeUserInfo";

const props = defineProps({
  isOpen: {
    type: Boolean,
  },

  isActive: {
    type: Boolean,
  },

  idUser: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  close: [];
  completed: [];
}>();

const showModal = computed({
  get: () => props.isOpen,
  set: (value) => {
    if (!value) {
      emit("close");
    }
  },
});

const changeUserInfo = useChangeUserInfo();

const HandleActivationAccount = async () => {
  try {
    changeUserInfo.mutate(
      { userId: props.idUser, isActived: !props.isActive },
      {
        onSuccess: () => {
          emit("completed"), emit("close");
        },
      }
    );
  } catch {
    console.log("Error al aceptar solicitud");
  }
};

const handleAction = () => {
  HandleActivationAccount();
};

const closeModal = () => {
  emit("close");
};
</script>
