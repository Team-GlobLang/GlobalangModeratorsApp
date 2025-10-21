<template>
  <div class="flex flex-col items-center w-11/12">
    <div
      :class="stickyTopPading"
      class="w-full flex flex-col items-center sticky z-40 bg-[#F1F4FB] pb-3"
    >
      <div class="w-full">
        <FwbInput
          list="countries"
          v-model="country"
          type="text"
          :validation-status="countryError ? 'error' : undefined"
          label="Contry"
          placeholder="Ej: Costa Rica"
        >
          <template #suffix>
            <span class="pi pi-home"></span>
          </template>
          <template #validationMessage>
            <span class="font-medium">{{ countryError }} </span>
          </template>
        </FwbInput>

        <datalist id="countries">
          <option
            v-for="countryItem in filteredCountries"
            :key="countryItem.code"
            :value="countryItem.name"
          >
            {{ countryItem.name }}
          </option>
        </datalist>
      </div>

      <div class="w-full">
        <FwbSelect
          v-model="selected"
          :options="status"
          label="Choose a status"
          placeholder=""
        />
      </div>
    </div>
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
import Audio_Request_Modal from "../../Audio/components/modals/Audio_Request_Modal.vue";
import { FwbInput } from "flowbite-vue";
import { FwbSelect } from "flowbite-vue";
import { useField } from "vee-validate";
import { countries } from "@core/CountriesArray";

import { Capacitor } from "@capacitor/core";

const MAX_INITIAL = 10;

const filteredCountries = computed(() => {
  if (!country.value) {
    return countries.slice(0, MAX_INITIAL);
  }
  return countries.filter((c) =>
    c.name.toLowerCase().includes(country.value.toLowerCase())
  );
});

const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const selected = ref("1");
const status = [
  { value: "1", name: "Approved" },
  { value: "0", name: "Rejected" },
];

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

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
  queryKey: computed(() => ["Request_Audios", country.value, selected.value]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetAllAudiosByFilters({
      country: country.value || undefined,
      approved: selected.value === "1" ? true : false,
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
