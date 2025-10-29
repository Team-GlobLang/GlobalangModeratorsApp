<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-opacity-50 backdrop-blur-lg z-40 flex items-center justify-center"
    @click.self="closeModal"
  >
    <div
      v-if="isOpen"
      class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-50"
      @click.stop
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-end">
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
      </div>

      <div class="px-6 py-6">
        <div class="w-full flex flex-col gap-4 items-center">
          <div class="w-full">
            <fwb-select
              v-model="CurrentMembership"
              :options="memberships"
              label="Select a membership"
              :validation-status="validationStatus"
            />
          </div>

          <div class="w-full">
            <fwb-input
              v-model="formattedStartDate"
              placeholder="enter your first name"
              label="Start date"
              disabled
            />
          </div>

          <div class="w-full">
            <fwb-input
              v-model="formattedRenueDate"
              placeholder="enter your first name"
              label="Renew date"
              disabled
            />
          </div>

          <div class="w-full">
            <fwb-input
              v-model="formattedEndtDate"
              placeholder="enter your first name"
              label="Expiration date"
              disabled
            />
          </div>
        </div>
      </div>
      <div
        class="px-6 py-4 border-t border-gray-200 flex justify-between gap-3"
      >
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          @click="handleAction"
          :disabled="isButtonDisabled"
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
          :class="[
            'px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200',
            isButtonDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700',
          ]"
        >
          Change suscription
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { FwbSelect, FwbInput } from "flowbite-vue";
import { useChangeUserInfo } from "../../hooks/useChangeUserInfo";

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  userId: {
    type: String,
    required: true,
  },
  userMembership: {
    type: String,
    required: false,
    default: undefined,
  },
  membershipStartDay: {
    type: String,
    required: false,
    default: undefined,
  },
  membershipRenewedDay: {
    type: String,
    required: false,
    default: undefined,
  },
  membershipExpirationDay: {
    type: String,
    required: false,
    default: undefined,
  },
});
const showError = ref(false);
const CurrentMembership = ref("");
const memberships = [
  { value: "ACADEMIC", name: "Academic" },
  { value: "TRIAL", name: "Free Trial" },
  { value: "PREMIUM", name: "Premium" },
  { value: "BASIC", name: "Basic" },
];

watch(
  () => props.userMembership,
  (newValue) => {
    CurrentMembership.value = newValue || "";
  },
  { immediate: true }
);

const start_date = ref("");
const renew_date = ref("");
const expiration_date = ref("");

watch(
  () => props.membershipStartDay,
  (newValue) => {
    start_date.value = newValue || "";
  },
  { immediate: true }
);

watch(
  () => props.membershipRenewedDay,
  (newValue) => {
    renew_date.value = newValue || "";
  },
  { immediate: true }
);

watch(
  () => props.membershipExpirationDay,
  (newValue) => {
    expiration_date.value = newValue || "";
  },
  { immediate: true }
);

const formattedRenueDate = computed(() => {
  if (!props.userMembership) return "No data";

  if (
    CurrentMembership.value &&
    CurrentMembership.value !== props.userMembership
  ) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(currentDate.getDate() - 2);
    return currentDate.toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  if (!props.membershipRenewedDay) return "No data";

  const date = new Date(props.membershipRenewedDay);
  return date.toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});

const formattedEndtDate = computed(() => {
  if (!props.userMembership) return "No data";

  if (
    CurrentMembership.value &&
    CurrentMembership.value !== props.userMembership
  ) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    return currentDate.toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  if (!props.membershipExpirationDay) return "No data";

  const date = new Date(props.membershipExpirationDay);
  return date.toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});

const formattedStartDate = computed(() => {
  if (!props.userMembership) return "No data";

  if (
    CurrentMembership.value &&
    CurrentMembership.value !== props.userMembership
  ) {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  if (!props.membershipStartDay) return "No data";

  const date = new Date(props.membershipStartDay);
  return date.toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});

const isButtonDisabled = computed(() => {
  if (!CurrentMembership.value) return true;
  if (CurrentMembership.value === props.userMembership) return true;
  if (formattedStartDate.value === "No data") return true;

  return false;
});

const validationStatus = computed(() => {
  if (showError.value && !CurrentMembership.value) {
    return "error";
  }
  return undefined;
});

const changeUserInfo = useChangeUserInfo();

const handleSuscripcion = async () => {
  try {
    changeUserInfo.mutate({
      userId: props.userId,
      membership: CurrentMembership.value,
      membershipStartDate: new Date(start_date.value),
      membershipRenewDate: new Date(renew_date.value),
      membershipExpiration: new Date(expiration_date.value),
    }),
      { onSuccess: () => emit("completed") };
  } catch {
    console.log("Error al aceptar solicitud");
  }
};

const emit = defineEmits<{
  close: [];
  completed: [];
}>();

const handleAction = () => {
  handleSuscripcion();
  emit("completed");
  emit("close");
};

const closeModal = () => {
  emit("close");
};
</script>
