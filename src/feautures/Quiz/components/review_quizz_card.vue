<template>
  <section class="flex flex-col gap-2">
    <span>Question {{ props.numberQuestion }}</span>
    <fwb-card class="w-full p-2">
      <div class="flex flex-col text-black p-8 items-center gap-4">
        <p class="text-2xl text-center">
          {{ props.question }}
        </p>
        <i class="pi pi-headphones" style="font-size: 4rem"></i>
        <fwb-button class="m-2 border rounded-xl">
          <div class="flex gap-2 items-center">
            <i class="pi pi-play"></i>
            <span>Play audio</span>
          </div>
        </fwb-button>
      </div>
    </fwb-card>
    <div class="w-full flex flex-col gap-4 pt-2">
      <fwb-radio
        class="border p-1.5 rounded-lg"
        v-model="picked"
        label="Sufrio un contratiempo"
        value="one"
      />

      <fwb-radio
        class="border p-1.5 rounded-lg"
        v-model="picked"
        label="Sufrio un contratiempo"
        value="one"
      />

      <Btn_Group
        accept-icon="pi"
        reject-icon="pi-arrow-left"
        acceptText="Finish"
        reject-text="Previous"
        id_item=""
        @accept="handleAccept"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Btn_Group from "@shared/Components/Btn_Group.vue";
import { FwbCard } from "flowbite-vue";
import { FwbButton } from "flowbite-vue";
import { FwbRadio } from "flowbite-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  question: {
    type: String,
  },
  numberQuestion: {
    type: Number,
  },
});

const picked = ref("one");

const router = useRouter();

const handleAccept = () => {
  router.push({ name: "review_quiz_result" });
};
</script>

<style scoped></style>
