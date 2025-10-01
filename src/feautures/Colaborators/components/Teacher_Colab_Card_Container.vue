<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col gap-8 w-full items-center">
    <Teacher_Colaborator_Card
      v-if="colaboratorRequests.length > 0"
      v-for="item in colaboratorRequests"
      :key="item.Colaborator_Id"
      :user="item.userinfo.fullName"
      :category="item.Category"
      :aprobe-by="item.Moderator_Id"
      :title="item.Academic_Title"
      :language="item.Languages"
    />
    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Teacher_Colaborator_Card from "./Teacher_Colaborator_Card.vue";
import { Status } from "../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestFilters } from "../interfaces/ColaboratorRequestFiltersInterface";
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestsFilters } from "../services/ColaboratorServices";

const props = defineProps({
  language: {
    type: String,
  },
  status: {
    type: String,
  },
});

const filters = ref<ColaboratorRequestFilters>({
  Status: Status.ACCEPTED,
  Languages: "",
  page: 1,
  limit: 2,
});

const allColaborators = ref<any[]>([]);

watch(
  () => props.language,
  (newLanguage) => {
    filters.value.Languages = newLanguage;
    filters.value.page = 1;
    allColaborators.value = [];
    refetch();
  }
);

watch(
  () => props.status,
  (newStatus) => {
    filters.value.Status = newStatus;
    filters.value.page = 1;
    allColaborators.value = [];
    refetch();
  }
);

const { data, isLoading, refetch } = useQuery({
  queryKey: ["Colaborators-Teachers-Registerd", filters],
  queryFn: () => GetColaboratorRequestsFilters(filters.value),
});

const colaboratorRequests = computed(() => data.value?.data ?? []);

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
