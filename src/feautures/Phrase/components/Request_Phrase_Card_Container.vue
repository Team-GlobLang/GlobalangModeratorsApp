<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col items-center gap-4 w-full">
    <Phrases_Registered_Card
      v-if="audiosRegistered.length > 0"
      v-for="audio in audiosRegistered"
      :key="audio.id"
      :itemId="audio.id"
      :admin="audio.reviewedBy"
      :meaning="audio.description"
      :name="audio.createBy"
      :phrase="audio.text"
      :fileUrl="audio.fileUrl"
      @idItem="handleItem"
      @openModal="handleIsOpenModal"
    />
    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>

    <div
      v-if="!isLoading && audiosRegistered.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      We dont havent audios registereds now
    </div>

    <Phrases_Registered_Modal
      :isOpen="isOpenModal"
      @close="isOpenModal = false"
      :idRequest="item"
      @completed="handleCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Phrases_Registered_Card from "./Phrases_Registered_Card.vue";
import { useQuery } from "@tanstack/vue-query";
import { computed, onMounted, ref, watch } from "vue";
import type { AudiosByFilters } from "../../Audio/interfaces/AudiosByFilter";
import { GetAllAudiosByFilters } from "../../Audio/services/AudioService";
import Phrases_Registered_Modal from "./modal/Phrases_Registered_Modal.vue";

const props = defineProps({
  Status: {
    type: Boolean,
  },
  Country: {
    type: String,
  },
});

const filters = ref<AudiosByFilters>({
  page: 1,
  limit: 5,
  country: "",
  approved: true,
});

const { data, isLoading, refetch } = useQuery({
  queryKey: ["Audios_Registered", filters],
  queryFn: () => GetAllAudiosByFilters(filters.value),
});

watch(
  () => props.Country,
  (newCountry) => {
    filters.value.country = newCountry;
    refetch();
  }
);

watch(
  () => props.Status,
  (newStatus) => {
    filters.value.approved = newStatus;
    refetch();
  }
);

const audiosRegistered = computed(() => data.value?.data ?? []);

const item = ref("");
const handleItem = (itemId: string) => {
  item.value = itemId;
};

const isOpenModal = ref(false);
const handleIsOpenModal = (isModalOpen: boolean) => {
  isOpenModal.value = isModalOpen;
};

const handleCompleted = () => {
  refetch();
};

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
