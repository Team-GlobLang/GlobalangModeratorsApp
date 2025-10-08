<template>
  <fwb-card
    class="w-full rounded-lg p-4 bg-[#f6f6f6] shadow-gray-300 shadow-md"
  >
    <div class="flex flex-col gap-2">
      <span class="flex flex-col font-light text-sm">
        <small class="text-md font-bold">{{ props.phrase }}</small>
        <small>Meaning: {{ props.meaning }} </small>
        <small>Created by: {{ props.name }} </small>
        <small>Approve by: {{ props.name }} </small>
      </span>

      <div class="w-full flex text-sm gap-4">
        <fwb-button
          :aria-pressed="localPlaying"
          :title="localPlaying ? 'Pausar' : 'Reproducir'"
          @click="toggle"
          class="w-1/2"
        >
          <p class="flex flex-row items-center justify-center gap-2 text-md">
            <span>Reproduce audio</span>
            <i
              class="pi"
              :class="localPlaying ? 'pi-pause-circle' : 'pi-play-circle'"
              style="font-size: 1rem"
            ></i>
          </p>
        </fwb-button>

        <fwb-button
          class="w-1/2 border border-[#FF0000] rounded-md p-2 text-[#FF0000] bg-white"
          @click="handleAction"
        >
          <p class="flex items-center justify-center gap-2">
            <i class="pi pi-trash text-[#FF0000]"></i>
            <small>Delete</small>
          </p>
        </fwb-button>
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
  </fwb-card>
</template>

<script setup lang="ts">
//import { FwbCard } from "flowbite-vue";
import { FwbButton } from "flowbite-vue";
import { ref, watchEffect } from "vue";
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
    required: true,
  },
  fileUrl: {
    type: String,
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

const emit = defineEmits<{
  idItem: [itemId: string];
  openModal: [isModalOpen: boolean];
}>();

const handleAction = () => {
  emit("openModal", true);
  emit("idItem", props.itemId);
};
</script>

<style scoped></style>
