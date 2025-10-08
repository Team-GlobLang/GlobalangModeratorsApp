<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col gap-4 items-center w-full bg-white">
    <Request_Audio_Card
      v-if="audiosRequest.length > 0"
      v-for="request in audiosRequest"
      :key="request.id"
      :id="request.id"
      :name="request.createBy"
      :meaning="request.description"
      :phrase="request.text"
      :fileUrl="request.fileUrl"
      @idItem="handleIdItem"
      @openModal="handleOpenModal"
      @isAccepted="handleAction"
    />

    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>

    <div
      v-if="!isLoading && audiosRequest.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      <NotFound />
    </div>
    <Audio_Request_Modal
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
      :typeAction="isAccepeted"
      :idRequest="IdItem"
      @completed="handleCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Request_Audio_Card from "./Request_Audio._Card.vue";
import type { AudiosByFilters } from "../interfaces/AudiosByFilter";
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { GetAllAudiosByFilters } from "../services/AudioService";
import Audio_Request_Modal from "./modals/Audio_Request_Modal.vue";
import NotFound from "../../../common/components/NotFound.vue";

const props = defineProps({
  Country: {
    type: String,
  },
});

const filters = ref<AudiosByFilters>({
  country: undefined,
  page: 1,
  limit: 5,
  approved: undefined,
});

const { data, isLoading, refetch } = useQuery({
  queryKey: ["Request_Audios", filters],
  queryFn: () => GetAllAudiosByFilters(filters.value),
});

watch(
  () => props.Country,
  (newCountry) => {
    filters.value.country = newCountry;
    refetch();
  }
);

const audiosRequest = computed(() => data.value?.data ?? []);

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
