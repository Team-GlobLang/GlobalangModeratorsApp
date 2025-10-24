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

      <FwbSelect v-model="selected" :options="status" label="Choose a status" />
    </div>

    <Teacher_Colaborator_Card
      v-if="colaboratorRequests.length > 0"
      v-for="item in colaboratorRequests"
      :key="item.id"
      :id="item.id"
      :user="item.fullName"
      :category="item.category"
      :aprobe-by="item.reviewedId"
      :language="item.languages"
      :status="item.status || ''"
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
      v-if="!hasNextPage && colaboratorRequests.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>
    <div
      v-if="!isLoading && colaboratorRequests.length === 0"
      class="text-center mt-10 p-10"
    >
      <NotFoundVue message="Sorry, we dont have collaborators avalible now" />
    </div>

    <Colab_Request_View_Modal
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
import Teacher_Colaborator_Card from "./Teacher_Colaborator_Card.vue";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestsFilters } from "../services/ColaboratorServices";
import type { Collab } from "../interfaces/Colaborator";
import NotFoundVue from "@NotFound";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import type { PaginatedResponse } from "@ComonResponse";
import Colab_Request_View_Modal from "./modals/Colab_Request_View_Modal.vue";
import { FwbInput } from "flowbite-vue";
import { FwbSelect } from "flowbite-vue";
import { useField } from "vee-validate";
import { countries } from "@core/CountriesArray";
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

const selected = ref("");

const status = [
  { value: "ACCEPTED", name: "Accepted" },
  { value: "REJECTED", name: "Rejected" },
];

const isNative = !Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

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
  queryKey: computed(() => [
    "Registers_Collabs",
    language.value,
    selected.value,
  ]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetColaboratorRequestsFilters({
      languages: language.value,
      status: selected.value,
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
