<template>
  <div class="flex flex-col gap-4 items-center w-11/12">
    <Quiz_Registerd_Card
      v-if="quizList.length > 0"
      v-for="quiz in quizList"
      :key="quiz.id"
      :id="quiz.id"
      :user="quiz.creator"
      :country="quiz.country"
      :aprobe-by="quiz.approvedBy"
      :title="quiz.name"
      :questions-n-umber="quiz.numberOfQuestions"
      :status="quiz.isApproved ?? false"
      :onAction="handleAction"
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
      <NotFoundVue message="Sorry, we dont have quizzes avalible now" />
    </div>

    <Review_Quiz_Modal
      :isOpen="modalState.isOpen"
      @close="modalState.isOpen = false"
      :typeAction="modalState.isAccepted"
      :idRequest="modalState.requestId"
      @completed="handleCompleted"
      :isRegistered="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import type { QuizData } from "../interfaces/QuizType";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { GetQuizzesList } from "../services/QuizService";
import Quiz_Registerd_Card from "./Quiz_Registerd_Card.vue";
import NotFoundVue from "@NotFound";
import type { PaginatedResponse } from "@ComonResponse";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import Review_Quiz_Modal from "./modals/Review_Quiz_Modal.vue";

const props = defineProps<{ 
  country: string | undefined;
  selected: string | undefined;
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
} = useInfiniteQuery<PaginatedResponse<QuizData>, Error>({
  queryKey: computed(() => ["Registered_Quiz", props.country, props.selected]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetQuizzesList({
      country: props.country,
      isApproved: props.selected === "1" ? true : false,
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
