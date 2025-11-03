<template>
  <div class="p-4">
    <template v-if="isPending">
      <div v-for="i in 5" :key="i" class="h-[16dvh] my-4 rounded-2xl shadow-2xl bg-gray-300 animate-pulse" />
    </template>

    <template v-else>
      <MyInfo />
      
      <RedirectionCard
        v-for="(card, index) in cards"
        :key="index"
        :is-pending="isPending"
        :card-data="card"
        class="my-4 first:mt-0"
      />

      <div class="flex gap-4 flex-wrap bg-white rounded-2xl shadow p-4">
        <Stats class="flex-1" v-for="(item, index) in stats" :key="index" :data="item" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import MyInfo from "../components/microcomponents/MyInfo.vue";
import RedirectionCard from "../components/microcomponents/RedirectionCard.vue";
import Stats from "../components/microcomponents/Stats.vue";
import { getCounters } from "../Service/Service";
import type { CountersResponse } from "../CounterInterface";
import { computed } from "vue";

const { data, isPending } = useQuery<CountersResponse>({
  queryKey: ["Counters"],
  queryFn: () => getCounters(),
});

const cards = computed(() => [
  {
    resourceType: "Quiz",
    message:
      "Review and approve quizzes submitted by teachers to make them public.",
    color: "bg-green-200",
    redirectPath: "Request_Quiz",
    icon: "pi-list",
    counter: data.value?.quizzes.pending ?? 0,
  },
  {
    resourceType: "Shorts",
    message: "Manage request for new grades and expressions.",
    color: "bg-pink-200",
    redirectPath: "Request_Audio",
    icon: "pi-microphone",
    counter: data.value?.shorts.pending ?? 0,
  },
  {
    resourceType: "Collaborators",
    message: "Approve new teachers and collaborators.",
    color: "bg-[#FFDADA]",
    redirectPath: "Request_Collaborator",
    icon: "pi-users",
    counter: data.value?.colabs.pending ?? 0,
  },
]);

const stats = computed(() => [
  {
    title: "Active",
    entity: "Quizzes",
    counter: data.value?.quizzes.active ?? 0,
    color: "#A7F3D0",
  },
  {
    title: "Active",
    entity: "Shorts",
    counter: data.value?.shorts.active ?? 0,
    color: "#FBCFE8",
  },
  {
    title: "Registered",
    entity: "Users",
    counter: data.value?.users.register ?? 0,
    color: "#BFDBFE",
  },
]);
</script>

<style lang="css" scoped></style>
