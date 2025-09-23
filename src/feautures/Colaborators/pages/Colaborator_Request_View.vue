<template>
  <Lyout>
    <section
      class="flex flex-col gap-6 justify-center items-center bg-[#F6F6F6] p-4 rounded-lg text-sm"
    >
      <Colaborator_Request_View_Card
        v-if="colaborator && colaborator.length > 0"
        :name="colaborator.userInfo.fullName"
        :email="colaborator.userInfo.email"
        :message="colaborator.Info_Extra"
        :-languages="colaborator.Languages"
        :title="colaborator.Academic_Title"
        :id_item="props.id"
        @reject="HandleRejected"
        @accept="HandleAccept"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import Lyout from "../../../lyouts/Lyout.vue";
import Colaborator_Request_View_Card from "../components/Colaborator_Request_View_Card.vue";
import { Status } from "../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestChangeStatus } from "../interfaces/ColaboratorRequestChangeStatusInterface";
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { GetColaboratorRequestById } from "../services/ColaboratorServices";
import { UseChangeRequestStatus } from "../hooks/UseChangeRequest";
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
    name: "Request_colaborator_Moderator",
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
  console.log(props.id);
  refetch();
});
</script>

<style scoped></style>
