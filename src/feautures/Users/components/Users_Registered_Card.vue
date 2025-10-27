<template>
  <FwbCard
    class="relative w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md"
  >
    <span
      class="absolute top-4 right-2 px-3 py-1 text-xs font-semibold rounded-full"
      :class="
        props.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
        <FwbButton color="red" outline>Deactive account</FwbButton>
        <FwbButton>Change Suscription</FwbButton>
      </div>
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FwbButton, FwbCard } from "flowbite-vue";

const props = defineProps({
  user: String,
  email: String,
  age: Number,
  suscripcion: String,
  end_date: String,
  role: String,
  active: Boolean,
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
</script>
