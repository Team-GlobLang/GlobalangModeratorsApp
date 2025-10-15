<template>
  <div class="flex flex-col gap-4 items-center w-11/12">
    <Users_Registered_Card
      v-if="Users.length > 0"
      v-for="item in Users"
      :key="item.id"
      :user="item.fullName"
      :age="calculateAge(item.birthDate)"
      :email="item.email"
      :suscripcion="item.membership || 'Free trial'"
      end_date="20/9/2026"
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
import type { UserFilter } from "../interfaces/user-filter-interface";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { GetUsersFiltered } from "../services/UserServices";
import type { User } from "../interfaces/User";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import type { PaginatedResponse } from "@ComonResponse";

const props = defineProps<{
  Email?: string;
  country?: string;
}>();

const filters = ref<UserFilter>({
  country: undefined,
  email: undefined,
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
} = useInfiniteQuery<PaginatedResponse<User>, Error>({
  queryKey: computed(() => ["Users", filters]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetUsersFiltered({
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

watch(
  () => props.Email,
  (newEmail) => {
    filters.value.email = newEmail;
    filters.value.page = 1;
    refetch();
  }
);

watch(
  () => props.country,
  (newCountry) => {
    filters.value.country = newCountry;
    filters.value.page = 1;
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
