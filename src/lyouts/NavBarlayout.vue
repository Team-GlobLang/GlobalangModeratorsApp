<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full bg-white shadow-md border-t border-gray-200"
  >
    <FwbButtonGroup class="flex justify-around w-full h-14">
      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="
          selectedPathTwoSegments === 'users' ? 'text-black' : 'text-white'
        "
        @click="goto('Users_Registered')"
      >
        <RouterLink to="/registered/users">
          <span
            v-if="selectedPathTwoSegments === 'users'"
            class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
          ></span>
          <i
            class="pi pi-user text-2xl transition-transform duration-500 ease-in-out"
            :class="
              selectedPathTwoSegments === 'users' ? ' rotate-6' : 'rotate-0'
            "
          ></i>
        </RouterLink>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="
          selectedPathTwoSegments === 'teacher-colaborator'
            ? 'text-black'
            : 'text-white'
        "
        @click="goto('teacher-colaborator_Registered')"
      >
        <span
          v-if="selectedPathTwoSegments === 'teacher-colaborator'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          class="pi pi-address-book text-2xl transition-transform duration-500 ease-in-out"
          :class="
            selectedPathTwoSegments === 'teacher-colaborator'
              ? ' rotate-6'
              : 'rotate-0'
          "
        ></i>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="selectedPath === 'home' ? 'text-black' : 'text-white'"
        @click="goto('Home')"
      >
        <span
          v-if="selectedPath === 'home'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          class="pi pi-th-large text-2xl transition-transform duration-500 ease-in-out"
          :class="selectedPath === 'home' ? ' rotate-6' : 'rotate-0'"
        ></i>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="
          selectedPathTwoSegments === 'phrases' ? 'text-black' : 'text-white'
        "
        @click="goto('Phrases_Registered')"
      >
        <span
          v-if="selectedPathTwoSegments === 'phrases'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          class="pi pi-headphones text-2xl transition-transform duration-500 ease-in-out"
          :class="
            selectedPathTwoSegments === 'phrases' ? ' rotate-6' : 'rotate-0'
          "
        ></i>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="
          selectedPathTwoSegments === 'quizzes' ? 'text-black' : 'text-white'
        "
        @click="goto('quizzes_Registered')"
      >
        <span
          v-if="selectedPathTwoSegments === 'quizzes'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          class="pi pi-user text-2xl transition-transform duration-500 ease-in-out"
          :class="
            selectedPathTwoSegments === 'quizzes' ? ' rotate-6' : 'rotate-0'
          "
        ></i>
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
</script>
