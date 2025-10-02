<template>
    <div class="w-full py-8 p-2 flex items-center bg-white rounded-2xl shadow">
        <div class="flex w-full gap-2 justify-around">
            <div class=" flex items-center w-10/12 gap-2">
                <i :class="`pi ${props.cardData.icon} ${props.cardData.color} p-6 rounded-full`"
                    style="font-size: 2rem"></i>
                <span>
                    <h2 class="text-lg font-bold">{{ props.cardData.resourceType }} request</h2>
                    <p class="text-md">{{ props.cardData.message }}</p>
                </span>
            </div>
            <div class="flex items-center cursor-pointer w-1/12" @click="goto(props.cardData.redirectPath)">
                <span :class="`p-1 ${props.cardData.color} rounded-full text-sm`">{{
                    props.cardData.counter
                }}</span>
                <i class="pi pi-chevron-right rounded-full" style="font-size: 1rem"></i>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';


interface CardData {
    resourceType: string
    message: string
    counter: number
    redirectPath: string
    icon: string
    color: string
}

const props = defineProps<{
    cardData: CardData
}>()

const router = useRouter()

function goto(pathName: string) {
    router.push({ name: pathName })
}


</script>