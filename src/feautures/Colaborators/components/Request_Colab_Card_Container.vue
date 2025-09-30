<template>
  <div class="w-full flex flex-col items-center gap-6">
    <Request_Colaborator_Card
      v-if="colaboratorsRequest.length > 0"
      v-for="item in colaboratorsRequest"
      :key="item.Colaborator_Id"
      :id_item="item.Colaborator_Id"
      :user="item.userinfo.fullName"
      :language="item.Languages"
      :title="item.Academic_Title"
      :category="item.Category"
      @accept="HandleViewRequest"
      @reject="HandleRejected"
    />

    <fwb-button
      v-if="showingAll != true"
      @click="toggleShowAll"
      class="w-full bg-[#2C2C2C]"
      >See more</fwb-button
    >

    <div
      v-if="!isLoading && colaboratorsRequest.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      We dont havent colaboratos request now
    </div>
  </div>
</template>

<script setup lang="ts">
import Request_Colaborator_Card from "./Request_Colaborator_Card.vue";
import { useQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestsFilters } from "../services/ColaboratorServices";
import { UseChangeRequestStatus } from "../hooks/UseChangeRequestStatus";
import { computed, onMounted, ref, watch } from "vue";
import { Status } from "../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestFilters } from "../interfaces/ColaboratorRequestFiltersInterface";
import { useRouter } from "vue-router";
import type { ColaboratorRequestChangeStatus } from "../interfaces/ColaboratorRequestChangeStatusInterface";
import { FwbButton } from "flowbite-vue";

const props = defineProps({
  language: {
    type: String,
  },
});

const showingAll = ref(false);

const allColaborators = ref<any[]>([]);

const filters = ref<ColaboratorRequestFilters>({
  Status: Status.PENDING,
  Languages: "",
  page: 1,
  limit: 2,
});

watch(showingAll, (newShowingAll) => {
  if (newShowingAll) {
    filters.value.page = 1;
    filters.value.limit = 999999;
  } else {
    filters.value.page = 1;
    filters.value.limit = 2;
  }
  allColaborators.value = [];
  refetch();
});

watch(
  () => props.language,
  (newLanguage) => {
    filters.value.Languages = newLanguage;
    filters.value.page = 1;
    allColaborators.value = [];
    refetch();
  }
);

const { data, isLoading, refetch } = useQuery({
  queryKey: ["colaborators", filters],
  queryFn: () => GetColaboratorRequestsFilters(filters.value),
});

const colaboratorsRequest = computed(() => data.value?.data ?? []);

watch(data, (newData) => {
  if (newData?.data) {
    if (filters.value.page === 1) {
      allColaborators.value = newData.data;
    } else {
      allColaborators.value = [...allColaborators.value, ...newData.data];
    }
  }
});

const router = useRouter();

const HandleViewRequest = (colaboratorId: string) => {
  router.push({
    name: "colaborator_request_view",
    params: { id: colaboratorId },
  });
};

const mutationChangeRequest = UseChangeRequestStatus();

const HandleRejected = async (colaboratorId: string) => {
  const colaboratorRequestChangeStatus: ColaboratorRequestChangeStatus = {
    Id: colaboratorId,
    Status: Status.REJECTED,
  };
  try {
    await mutationChangeRequest.mutate(colaboratorRequestChangeStatus);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    refetch();
    console.log("paso de fetch");
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

const toggleShowAll = () => {
  showingAll.value = !showingAll.value;
};

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
