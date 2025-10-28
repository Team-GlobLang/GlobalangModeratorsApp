<template>
  <div
    class="relative w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md"
  >
    <span
      class="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full uppercase"
      :class="
        props.active
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-red-100 text-red-700 border border-red-300'
      "
    >
      {{ props.active ? "Active" : "Inactive" }}
    </span>

    <div class="flex flex-col gap-2">
      <p class="flex flex-col font-light text-sm">
        <span class="text-lg font-bold">{{ props.user }}</span>
        <span class="font-light text-base">Email: {{ props.email }}</span>
        <span class="font-light text-base">Age: {{ props.age }}</span>
        <span class="font-light text-base"
          >Role: {{ props.role?.toLocaleLowerCase() }}</span
        >
        <span class="font-light text-base">
          Suscription: {{ props.suscripcion?.toLocaleLowerCase() }}
        </span>
        <span class="font-light text-base" v-if="props.suscripcion !== 'BASIC'">
          End date of suscription: {{ formattedDate }}
        </span>
      </p>
      <div class="flex w-full justify-between">
        <FwbButton
          @click="handleAction(props.active)"
          :class="
            props.active
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-green-100 text-green-700 border border-green-300'
          "
        >
          {{
            props.active ? "Deactivate account" : "Activate account"
          }}</FwbButton
        >
        <FwbButton>Change Suscription</FwbButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";
import { FwbButton } from "flowbite-vue";

const props = defineProps({
  id: String,
  user: String,
  email: String,
  age: Number,
  suscripcion: String,
  end_date: String,
  role: String,
  active: Boolean,
  onAction: {
    type: Function as PropType<
      (payload: { id: string; isActive: boolean }) => void
    >,
    required: false,
  },
});

const formattedDate = computed(() => {
  if (!props.end_date) return "No data";
  const date = new Date(props.end_date);
  return date.toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});

const handleAction = (isActive: boolean) => {
  props.onAction?.({
    id: props.id!,
    isActive,
  });
};
</script>
