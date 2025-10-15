<template>
  <div class="flex flex-col gap-4 items-center w-11/12">
    <Phrases_Registered_Card
      v-if="audiosRegistered.length > 0"
      v-for="audio in audiosRegistered"
      :key="audio.id"
      :itemId="audio.id"
      :admin="audio.reviewedBy || ''"
      :meaning="audio.description"
      :name="audio.createBy"
      :phrase="audio.text"
      :fileUrl="audio.fileUrl"
      :status="audio.approved ?? false"
      @idItem="handleItem"
      @openModal="handleIsOpenModal"
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
      v-if="!hasNextPage && audiosRegistered.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>

    <div
      v-if="!isLoading && audiosRegistered.length === 0"
      class="text-center mt-10 p-10"
    >
      <NotFound message="Sorry, we dont have phrases avalible now" />
    </div>

    <Phrases_Registered_Modal
      :isOpen="isOpenModal"
      @close="isOpenModal = false"
      :idRequest="item"
      @completed="handleCompleted"
      :typeAction="isAccepeted"
    />
  </div>
</template>

<script setup lang="ts">
import Phrases_Registered_Card from "./Phrases_Registered_Card.vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { AudiosByFilters } from "../../Audio/interfaces/AudiosByFilter";
import { GetAllAudiosByFilters } from "../../Audio/services/AudioService";
import Phrases_Registered_Modal from "./modal/Phrases_Registered_Modal.vue";
import NotFound from "../../../common/components/NotFound.vue";
import type { PaginatedResponse } from "../../Audio/interfaces/PaginatedReponse";
import type { Short } from "../../Audio/interfaces/Short";
import GoToStart from "../../../components/microcomponents/GoToStart.vue";

const props = defineProps({
  Status: {
    type: Boolean,
  },
  Country: {
    type: String,
  },
});

const filters = ref<AudiosByFilters>({
  country: undefined,
  approved: true,
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

const audiosRegistered = computed(
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

watch(
  () => props.Status,
  (newStatus) => {
    filters.value.approved = newStatus;
    refetch();
  }
);

const item = ref("");
const handleItem = (itemId: string) => {
  item.value = itemId;
};

const isOpenModal = ref(false);
const handleIsOpenModal = (isModalOpen: boolean) => {
  isOpenModal.value = isModalOpen;
};

const isAccepeted = ref(false);
const handleAction = (action: boolean) => {
  isAccepeted.value = action;
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
