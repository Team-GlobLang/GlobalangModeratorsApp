<template>
  <Colaborator_Request_View_Card
    v-if="colaborator"
    :key="colaborator.id"
    :name="colaborator.fullName"
    :email="colaborator.email"
    :message="colaborator.aboutColaborator"
    :Languages="colaborator.languages"
    :id_item="props.id"
    :files-urls="colaborator.filesUrls"
    :onAction="handleAction"
  />

  <div
    v-if="!isLoading && colaborator.length === 0"
    class="text-center mt-10 p-10"
  >
    <NotFoundVue message="Sorry, we dont have this request avalible now" />
  </div>

  <Colab_Request_View_Modal
    :isOpen="modalState.isOpen"
    @close="modalState.isOpen = false"
    :typeAction="modalState.isAccepted"
    :idRequest="modalState.requestId"
    @completed="handleCompleted"
  />
</template>

<script setup lang="ts">
import Colaborator_Request_View_Card from "./Colaborator_Request_View_Card.vue";
import { computed, onMounted, reactive } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestById } from "../services/ColaboratorServices";
import Colab_Request_View_Modal from "./modals/Colab_Request_View_Modal.vue";
import NotFoundVue from "@NotFound";

const props = defineProps({
  id: {
    type: String,
  },
});

const { data, isLoading, refetch } = useQuery({
  queryKey: ["colaborator", props.id],
  queryFn: () => GetColaboratorRequestById(props.id || ""),
});

const colaborator = computed(() => data.value);

const modalState = reactive({
  isOpen: false,
  isAccepted: false,
  requestId: "",
});

const handleAction = ({
  id,
  isAccepted,
}: {
  id: string;
  isAccepted: boolean;
}) => {
  modalState.requestId = id;
  modalState.isAccepted = isAccepted;
  modalState.isOpen = true;
};
const handleCompleted = () => {
  refetch();
};

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
