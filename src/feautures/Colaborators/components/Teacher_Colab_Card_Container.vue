<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col gap-8 w-full items-center">
    <Teacher_Colaborator_Card
      v-if="colaboratorRequests.length > 0"
      v-for="item in colaboratorRequests"
      :key="item.id"
      :user="item.fullName"
      :category="item.category"
      :aprobe-by="item.reviewedId"
      :language="item.languages"
    />
    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>
    <div
      v-if="!isLoading && colaboratorRequests.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      <NotFound message="Sorry, we dont have collaborators avalible now" />
    </div>
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
import NotFound from "../../../common/components/NotFound.vue";

const props = defineProps({
  language: {
    type: String,
  },
  status: {
    type: String,
  },
});

const filters = ref<ColaboratorRequestFilters>({
  status: Status.ACCEPTED,
  languages: "",
  page: 1,
  limit: 2,
});

const allColaborators = ref<any[]>([]);

watch(
  () => props.language,
  (newLanguage) => {
    filters.value.languages = newLanguage;
    filters.value.page = 1;
    allColaborators.value = [];
    refetch();
  }
);

watch(
  () => props.status,
  (newStatus) => {
    filters.value.status = newStatus;
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
