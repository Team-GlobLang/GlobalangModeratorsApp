<template>
  <fwb-card class="w-full items-center">
    <div class="bg-white rounded-lg p-4 flex justify-center gap-6">
      <div>
        <div class="flex items-center justify-center">
          <button
            class="rounded-full w-20 h-20 flex items-center justify-center shadow transition active:scale-95 bg-blue-500 hover:bg-blue-600 text-white"
            :aria-pressed="localPlaying"
            :title="localPlaying ? 'Pausar' : 'Reproducir'"
            @click="toggle"
          >
            <i
              class="pi text-3xl"
              :class="localPlaying ? 'pi-pause' : 'pi-play'"
            ></i>
          </button>
        </div>
      </div>

      <audio
        ref="audioRef"
        :src="fileUrl"
        preload="metadata"
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="updateTime"
        @ended="onEnded"
      ></audio>
      <div>
        <h2 class="text-2xl font-bold">{{ props.phrase }}</h2>
        <span class="flex flex-col font-light text-lg">
          <small>Meaning: {{ props.meaning }} </small>
          <small>Created by: {{ props.name }} </small>
          <small>Approve by: {{ props.name }} </small>
        </span>

        <fwb-button
          class="w-full flex flex-row items-center justify-center gap-2 p border border-[#FF0000] rounded-md p-2 text-lg"
          @click="handleDelete"
        >
          <i class="pi pi-trash text-[#FF0000]"></i>
          <small>Delete</small>
        </fwb-button>
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";
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
  id: {
    type: String,
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

const emit = defineEmits<{
  delete: [itemId: string];
}>();

const handleDelete = () => {
  emit("delete", props.id || "");
};
</script>

<style scoped></style>
