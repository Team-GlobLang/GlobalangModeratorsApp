<template>
  <div class="flex flex-col gap-4 items-center w-full px-4">
    <Request_Quiz_Card
      v-if="quizList.length > 0"
      v-for="quizz in quizList"
      :key="quizz.id"
      :id="quizz.id"
      :user="quizz.creator"
      :title="quizz.name"
      :country="quizz.country"
      :questionsNUmber="quizz.numberOfQuestions"
      @accept="HandleViewRequest"
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
      v-if="!hasNextPage && quizList.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>

    <div
      v-if="!isLoading && quizList.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      <NotFound message="Sorry, we dont have audio requests avalible now" />
    </div>

    <Request_Quiz_Modal
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
      :typeAction="isAccepeted"
      :idRequest="IdItem"
      @completed="handleCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import Request_Quiz_Card from "../components/Request_Quiz_Card.vue";
import { GetQuizzesList } from "../services/QuizService";
import type { PaginatedResponse } from "../../Audio/interfaces/PaginatedReponse";
import type { QuizData, QuizzesFilters } from "../interfaces/QuizType";
import { useInfiniteQuery } from "@tanstack/vue-query";
import GoToStart from "../../../components/microcomponents/GoToStart.vue";
import { useRouter } from "vue-router";
import Request_Quiz_Modal from "./modals/Request_Quiz_Modal.vue";

const props = defineProps({
  country: {
    type: String,
  },
});

const filters = ref<QuizzesFilters>({
  country: undefined,
  isApproved: undefined,
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
} = useInfiniteQuery<PaginatedResponse<QuizData>, Error>({
  queryKey: computed(() => ["Request_Audios", filters]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetQuizzesList({
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

const quizList = computed(
  () => data.value?.pages.flatMap((page) => page.data) ?? []
);

watch(
  () => props.country,
  (newCountry) => {
    filters.value.country = newCountry;
    refetch();
  }
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

const router = useRouter();
const HandleViewRequest = (id: string) => {
  router.push({
    name: "review_quiz",
    params: { id: id },
  });
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
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped></style>
