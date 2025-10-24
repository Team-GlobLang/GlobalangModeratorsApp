<template>
  <div class="flex flex-col gap-4 items-center w-11/12">
    <div :class="stickyTopPading" class="w-full sticky z-40 bg-[#F1F4FB]">
      <FwbInput
        list="languages"
        v-model="language"
        type="text"
        :validation-status="languageError ? 'error' : undefined"
        @blur="languageBlur"
        label="Choose a language"
        placeholder="Ej: Spanish, English"
      >
        <template #suffix>
          <span class="pi pi-language"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ languageError }} </span>
        </template>
      </FwbInput>

      <datalist id="languages">
        <option v-for="lang in filteredLanguages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </datalist>
    </div>
    <Request_Colaborator_Card
      v-if="colaboratorsRequest.length > 0"
      v-for="item in colaboratorsRequest"
      :key="item.id"
      :id_item="item.id"
      :user="item.fullName"
      :language="item.languages"
      :category="item.category"
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
      v-if="!hasNextPage && colaboratorsRequest.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>

    <div
      v-if="!isLoading && colaboratorsRequest.length === 0"
      class="text-center mt-10 p-10"
    >
      <NotFoundVue
        message="Sorry, we dont have collaboratos requests avalible now"
      />
    </div>
    <Colab_Request_View_Modal
      :isOpen="modalState.isOpen"
      @close="modalState.isOpen = false"
      :typeAction="modalState.isAccepted"
      :idRequest="modalState.requestId"
      @completed="handleCompleted"
    />
  </div>
</template>

<script setup lang="ts">
import Request_Colaborator_Card from "./Request_Colaborator_Card.vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestsFilters } from "../services/ColaboratorServices";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import type { PaginatedResponse } from "../../Audio/interfaces/PaginatedReponse";
import type { Collab } from "../interfaces/Colaborator";
import NotFoundVue from "@NotFound";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import Colab_Request_View_Modal from "./modals/Colab_Request_View_Modal.vue";
import { countries } from "@core/CountriesArray";
import { FwbInput } from "flowbite-vue";
import { useField } from "vee-validate";
import { Capacitor } from "@capacitor/core";

const MAX_INITIAL = 10;

const allLanguages = computed(() => {
  const languagesSet = new Set<string>();
  countries.forEach((country) => {
    country.languages.forEach((lang) => {
      languagesSet.add(lang);
    });
  });
  return Array.from(languagesSet).sort();
});

const filteredLanguages = computed(() => {
  if (!language.value) {
    return allLanguages.value.slice(0, MAX_INITIAL);
  }
  return allLanguages.value.filter((lang) =>
    lang.toLowerCase().includes(language.value.toLowerCase())
  );
});

const {
  value: language,
  errorMessage: languageError,
  handleBlur: languageBlur,
} = useField<string>("language");

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
  queryKey: computed(() => ["Request_Collab", language.value]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetColaboratorRequestsFilters({
      languages: language.value,
      page,
      limit: 6,
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

const colaboratorsRequest = computed(
  () => data.value?.pages.flatMap((page) => page.data) ?? []
);

const isNative = !Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

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
