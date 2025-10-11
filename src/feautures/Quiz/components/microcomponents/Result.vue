<template>
  <div
    class="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto mt-10 text-center"
  >
    <!-- <img src="/Results.png" alt="Result Image" class="mx-auto mb-4 w-24 h-24" /> -->
    <h2 class="text-2xl font-bold mb-2">Quiz Completed!</h2>
    <p class="mb-4 text-gray-700">{{ resultMessage }}</p>

    <div class="mb-6 space-y-2 text-gray-800">
      <p><strong>Total Questions:</strong> {{ totalQuestions }}</p>
      <p><strong>Correct Answers:</strong> {{ correctAnswers }}</p>
      <p><strong>Score:</strong> {{ scorePercentage }}%</p>
    </div>

    <Review_Quiz_Modal
      :isOpen="isOpenModal"
      @close="isOpenModal = false"
      :typeAction="isAccepeted"
      :idRequest="item"
    />

    <Btn_Group_Without_Icon
      accept-text="Approve"
      reject-text="Reject"
      color-accept="bg-[#009951]"
      color-reject="border-[#FF0000]"
      :id_item="props.quizId"
      textColorApprove="white"
      textColorReject="black"
      @idItem="handleItemId"
      @openModal="handleIsOpenModal"
      @isAccepted="handleIsAccepted"
    />

    <div class="mt-4">
      <FwbButton
        @click="showReview = !showReview"
        color="alternative"
        class="w-full"
      >
        {{ showReview ? "Hide Review" : "Show Review" }}
      </FwbButton>

      <div v-if="showReview">
        <div
          v-for="(q, index) in questions"
          :key="q.id"
          class="mb-4 p-4 bg-gray-50 rounded-lg shadow"
        >
          <h3 class="font-semibold">{{ index + 1 }}. {{ q.questionText }}</h3>
          <ul class="list-disc list-inside mt-1">
            <li
              v-for="opt in q.options"
              :key="opt.id"
              :class="{
                'text-green-700 font-semibold': opt.isCorrect,
                'text-red-600 line-through':
                  userAnswers[index]?.id === opt.id && !opt.isCorrect,
              }"
            >
              {{ opt.text }}
            </li>
          </ul>
          <p v-if="q.explanation" class="mt-1 text-gray-600 italic">
            Explanation: {{ q.explanation }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type {
  QuizOption,
  QuizQuestion,
} from "../../interfaces/QuestionQuizType";
import { FwbButton } from "flowbite-vue";
import Btn_Group_Without_Icon from "../../../Home/components/Btn_Group_Without_Icon.vue";
import Review_Quiz_Modal from "../modals/Review_Quiz_Modal.vue";

interface Props {
  questions: QuizQuestion[];
  userAnswers: (QuizOption | null)[];
  quizId: string;
}

const props = defineProps<Props>();

const showReview = ref(false);

const totalQuestions = computed(() => props.questions.length);
const correctAnswers = computed(
  () => props.userAnswers.filter((a) => a?.isCorrect).length
);
const scorePercentage = computed(() =>
  Math.round((correctAnswers.value / totalQuestions.value) * 100)
);

const resultMessage = computed(() => {
  if (scorePercentage.value === 100) return "🎉 Excellent! Perfect score!";
  if (scorePercentage.value >= 70) return "👍 Good job! Keep it up!";
  if (scorePercentage.value >= 40) return "🙂 Not bad, try again!";
  return "😕 Better luck next time!";
});

const item = ref("");
const handleItemId = (idItem: string) => {
  item.value = idItem;
};

const isOpenModal = ref(false);
const handleIsOpenModal = (isOpen: boolean) => {
  isOpenModal.value = isOpen;
};

const isAccepeted = ref(false);
const handleIsAccepted = (status: boolean) => {
  isAccepeted.value = status;
};
</script>

<style scoped></style>
