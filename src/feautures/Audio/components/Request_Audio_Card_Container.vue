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

    <GoToStart v-show="showScrollTop" @click="scrollToTop" />

    <div
      v-if="isPending || isFetchingNextPage"
      class="text-center py-4 text-gray-500"
    >
      Loading more...
    </div>

    <div
      v-if="!hasNextPage && audiosRequest.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>

    <div
      v-if="!isLoading && audiosRequest.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      <NotFoundVue message="Sorry, we dont have audio requests avalible now" />
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
import Request_Audio_Card from "./Request_Audio._Card.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import Audio_Request_Modal from "./modals/Audio_Request_Modal.vue";
import type { PaginatedResponse } from "../interfaces/PaginatedReponse";
import type { Short } from "../interfaces/Short";
import type { AudiosByFilters } from "@shared/Interfaces/AudiosByFilter";
import { GetAllAudiosByFilters } from "@shared/Service/AudioService";
import NotFoundVue from "@NotFound";

const props = defineProps({
  Country: {
    type: String,
  },
});

const filters = ref<AudiosByFilters>({
  country: undefined,
  approved: undefined,
});

const showScrollTop = ref(false);

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  refetch,
  isLoading,
} = useInfiniteQuery<PaginatedResponse<Short>, Error>({
  queryKey: computed(() => ["Request_Audios", filters]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetAllAudiosByFilters({
      ...filters.value,
      page,
      limit: 5,
    });
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.meta?.hasNextPage ? allPages.length + 1 : undefined;
  },
  getPreviousPageParam: (firstPage, allPages) => {
    return firstPage.meta?.hasPrevPage ? allPages.length - 1 : undefined;
  },
});

const audiosRequest = computed(
  () => data.value?.pages.flatMap((page) => page.data) ?? []
);

const onScroll = async () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  showScrollTop.value = scrollTop > 300;

  if (
    scrollTop + clientHeight >= scrollHeight - 150 &&
    hasNextPage.value &&
    !isFetchingNextPage.value
  ) {
    await fetchNextPage();
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

watch(
  () => props.Country,
  (newCountry) => {
    filters.value.country = newCountry;
    refetch();
  }
);

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
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped></style>
