<template>
  <FwbCard class="p-2">
    <div
      @click="goto(props.routeName)"
      class="w-full rounded-lg p-4 bg-[#f6f6f6] shadow-gray-300 shadow-md flex items-center justify-between gap-10"
    >
      <div class="flex flex-col gap-2 text-xl items-center">
        <i :class="`pi ${props.icon}`"></i>
        <small class="font-bold">{{ props.title }}</small>
      </div>
      <p class="text-lg text-start">{{ props.description }}</p>
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

// import { FwbCard } from "flowbite-vue";

const props = defineProps({
  title: {
    type: String,
    
  },
  icon: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  routeName: {
    type: String,
    
  },
});

const router = useRouter();

function goto(pathName: string) {
  router.push({ name: pathName });
}
</script>

<style scoped></style>
