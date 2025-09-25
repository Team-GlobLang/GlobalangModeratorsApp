<template>
  <Colaborator_Request_View_Card
    v-if="colaborator"
    :name="colaborator.userInfo.fullName"
    :email="colaborator.userInfo.email"
    :message="colaborator.Info_Extra"
    :languages="colaborator.Languages"
    :title="colaborator.Academic_Title"
    :id_item="props.id"
    @reject="HandleRejected"
    @accept="HandleAccept"
  />
</template>

<script setup lang="ts">
import Colaborator_Request_View_Card from "./Colaborator_Request_View_Card.vue";
import { computed, onMounted } from "vue";
import { Status } from "../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestChangeStatus } from "../interfaces/ColaboratorRequestChangeStatusInterface";
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestById } from "../services/ColaboratorServices";
import { UseChangeRequestStatus } from "../hooks/UseChangeRequestStatus";

const props = defineProps({
  id: {
    type: String,
  },
});

const { data, refetch } = useQuery({
  queryKey: ["colaborator", props.id],
  queryFn: () => GetColaboratorRequestById(props.id || ""),
});

const colaborator = computed(() => data.value);

const router = useRouter();

const HandleViewRequest = () => {
  router.push({
    name: "Request_colaborator",
  });
};

const mutationChangeRequest = UseChangeRequestStatus();

const HandleRejected = async (colaboratorId: string) => {
  const colaboratorRequestChangeStatus: ColaboratorRequestChangeStatus = {
    Id: colaboratorId,
    Status: Status.REJECTED,
  };
  try {
    await mutationChangeRequest.mutate(colaboratorRequestChangeStatus);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await HandleViewRequest();
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

const HandleAccept = async (colaboratorId: string) => {
  const colaboratorRequestChangeStatus: ColaboratorRequestChangeStatus = {
    Id: colaboratorId,
    Status: Status.ACCEPTED,
  };
  try {
    await mutationChangeRequest.mutate(colaboratorRequestChangeStatus);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await HandleViewRequest();
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

onMounted(() => {
  console.log(colaborator.value);
  refetch();
});
</script>

<style scoped></style>
