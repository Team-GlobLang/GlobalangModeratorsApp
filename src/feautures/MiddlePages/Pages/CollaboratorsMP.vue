<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div
    class="flex w-full flex-col items-center justify-center gap-6 h-[80dvh] px-4"
  >
    <router-link :to="{ name: 'Request_Collaborator' }" class="w-full">
      <Options_card
        title="Request collaborators"
        description="Approve or reject incoming collaborator applications handpick top language experts in seconds."
        icon="fa-solid fa-chalkboard-user"
        color="bg-yellow-100"
      />
    </router-link>

    <router-link
      :to="{ name: 'Teacher_Collaborator_Registered' }"
      class="w-full"
    >
      <Options_card
        title="Registered collaborators"
        description="Review past applications, re-evaluate, or remove approved collaborators keep your expert team in top shape."
        icon="fa-solid fa-user-tie"
        color="bg-orange-100"
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
    label: "Collaborators",
  },
];
</script>
