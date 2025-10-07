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
      @reject="HandleRejected"
    />

    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>

    <div
      v-if="!isLoading && audiosRequest.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      We dont havent audio requests now
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import Request_Audio_Card from "./Request_Audio._Card.vue";
import type { AudiosByFilters } from "../interfaces/AudiosByFilter";
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { GetAllAudiosByFilters } from "../services/AudioService";
import { UseDisableShort } from "../hooks/UseDisableShort";

const props = defineProps({
  Country: {
    type: String,
  },
});

const filters = ref<AudiosByFilters>({
  country: "",
  page: 1,
  limit: 5,
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

const DisableRequestMutation = UseDisableShort();

const HandleRejected = async (id: string) => {
  try {
    await DisableRequestMutation.mutate(id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    refetch();
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
