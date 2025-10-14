<template>
  <section class="flex flex-col gap-4 bg-white">
    <div class="flex flex-col items-center" v-if="rankin.length > 0">
      <span class="text-lg font-bold"> Global ranking </span>
    </div>

    <Rankin_Card
      v-if="rankin.length > 0"
      v-for="rank in rankin"
      :fullName="rank.fullName"
      :position="rank.position"
      :totalPoints="rank.totalPoints"
      :quizzesCompleted="rank.totalRecords"
    />

    <GoToStart v-show="showScrollTop" @click="scrollToTop" />

    <div
      v-if="isPending || isFetchingNextPage"
      class="text-center py-4 text-gray-500"
    >
      Loading more...
    </div>

    <div
      v-if="!hasNextPage && rankin.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>

    <div
      v-if="!isLoading && rankin.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      <NotFound message="Sorry, we dont have registers avalible now" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import Rankin_Card from "./Rankin_Card.vue";
import type { StatsFilterDto } from "../interfaces/filter-stats.interface";
import { useInfiniteQuery } from "@tanstack/vue-query";
import type { PaginatedResponse } from "../../Audio/interfaces/PaginatedReponse";
import type { Rank } from "../interfaces/rank.inter";
import { GetRankin } from "../services/StatsServices";
import GoToStart from "../../../components/microcomponents/GoToStart.vue";
import NotFound from "../../../common/components/NotFound.vue";

const props = defineProps({
  country: {
    type: String,
  },
});

const showScrollTop = ref(false);

const filter = ref<StatsFilterDto>({
  country: undefined,
});

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  refetch,
  isLoading,
} = useInfiniteQuery<PaginatedResponse<Rank>, Error>({
  queryKey: computed(() => ["Global_Rank", filter]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetRankin({
      ...filter.value,
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

const rankin = computed(
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
  () => props.country,
  (newCountry) => {
    filter.value.country = newCountry;
    refetch();
  }
);

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped></style>
