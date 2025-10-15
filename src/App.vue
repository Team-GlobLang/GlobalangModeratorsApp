<script setup lang="ts">
import { Capacitor } from "@capacitor/core";
import NavBarlayout from "@layouts/NavBarlayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Toaster } from "vue3-hot-toast";
const route = useRoute();
const showBottomBar = computed(() => route.meta.showBottomBar !== false);
const isNative = Capacitor.isNativePlatform();

const containerPadingop = computed(() => (isNative ? "pt-[5dvh]" : "pt-0"));
</script>

<template>
  <Toaster
    :toast-options="{
      style: {
        marginTop: isNative ? '5dvh' : '',
      },
    }"
  />
  <div v-if="isNative" class="bg-[#193cb8] w-full h-[5dvh] fixed z-50"></div>
  <router-view v-slot="{ Component }">
    <Transition>
      <div :class="[{ 'pb-14': showBottomBar }, containerPadingop]">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
  <NavBarlayout v-if="showBottomBar" />
</template>

<style lang="css">
.page-enter-active,
.page-leave-active {
  transition: transform 0.6s ease, opacity 0.6s ease;
  transform-origin: top left;
}

.page-enter-from {
  transform: rotateY(-45deg) rotateX(5deg);
  opacity: 0;
}

.page-leave-to {
  transform: rotateY(45deg) rotateX(-5deg);
  opacity: 0;
}
</style>
