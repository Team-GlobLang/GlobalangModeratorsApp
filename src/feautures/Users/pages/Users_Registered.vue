<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] w-full pb-3" :class="stickyTopPading">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>

      <div class="w-11/12 mx-auto flex flex-col gap-3">
       <div ref="countryBoxRef" class ="relative w-full">
         <FwbInput
          v-model="country"
          type="text"
          :validation-status="countryError ? 'error' : undefined"
          label="Country"
          placeholder="Ej: Costa Rica"
           @focus="showList = true"
           @input="showList = true"
           @keydown.esc="showList = false"
        >
          <template #suffix>
            <span class="pi pi-home"></span>
          </template>
          <template #validationMessage>
            <span class="font-medium">{{ countryError }}</span>
          </template>
        </FwbInput>
        <ul
            v-if="showList && filteredCountries.length"
            class="absolute top-full left-0 right-0 z-50 w-full bg-white shadow-md border rounded-md mt-1 max-h-48 overflow-y-auto"
          >
            <li
              v-for="c in filteredCountries"
              :key="c.code"
              class="px-3 py-2 cursor-pointer hover:bg-amber-100"
              @mousedown.prevent="selectCountry(c.name)"
            >
              {{ c.name }}
            </li>
          </ul>
       </div>
        <FwbInput
          v-model="email"
          type="email"
          :validation-status="emailError ? 'error' : undefined"
          @blur="emailBlur"
          label="Email"
          placeholder="example@email.com"
        />
      </div>
    </div>
    <section class="w-full flex justify-center">
      <User_Registered_Card_Container :country="country" :email="email" />

      <RegisterModeradorMForm v-model:visible="visible" />
    </section>
    <FwbButton
      @click="visible = true"
      color="green"
      pill
      class="fixed bottom-18 left-2 w-12 h-12 shadow-lg flex items-center justify-center transition text-xl"
    >
      <i class="pi pi-user-plus"></i>
    </FwbButton>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbInput } from "flowbite-vue";
import User_Registered_Card_Container from "../components/User_Registered_Card_Container.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import RegisterModeradorMForm from "../../Auth/Components/Modals/RegisterModeradorMForm.vue";
import { useField } from "vee-validate";
import { Capacitor } from "@capacitor/core";
import { countries } from "@core/CountriesArray";
const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Registers",
  },
  {
    label: "Users",
  },
];

const showList = ref(false);

const filteredCountries = computed(() => {
  const search = country.value?.toLowerCase() ?? "";
  const list = search
    ? countries.filter((c) => c.name.toLowerCase().includes(search))
    : countries;

  return list;
});

function selectCountry(name:string) {
  country.value = name;
  showList.value = false;
}


const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

const {
  value: email,
  errorMessage: emailError,
  handleBlur: emailBlur,
} = useField<string>("email");

const visible = ref<boolean>(false);

watch(country, (val) => {
  if (!val?.trim()) showList.value = false;
});

const countryBoxRef = ref<HTMLElement | null>(null);
function handlePointerDown(e: PointerEvent) {
  const root = countryBoxRef.value;
  if (!root) return;
  if (!root.contains(e.target as Node)) showList.value = false;
}
onMounted(() => {
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", handlePointerDown);
});

</script>
