<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div class="min-h-[80dvh] flex items-center">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link :to="{ name: 'Request_Audio' }">
          <Options_card
            title="Pending phrases"
            description="Review pending audio submissions from users. Approve or reject them to ensure quality and accuracy."
            icon="fa-solid fa-headphones"
            color="bg-pink-100"
            class="h-full transition-transform hover:scale-[1.02]"
          />
        </router-link>
        <router-link :to="{ name: 'Phrases_Registered' }">
          <Options_card
            title="Phrases registered"
            description="Access and replay validated user recordings to monitor mastery of colloquialisms and pronunciation excellence."
            icon="fa-solid fa-book-open"
            color="bg-purple-100"
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
    label: "Phrases",
  },
];
</script>
