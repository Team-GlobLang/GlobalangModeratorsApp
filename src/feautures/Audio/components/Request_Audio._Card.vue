<template>
  <fwb-card class="w-full">
    <div class="bg-white rounded-lg p-4 flex justify-center items-center gap-4">
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
      <div class="flex flex-col gap-2">
        <span class="flex flex-col font-light text-lg">
          <h3 class="text-xl font-bold">Created by: {{ props.name }}</h3>
          <small>Phrase: {{ props.phrase }} </small>
          <small>Meaning: {{ props.meaning }} </small>
        </span>

        <btn_-group
          accept-icon="pi-cloud-upload"
          accept-text="Approve"
          reject-icon="pi-trash"
          reject-text="Reject"
          :id_item="props.id || ''"
          @accept="onAccept"
          @reject="onReject"
        />
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Btn_Group from "../../Home/components/Btn_Group.vue";
import { FwbCard } from "flowbite-vue";

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
  accept: [itemId: string];
  reject: [itemId: string];
}>();

const onAccept = (itemId: string) => {
  emit("accept", itemId);
};

const onReject = (itemId: string) => {
  emit("reject", itemId);
};
</script>

<style scoped></style>
