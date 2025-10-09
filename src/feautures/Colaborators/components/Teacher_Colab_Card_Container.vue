<template>
  <!-- Cambiar por v for cuando haga logica con db -->
  <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
  <div class="flex flex-col gap-8 w-full items-center">
    <Teacher_Colaborator_Card
      v-if="colaboratorRequests.length > 0"
      v-for="item in colaboratorRequests"
      :key="item.id"
      :user="item.fullName"
      :category="item.category"
      :aprobe-by="item.reviewedId"
      :language="item.languages"
    />
    <GoToStart v-show="showScrollTop" @click="scrollToTop" />

    <div
      v-if="isPending || isFetchingNextPage"
      class="text-center py-4 text-gray-500"
    >
      Loading more...
    </div>

    <div
      v-if="!hasNextPage && colaboratorRequests.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>
    <div
      v-if="!isLoading && colaboratorRequests.length === 0"
      class="text-center mt-10 p-10 bg-white"
    >
      <NotFound message="Sorry, we dont have collaborators avalible now" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Teacher_Colaborator_Card from "./Teacher_Colaborator_Card.vue";
import { Status } from "../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestFilters } from "../interfaces/ColaboratorRequestFiltersInterface";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestsFilters } from "../services/ColaboratorServices";
import NotFound from "../../../common/components/NotFound.vue";
import type { PaginatedResponse } from "../../Audio/interfaces/PaginatedReponse";
import type { Collab } from "../interfaces/Colaborator";
import GoToStart from "../../../components/microcomponents/GoToStart.vue";

const props = defineProps({
  language: {
    type: String,
  },
  status: {
    type: String,
  },
});

const filters = ref<ColaboratorRequestFilters>({
  status: Status.ACCEPTED,
  languages: "",
});

watch(
  () => props.language,
  (newLanguage) => {
    filters.value.languages = newLanguage;
    filters.value.page = 1;
    refetch();
  }
);

watch(
  () => props.status,
  (newStatus) => {
    filters.value.status = newStatus;
    filters.value.page = 1;
    refetch();
  }
);

const showScrollTop = ref(false);

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  refetch,
  isLoading,
} = useInfiniteQuery<PaginatedResponse<Collab>, Error>({
  queryKey: computed(() => ["Request_Audios", filters]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetColaboratorRequestsFilters({
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

const colaboratorRequests = computed(
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

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped></style>
