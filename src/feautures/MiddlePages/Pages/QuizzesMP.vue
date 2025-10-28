<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div
    class="flex flex-col w-full items-center justify-center gap-6 h-[80dvh] px-4"
  >
    <router-link :to="{ name: 'Request_Quiz' }" class="w-full">
      <Options_card
        title="Pending quizzes"
        description="Review pending quizzes submitted by users. Approve or provide feedback to ensure quality and accuracy."
        icon="fa-solid fa-list"
        color="bg-blue-100"
      />
    </router-link>

    <router-link :to="{ name: 'Quizzes_Registered' }" class="w-full">
      <Options_card
        title="Registered quizzes"
        description="Access and review all user-submitted quizzes. Deactivate inappropriate or outdated content to ensure quality standards."
        icon="fa-solid fa-file-lines"
        color="bg-green-100"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import Options_card from "../components/Options_card.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Quizzes",
  },
];
</script>
