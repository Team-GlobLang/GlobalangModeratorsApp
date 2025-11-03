<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div class="min-h-[80dvh] flex items-center">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link :to="{ name: 'Request_Collaborator' }">
          <Options_card
            title="Request collaborators"
            description="Approve or reject incoming collaborator applications handpick top language experts in seconds."
            icon="fa-solid fa-chalkboard-user"
            color="bg-yellow-100"
            class="h-full transition-transform hover:scale-[1.02]"
          />
        </router-link>

        <router-link :to="{ name: 'Teacher_Collaborator_Registered' }">
          <Options_card
            title="Registered collaborators"
            description="Review past applications, re-evaluate, or remove approved collaborators keep your expert team in top shape."
            icon="fa-solid fa-user-tie"
            color="bg-orange-100"
            class="h-full transition-transform hover:scale-[1.02]"
          />
        </router-link>
      </div>
    </div>
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
