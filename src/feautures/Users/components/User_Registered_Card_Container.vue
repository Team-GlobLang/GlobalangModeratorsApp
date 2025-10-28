<template>
  <div class="flex flex-col gap-4 items-center w-11/12">
    <Users_Registered_Card
      v-if="Users.length > 0"
      v-for="item in Users"
      :key="item.id"
      :id="item.id"
      :user="item.fullName"
      :age="calculateAge(item.birthDate)"
      :role="item.role"
      :email="item.email"
      :suscripcion="item.membership || 'Free trial'"
      :end_date="item.membershipExpiration"
      :active="item.isActived"
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
      v-if="!hasNextPage && Users.length > 0"
      class="text-center py-4 text-gray-500"
    >
      No more requests
    </div>
    <div v-if="!isLoading && Users.length === 0" class="text-center w-1/2 m-4">
      <NotFound message="Sorry, we dont have users avalible now" />
    </div>

    <ActiveAccountModal
      :isOpen="modalState.isOpen"
      @close="modalState.isOpen = false"
      :isActive="modalState.isActive"
      :idUser="modalState.userId"
    />
  </div>
</template>

<script setup lang="ts">
import Users_Registered_Card from "./Users_Registered_Card.vue";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { GetUsersFiltered } from "../services/UserServices";
import type { User } from "../interfaces/User";
import GoToStart from "@components/microcomponents/GoToStart.vue";
import type { PaginatedResponse } from "@ComonResponse";
import NotFound from "@NotFound";
import ActiveAccountModal from "./modals/ActiveAccountModal.vue";

const props = defineProps<{
  country: string | undefined;
  email: string | undefined;
}>();
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
  queryKey: computed(() => ["Users_Registered", props.email, props.country]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetUsersFiltered({
      country: props.country,
      email: props.email,
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

const modalState = reactive({
  isOpen: false,
  isActive: false,
  userId: "",
});

const handleAction = ({ id, isActive }: { id: string; isActive: boolean }) => {
  modalState.userId = id;
  modalState.isActive = isActive;
  modalState.isOpen = true;
};
onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped></style>
