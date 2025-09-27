<template>
  <fwb-card class="p-3">
    <div class="flex flex-col gap-4">
      <h2 class="text-lg">Statistics</h2>
      <section class="flex gap-3 w-full">
        <Stats title="Active quizzes" :quantity="1983" color="bg-[#CDFFE8]" />
        <Stats title="Active phrases" :quantity="16" color="bg-[#D0D6FF]" />
        <Stats title="Registered users" :quantity="202" color="bg-[#FFD5FE]" />
        <Stats
          title="Active colaborators"
          :quantity="39"
          color="bg-[#FFDADA]"
        />
      </section>
    </div>
  </fwb-card>
</template>

<script setup>
import { FwbCard } from "flowbite-vue";
import Stats from "./Stats.vue";
</script>
