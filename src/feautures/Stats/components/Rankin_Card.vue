<template>
  <fwb-card class="w-full">
    <div
      class="p-4 flex items-center gap-10 bg-[#f6f6f6] shadow-gray-300 shadow-md rounded-lg"
    >
      <small
        :class="{
          first_place: props.position === 1,
          second_place: props.position === 2,
          thirth_place: props.position === 3,
        }"
        class="text-xl p-2 px-4 rounded-lg"
        >{{ props.position }}</small
      >
      <p>
        <small class="font-bold text-lg">{{ props.fullName }}</small>
        <span class="flex flex-col font-light text-md gap-0.5">
          <small>Quizzes completed: {{ props.quizzesCompleted }}</small>
        </span>
      </p>
      <div class="flex flex-col">
        <span class="text-lg font-bold">Score</span>
        <span class="text-md font-light text-green-800">
          {{ props.totalPoints }}</span
        >
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
//import { FwbCard } from "flowbite-vue"; //fbw_CARD tiene resrecciones con el w-full
const props = defineProps({
  fullName: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  quizzesCompleted: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.first_place {
  background: #ffbf00;
  background: linear-gradient(
    156deg,
    rgba(255, 191, 0, 1) 0%,
    rgba(245, 247, 116, 1) 100%
  );
}

.second_place {
  background: #ababab;
  background: linear-gradient(
    156deg,
    rgba(171, 171, 171, 1) 0%,
    rgba(227, 228, 229, 1) 100%
  );
}

.thirth_place {
  background: #fa7a3e;
  background: linear-gradient(
    156deg,
    rgba(250, 122, 62, 1) 0%,
    rgba(191, 137, 112, 1) 100%
  );
}
</style>
