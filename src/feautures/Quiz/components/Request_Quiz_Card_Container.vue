<template>
  <div class="flex flex-col gap-4 items-center w-11/12">
    <Request_Quiz_Card
      v-if="quizList.length > 0"
      v-for="quizz in quizList"
      :key="quizz.id"
      :id="quizz.id"
      :user="quizz.creator"
      :title="quizz.name"
      :country="quizz.country"
      :questionsNUmber="quizz.numberOfQuestions"
      :onAction="handleAction"
      :writtenIn="quizz.writtenIn"
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
      class="text-center mt-10 p-10"
    >
      <NotFoundVue
        message="Sorry, we dont have quizzes requests avalible now"
      />
    </div>

    <Review_Quiz_Modal
      :isOpen="modalState.isOpen"
      @close="modalState.isOpen = false"
      :typeAction="modalState.isAccepted"
      :idRequest="modalState.requestId"
      @completed="handleCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import Request_Quiz_Card from "../components/Request_Quiz_Card.vue";
import { GetQuizzesList } from "../services/QuizService";
import type { QuizData } from "../interfaces/QuizType";
import { useInfiniteQuery } from "@tanstack/vue-query";
import type { PaginatedResponse } from "@ComonResponse";
import NotFoundVue from "@NotFound";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import Review_Quiz_Modal from "./modals/Review_Quiz_Modal.vue";

const props = defineProps<{ country: string | undefined }>();
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
  queryKey: computed(() => ["Request_quiz", props.country]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetQuizzesList({
      country: props.country,
      page,
      limit: 5,
      isApproved: null,
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
