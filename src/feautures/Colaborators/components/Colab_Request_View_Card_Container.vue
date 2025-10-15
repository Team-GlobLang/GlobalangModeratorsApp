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
    @idItem="handleItemId"
    @openModal="handleIsOpenModal"
    @isAccepted="handleIsAccepted"
  />

  <div
    v-if="!isLoading && colaborator.length === 0"
    class="text-center mt-10 p-10 bg-white"
  >
    <NotFoundVue message="Sorry, we dont have this request avalible now" />
  </div>

  <Colab_Request_View_Modal
    :isOpen="isOpenModal"
    @close="isOpenModal = false"
    :typeAction="isAccepeted"
    :idRequest="item"
    @completed="handleCompleted"
  />
</template>

<script setup lang="ts">
import Colaborator_Request_View_Card from "./Colaborator_Request_View_Card.vue";
import { computed, onMounted, ref } from "vue";
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

const item = ref("");
const handleItemId = (idItem: string) => {
  item.value = idItem;
};

const isOpenModal = ref(false);
const handleIsOpenModal = (isOpen: boolean) => {
  isOpenModal.value = isOpen;
};

const isAccepeted = ref(false);
const handleIsAccepted = (status: boolean) => {
  isAccepeted.value = status;
};

const handleCompleted = () => {
  refetch();
};

onMounted(() => {
  refetch();
});
</script>

<style scoped></style>
