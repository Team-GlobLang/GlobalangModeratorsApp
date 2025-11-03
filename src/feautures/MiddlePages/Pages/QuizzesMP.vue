<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div class="min-h-[80dvh] flex items-center">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link :to="{ name: 'Request_Quiz' }">
          <Options_card
            title="Pending quizzes"
            description="Review pending quizzes submitted by users. Approve or provide feedback to ensure quality and accuracy."
            icon="fa-solid fa-list"
            color="bg-blue-100"
            class="h-full transition-transform hover:scale-[1.02]"
          />
        </router-link>

        <router-link :to="{ name: 'Quizzes_Registered' }">
          <Options_card
            title="Registered quizzes"
            description="Access and review all user-submitted quizzes. Deactivate inappropriate or outdated content to ensure quality standards."
            icon="fa-solid fa-file-lines"
            color="bg-green-100"
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
    label: "Quizzes",
  },
];
</script>
