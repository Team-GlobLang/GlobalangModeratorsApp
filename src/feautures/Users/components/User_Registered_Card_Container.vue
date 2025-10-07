<template>
  <div class="w-full flex flex-col gap-6 items-center">
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
    <fwb-button class="w-full bg-[#2C2C2C]">See more</fwb-button>

    <div v-if="!isLoading && Users.length === 0" class="text-center w-1/2 m-4">
      <NotFound message="Sorry, we dont have user avalible now" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Users_Registered_Card from "./Users_Registered_Card.vue";
import { FwbButton } from "flowbite-vue";
import type { UserFilter } from "../interfaces/user-filter-interface";
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { GetUsersFiltered } from "../services/UserServices";
import NotFound from "../../../common/components/NotFound.vue";

const props = defineProps({
  Email: {
    type: String,
  },
  country: {
    type: String,
  },
});

const filters = ref<UserFilter>({
  page: 1,
  limit: 5,
  country: undefined,
  email: undefined,
});

const { data, isLoading, refetch } = useQuery({
  queryKey: ["Users", filters],
  queryFn: () => GetUsersFiltered(filters.value),
});

const Users = computed(() => data.value?.data ?? []);

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
  refetch();
});
</script>

<style scoped></style>
