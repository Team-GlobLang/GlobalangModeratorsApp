<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full bg-white shadow-md border-t border-gray-200"
  >
    <FwbButtonGroup class="flex justify-around w-full h-14">
      <FwbButton
        v-for="item in navItems"
        :key="item.routeName"
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="selectedSegment === item.segment ? 'text-black' : 'text-white'"
        @click="goto(item.routeName)"
      >
        <span
          v-if="selectedSegment === item.segment"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          :class="`${
            item.icon
          } text-2xl! transition-transform duration-500 ease-in-out ${
            selectedSegment === item.segment ? 'rotate-6' : 'rotate-0'
          }`"
        ></i>
      </FwbButton>
    </FwbButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FwbButton, FwbButtonGroup } from "flowbite-vue";
import { useRoute, useRouter } from "vue-router";
import "@fortawesome/fontawesome-free/css/all.min.css";

const router = useRouter();
const route = useRoute();

const selectedSegment = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  return segments[0] || "home";
});

function goto(routeName: string) {
  router.push({ name: routeName });
}

interface BottomNavItem {
  name: string;
  routeName: string;
  icon: string;
  segment: string;
}

const navItems: BottomNavItem[] = [
  {
    name: "Users",
    routeName: "Users",
    icon: "fa-solid fa-user-group",
    segment: "users",
  },
  {
    name: "Collaborators",
    routeName: "Collaborators",
    icon: "fa-solid fa-chalkboard-user",
    segment: "collaborators",
  },
  { name: "Home", routeName: "Home", icon: "pi pi-th-large", segment: "home" },
  {
    name: "Phrases",
    routeName: "Shorts",
    icon: "fa-solid fa-headphones",
    segment: "shorts",
  },
  {
    name: "Quizzes",
    routeName: "Quizzes",
    icon: "fa-solid fa-file-lines",
    segment: "quizzes",
  },
];
</script>
