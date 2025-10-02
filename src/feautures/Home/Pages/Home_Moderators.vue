<template>
  <div class="w-full flex justify-center items-center mt-10">
    <div class="flex flex-col md:flex-row gap-10 w-full max-w-5xl p-4 md:p-8">
      <section class="flex-1">
        <MyInfo />
      </section>
      <section class="flex flex-col gap-10">
        <div v-for="(card, index) in cards" :key="index">
          <RedirectionCard :card-data="card" />
        </div>
      </section>
      <section
        class="flex bg-white rounded-2xl shadow justify-between p-4 gap-4"
      >
        <Stats
          v-for="(item, index) in stats"
          :key="index"
          :data="item"
          class="flex-1"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyInfo from "../components/microcomponents/MyInfo.vue";
import RedirectionCard from "../components/microcomponents/RedirectionCard.vue";
import Stats from "../components/microcomponents/Stats.vue";

const cards = [
  {
    resourceType: "Quiz",
    message:
      "Review and approve quizzes submitted by teachers to make them public.",
    color: "bg-green-200",
    redirectPath: "Request_Quiz",
    icon: "pi-list",
    counter: 50,
  },
  {
    resourceType: "Shorts",
    message: "Manage request for new grades and expressions.",
    color: "bg-pink-200",
    redirectPath: "Request_audio",
    icon: "pi-microphone",
    counter: 13,
  },
  {
    resourceType: "Colladorators",
    message: "Approve new teachers and collaborators.",
    color: "bg-[#FFDADA]",
    redirectPath: "Request_colaborator",
    icon: "pi-users",
    counter: 12,
  },
];

const stats = [
  {
    title: "Active",
    entity: "Quizzes",
    counter: 199,
    color: "#A7F3D0", // verde pastel
  },
  {
    title: "Active",
    entity: "Shorts",
    counter: 87,
    color: "#FBCFE8", // rosa pastel
  },
  {
    title: "Register",
    entity: "Users",
    counter: 1200,
    color: "#BFDBFE", // azul pastel
  },
  {
    title: "Active",
    entity: "Collaborators",
    counter: 45,
    color: "#FFE5D4", // papaya pastel
  },
];
</script>

<style lang="css" scoped></style>
