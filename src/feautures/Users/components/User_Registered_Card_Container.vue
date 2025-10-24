<template>
  <div class="flex flex-col gap-4 items-center w-11/12">
    <div :class="stickyTopPading" class="w-full sticky z-40 bg-[#F1F4FB]">
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

      <FwbInput
        v-model="email"
        type="email"
        :validation-status="emailError ? 'error' : undefined"
        @blur="emailBlur"
        label="Email"
        placeholder="example@email.com"
      />
    </div>

    <Users_Registered_Card
      v-if="Users.length > 0"
      v-for="item in Users"
      :key="item.id"
      :user="item.fullName"
      :age="calculateAge(item.birthDate)"
      :email="item.email"
      :suscripcion="item.membership || 'Free trial'"
      end_date="27/11/2026"
    />

    <GoToStart v-show="showScrollTop" @click="scrollToTop" />

    <div
      v-if="isPending || isFetchingNextPage"
      class="text-center py-4 text-gray-500"
    >
      Loading more...
    </div>

    <div
      v-if="!hasNextPage && Users.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>
    <div v-if="!isLoading && Users.length === 0" class="text-center w-1/2 m-4">
      <NotFound message="Sorry, we dont have users avalible now" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Users_Registered_Card from "./Users_Registered_Card.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { GetUsersFiltered } from "../services/UserServices";
import type { User } from "../interfaces/User";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import type { PaginatedResponse } from "@ComonResponse";
import NotFound from "@NotFound";
import { FwbInput } from "flowbite-vue";
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

const isNative = !Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

const {
  value: email,
  errorMessage: emailError,
  handleBlur: emailBlur,
} = useField<string>("email");

const showScrollTop = ref(false);

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  //refetch,
  isLoading,
} = useInfiniteQuery<PaginatedResponse<User>, Error>({
  queryKey: computed(() => ["Users_Registered", email.value, country.value]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetUsersFiltered({
      country: country.value,
      email: email.value,
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

const Users = computed(
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

const calculateAge = (birthdate: string | Date): number => {
  if (!birthdate) return 0;
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  return age;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped></style>
