<template>
  <div
    class="w-full relative rounded-lg p-4 bg-white shadow-gray-300 shadow-md"
  >
    <div class="flex flex-col gap-2">
      <span
        class="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full uppercase"
        :class="badgeClass"
      >
        {{ props.status ? "Accepted" : "Rejected" }}
      </span>
      <span class="flex flex-col font-light text-sm">
        <small class="text-lg font-bold">{{ props.phrase }}</small>
        <small class="text-base font-light">From: {{ props.country }} </small>
        <small class="text-base font-light"
          >Meaning: {{ props.meaning }}
        </small>
        <small class="text-base font-light"
          >Created by: {{ props.name }}
        </small>
        <small class="text-base font-light"
          >Approve by: {{ props.name }}
        </small>
      </span>

      <div class="w-full flex gap-4 justify-between">
        <FwbButton
          color="red"
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
            <span>Play</span>
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
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";

import { computed, ref, watchEffect, type PropType } from "vue";
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

const badgeClass = computed(() => {
  switch (props.status) {
    case true:
      return "bg-green-100 text-green-700 border border-green-300";
    case false:
      return "bg-red-100 text-red-700 border border-red-300";
    case undefined:
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
});
</script>

<style scoped></style>
