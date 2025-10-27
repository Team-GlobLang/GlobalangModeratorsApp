<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="flex flex-col gap-2">
      <span class="flex flex-col font-light text-sm">
        <small class="text-lg font-bold">{{ props.phrase }}</small>
        <small class="text-base font-light">From: {{ props.country }} </small>
        <small class="text-base font-light">Meaning: {{ props.meaning }} </small>
        <small class="text-base font-light">Created by: {{ props.name }} </small>
        <small class="text-base font-light">Approve by: {{ props.name }} </small>
      </span>

      <div class="w-full flex gap-4 justify-around">
        <FwbButton color="red"
        outline
          v-if="props.status"
          @click="handleAction(false)"
        >
          <p class="flex items-center justify-center gap-2">
            <i class="pi pi-trash text-[#FF0000]"></i>
            <span class="text-black">Retire</span>
          </p>
        </FwbButton>

        <FwbButton
          :aria-pressed="localPlaying"
          :title="localPlaying ? 'Pausar' : 'Reproducir'"
          @click="toggle"
        >
          <p class="flex flex-row items-center justify-center gap-2">
            <span>Play audio</span>
            <i
              class="pi"
              :class="localPlaying ? 'pi-pause-circle' : 'pi-play-circle'"
              style="font-size: 1rem"
            ></i>
          </p>
        </FwbButton>
      </div>

      <audio
        ref="audioRef"
        :src="fileUrl"
        preload="metadata"
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="updateTime"
        @ended="onEnded"
      ></audio>
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";
import { FwbButton } from "flowbite-vue";

import { ref, watchEffect, type PropType } from "vue";
const props = defineProps({
  name: {
    type: String,
  },
  phrase: {
    type: String,
  },
  meaning: {
    type: String,
  },
  admin: {
    type: String,
  },
  itemId: {
    type: String,
    
  },
  fileUrl: {
    type: String,
  },
  status: {
    type: Boolean,
    
  },
  country: {
    type: String,
    
  },
  onAction: {
    type: Function as PropType<
      (payload: { id: string; isAccepted: boolean }) => void
    >,
    required: false,
  },
});

const audioRef = ref<HTMLAudioElement | null>(null);
const localPlaying = ref(false);
const favorite = ref(false);
const currentTime = ref(0);
const duration = ref(0);

watchEffect(() => {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  favorite.value = favs.includes(props.itemId);
});

function toggle() {
  if (!audioRef.value) return;
  if (localPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play();
  }
  localPlaying.value = !localPlaying.value;
}

function updateTime() {
  if (audioRef.value) {
    currentTime.value = Math.floor(audioRef.value.currentTime);
  }
}

function onEnded() {
  localPlaying.value = false;
}

function onLoadedMetadata() {
  if (audioRef.value) {
    duration.value = Math.floor(audioRef.value.duration);
  }
}

const handleAction = (isAccepted: boolean) => {
  props.onAction?.({
    id: props.itemId!,
    isAccepted,
  });
};
</script>

<style scoped></style>
