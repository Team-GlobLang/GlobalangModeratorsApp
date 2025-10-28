<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div
    class="flex flex-col w-full items-center justify-center gap-6 h-[80dvh] px-4"
  >
    <router-link :to="{ name: 'Request_Audio' }" class="w-full">
      <Options_card
        title="Pending phrases"
        description="Review all shorts request"
        icon="fa-solid fa-headphones"
        color="bg-pink-100"
      />
    </router-link>
    <router-link :to="{ name: 'Phrases_Registered' }" class="w-full">
      <Options_card
        title="Phrases registered"
        description="See all reviewed phrases"
        icon="fa-solid fa-book-open"
        color="bg-purple-100"
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
    label: "Phrases",
  },
];
</script>
