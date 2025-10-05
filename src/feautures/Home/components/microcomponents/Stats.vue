<template>
    <div class="flex flex-col items-center justify-center p-6 rounded-2xl bg-transparent shadow-sm hover:shadow-md transition-all duration-300 w-44"
        :style="{
            border: `2px solid ${props.data.color}`,

        }">
        <span class="text-lg font-bold">{{ props.data.counter }}</span>
        <span class="text-md font-semibold mt-1">{{ props.data.title }}</span>
        <span class="text-sm mt-1">{{ props.data.entity }}</span>
    </div>

</template>
<script setup lang="ts">

interface StatsCounter {
    color: string,
    title: string,
    entity: string,
    counter: number
}

const props = defineProps<{
    data: StatsCounter
}>()


</script>