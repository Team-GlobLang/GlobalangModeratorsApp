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

    <div
      v-if="!isLoading && colaboratorsRequest.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      We dont havent colaboratos request now
    </div>
    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>
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

const filters = ref<ColaboratorRequestFilters>({
  Status: Status.PENDING,
  Languages: "",
});

watch(
  () => props.language,
  (newLanguage) => {
    filters.value.Languages = newLanguage;
  }
);

//const limit = ref(10);
// const showLoadMore = ref(true);

const { data, isLoading, refetch } = useQuery({
  queryKey: ["colaborators", filters],
  queryFn: () => GetColaboratorRequestsFilters(filters.value),
});

const colaboratorsRequest = computed(() => data.value ?? []);

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

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
