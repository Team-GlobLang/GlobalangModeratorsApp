<template>
  <div class="flex flex-col items-center w-11/12">
    <div class="flex flex-col w-full gap-4">
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
        :onAction="handleAction"
        :country="audio.country"
      />
    </div>

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
      <NotFoundVue message="Sorry, we dont have phrases avalible now" />
    </div>

    <Audio_Request_Modal
      :isOpen="modalState.isOpen"
      @close="modalState.isOpen = false"
      :idRequest="modalState.requestId"
      @completed="handleCompleted"
      :typeAction="modalState.isAccepted"
      :isRegistered="true"
    />
  </div>
</template>

<script setup lang="ts">
import Phrases_Registered_Card from "./Phrases_Registered_Card.vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import NotFoundVue from "@NotFound";
import type { PaginatedResponse } from "@ComonResponse";
import { GetAllAudiosByFilters } from "@shared/Service/AudioService";
import type { Short } from "@shared/Interfaces/Short";
import Audio_Request_Modal from "./modals/Audio_Request_Modal.vue";

const props = defineProps<{
  country: string | null;
  selected: string;
}>();
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
  queryKey: computed(() => [
    "Registered_Audios",
    props.country,
    props.selected,
  ]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetAllAudiosByFilters({
      country: props.country || undefined,
      approved: props.selected === "1" ? true : false,
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

const modalState = reactive({
  isOpen: false,
  isAccepted: false,
  requestId: "",
});

const handleAction = ({
  id,
  isAccepted,
}: {
  id: string;
  isAccepted: boolean;
}) => {
  modalState.requestId = id;
  modalState.isAccepted = isAccepted;
  modalState.isOpen = true;
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
