<template>
  <div class="w-full flex flex-col items-center gap-6">
    <Request_Colaborator_Card
      v-if="colaboratorsRequest.length > 0"
      v-for="item in colaboratorsRequest"
      :key="item.id"
      :id_item="item.id"
      :user="item.fullName"
      :language="item.languages"
      :category="item.category"
      @accept="HandleViewRequest"
      @idItem="handleIdItem"
      @openModal="handleOpenModal"
      @isAccepted="handleAction"
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
    <Request_Colab_Modal
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
      :typeAction="isAccepeted"
      :idRequest="IdItem"
      @completed="handleCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import Request_Colaborator_Card from "./Request_Colaborator_Card.vue";
import { useQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestsFilters } from "../services/ColaboratorServices";
import { computed, onMounted, ref, watch } from "vue";
import { Status } from "../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestFilters } from "../interfaces/ColaboratorRequestFiltersInterface";
import { useRouter } from "vue-router";
import { FwbButton } from "flowbite-vue";
import Request_Colab_Modal from "./modals/Request_Colab_Modal.vue";

const props = defineProps({
  language: {
    type: String,
  },
});

const showingAll = ref(false);

const allColaborators = ref<any[]>([]);

const filters = ref<ColaboratorRequestFilters>({
  status: Status.PENDING,
  languages: "",
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
    filters.value.languages = newLanguage;
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

const HandleViewRequest = (id: string) => {
  router.push({
    name: "colaborator_request_view",
    params: { id: id },
  });
};

const toggleShowAll = () => {
  showingAll.value = !showingAll.value;
};

const isModalOpen = ref(false);
const handleOpenModal = (shouldOpen: boolean) => {
  isModalOpen.value = shouldOpen;
};

const isAccepeted = ref(false);
const handleAction = (action: boolean) => {
  isAccepeted.value = action;
};

const IdItem = ref("");
const handleIdItem = (id: string) => {
  IdItem.value = id;
};

const handleCompleted = () => {
  refetch();
};

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
