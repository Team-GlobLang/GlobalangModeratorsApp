<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="flex flex-col gap-2">
      <span class="flex flex-col">
        <small class="text-lg font-bold">Created by: {{ props.name }}</small>
        <small class="text-base font-light">From: {{ props.country }} </small>
        <small class="text-base font-light">Phrase: {{ props.phrase }} </small>
        <small class="text-base font-light"
          >Meaning: {{ props.meaning }}
        </small>
      </span>

      <div class="flex justify-between gap-2">
        <FwbButton
          @click="handleAction(false)"
          color="red"
          outline
          ><i class="pi pi-trash"></i> <span class="text-black">Reject</span>
        </FwbButton>
        <FwbButton @click="handleAction(true)" color="green"
          ><i class="pi pi-cloud-upload"></i> <span>Approve</span>
        </FwbButton>
        <FwbButton
          :aria-pressed="localPlaying"
          :title="localPlaying ? 'Pausar' : 'Reproducir'"
          @click="toggle"
        >
          <i
            class="pi"
            :class="localPlaying ? 'pi-pause-circle' : 'pi-play-circle'"
            style="font-size: 1rem"
          ></i>
          <span>Play</span>
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
import { ref, watchEffect, type PropType } from "vue";
import { FwbCard, FwbButton } from "flowbite-vue";

const props = defineProps({
  name: {
    type: String,
    requiered: true,
  },
  phrase: {
    type: String,
    requiered: true,
  },
  meaning: {
    type: String,
    requiered: true,
  },
  id: {
    type: String,
    requiered: true,
  },
  fileUrl: {
    type: String,
    requiered: true,
  },
  country: {
    type: String,
    requiered: true,
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
  favorite.value = favs.includes(props.id);
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
    id: props.id!,
    isAccepted,
  });
};
</script>

<style scoped></style>
