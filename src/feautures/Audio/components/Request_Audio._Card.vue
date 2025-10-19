<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="flex flex-col gap-2">
      <span class="flex flex-col">
        <small class="text-md font-bold">Created by: {{ props.name }}</small>
        <small class="text-sm font-light">Phrase: {{ props.phrase }} </small>
        <small class="text-sm font-light">Meaning: {{ props.meaning }} </small>
      </span>

      <FwbButton
        :aria-pressed="localPlaying"
        :title="localPlaying ? 'Pausar' : 'Reproducir'"
        @click="toggle"
        class=""
      >
        <p class="flex flex-row items-center justify-center gap-2 text-xs">
          <span>Reproduce audio</span>
          <i
            class="pi"
            :class="localPlaying ? 'pi-pause-circle' : 'pi-play-circle'"
            style="font-size: 1rem"
          ></i>
        </p>
      </FwbButton>

      <audio
        ref="audioRef"
        :src="fileUrl"
        preload="metadata"
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="updateTime"
        @ended="onEnded"
      ></audio>

      <Btn_Group
        accept-icon="pi-cloud-upload"
        accept-text="Approve"
        reject-icon="pi-trash"
        reject-text="Reject"
        :id_item="props.id || ''"
        @idItem="IdItem"
        @openModal="openModal"
        @isAccepted="onIsAccepted"
      />
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { FwbButton } from "flowbite-vue";
import Btn_Group from "@shared/Components/Btn_Group.vue";
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
  idItem: [itemId: string];
  openModal: [isModalOpen: boolean];
  isAccepted: [isAccepeted: boolean];
}>();

const IdItem = (itemId: string) => {
  emit("idItem", itemId);
};

const openModal = (isModalOpen: boolean) => {
  emit("openModal", isModalOpen);
};

const onIsAccepted = (isAccepted: boolean) => {
  emit("isAccepted", isAccepted);
};
</script>

<style scoped></style>
