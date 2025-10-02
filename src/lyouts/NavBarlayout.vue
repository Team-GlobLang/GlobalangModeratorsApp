<template>
  <div class="fixed bottom-0 left-0 z-50 w-full bg-white shadow-md border-t border-gray-200">
    <FwbButtonGroup class="flex justify-around w-full h-20">
      <FwbButton v-for="item in navItems" :key="item.routeName"
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3" :class="(item.segment
          ? selectedPathTwoSegments === item.segment
          : selectedPath === 'home')
          ? 'text-black' : 'text-white'" @click="goto(item.routeName)">
        <span v-if="item.segment ? selectedPathTwoSegments === item.segment : selectedPath === 'home'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"></span>
        <i :class="`pi ${item.icon} text-4xl transition-transform duration-500 ease-in-out ${item.segment
          ? selectedPathTwoSegments === item.segment
            ? 'rotate-6'
            : 'rotate-0'
          : selectedPath === 'home'
            ? 'rotate-6'
            : 'rotate-0'
          }`"></i>
      </FwbButton>
    </FwbButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FwbButton, FwbButtonGroup } from "flowbite-vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const selectedPath = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  return segments[0] || "";
});

const selectedPathTwoSegments = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  return segments[1] || "";
});

function goto(pathName: string) {
  router.push({ name: pathName });
}

interface BottomNavItem {
  name: string
  routeName: string
  icon: string
  segment?: string
}

const navItems: BottomNavItem[] = [
  { name: 'Users', routeName: 'Users_Registered', icon: 'pi-user', segment: 'users' },
  { name: 'Teacher/Collaborator', routeName: 'teacher-colaborator_Registered', icon: 'pi-address-book', segment: 'teacher-colaborator' },
  { name: 'Home', routeName: 'Home', icon: 'pi-th-large' },
  { name: 'Phrases', routeName: 'Phrases_Registered', icon: 'pi-headphones', segment: 'phrases' },
  { name: 'Quizzes', routeName: 'quizzes_Registered', icon: 'pi-file-check', segment: 'quizzes' }
]
</script>
