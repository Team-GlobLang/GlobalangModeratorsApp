<template>
  <fwb-modal v-if="props.isOpen" @close="closeModal">
    <template #header> </template>
    <template #body>
      <div class="w-full flex flex-col items-center gap-2">
        <img
          src="../../../../assets/Warning.png"
          alt="WarningImage"
          class="rounded-full w-1/2"
        />
        <span class="text-xl">Are you sure to change your password?</span>
        <span class="text-sm font-bold"
          >this action gonna log out yours sessions</span
        >
      </div>
      <fwb-input
        v-model="newpassword"
        label="writte your new password"
        placeholder="Success input"
        required
        validation-status="success"
      >
        <template #validationMessage>
          <span class="font-medium">Well done!</span> Some success message.
        </template>
      </fwb-input>
      <hr class="mt-4 border-0" />
      <fwb-input
        v-model="newpassword"
        label="writte your new password"
        placeholder="Error input"
        required
        validation-status="error"
      >
        <template #validationMessage>
          <span class="font-medium">Oh, snapp!</span> Some error message.
        </template>
      </fwb-input>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
          Cancel
        </fwb-button>
        <fwb-button @click="handleAction" color="green"> Accept </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { FwbButton, FwbModal } from "flowbite-vue";
import { ref } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const newpassword = ref("");

const emit = defineEmits<{
  close: [];
}>();

const handleAction = () => {
  emit("close");
};

const closeModal = () => {
  emit("close");
};
</script>
