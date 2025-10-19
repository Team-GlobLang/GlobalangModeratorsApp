<template>
  <section class="flex flex-col gap-4 w-11/12">
    <div class="flex flex-col items-center" v-if="userRank">
      <span class="text-lg font-bold">current ranking position</span>
    </div>
    <Rankin_Card
      v-if="userRank"
      :fullName="userRank.fullName"
      :position="userRank.position"
      :totalPoints="userRank.totalPoints"
      :quizzesCompleted="userRank.totalRecords"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Rankin_Card from "./Rankin_Card.vue";
import type { StatsFilterDto } from "../interfaces/filter-stats.interface";
import { useQuery } from "@tanstack/vue-query";
import { GetRankinUser } from "../services/StatsServices";
const props = defineProps({
  country: {
    type: String,
  },
});

const filter = ref<StatsFilterDto>({
  country: undefined,
});

const { data, refetch } = useQuery({
  queryKey: ["Global_User_Rank", filter],
  queryFn: () => GetRankinUser(filter.value),
});

const userRank = computed(() => {
  return data.value?.data || null;
});

watch(
  () => props.country,
  (newCountry) => {
    filter.value.country = newCountry;
    refetch();
  }
);
</script>

<style scoped></style>
