<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col items-center gap-8 w-full">
    <Request_Audio_Card
      v-if="audiosRequest.length > 0"
      v-for="request in audiosRequest"
      :key="request.id"
      :name="request.createBy"
      :meaning="request.description"
      :phrase="request.text"
      :fileUrl="request.fileUrl"
    />

    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>

    <div
      v-if="!isLoading && audiosRequest.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      We dont havent Audio requests now
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Request_Audio_Card from "./Request_Audio._Card.vue";
import type { AudiosByFilters } from "../interfaces/AudiosByFilter";
import { computed, onMounted, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { GetAllAudiosByFilters } from "../services/AudioService";

const filters = ref<AudiosByFilters>({
  country: "Costa Rica",
  approved: false,
  page: 1,
  limit: 5,
});

const { data, isLoading, refetch } = useQuery({
  queryKey: ["Request_Audios", filters],
  queryFn: () => GetAllAudiosByFilters(filters.value),
});

const audiosRequest = computed(() => data.value?.data ?? []);

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
