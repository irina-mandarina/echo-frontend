<template>
    <div class="flex flex-row p-2 w-full">
        <div class="w-[15%] h-full">
            <img :src="show.images[2].url" alt="podcast cover" class="rounded" />
        </div>
        <div class="w-[85%] h-full">
            <h3 class="whitespace-nowrap px-2 font-roboto-light text-lg text-left overflow-hidden text-ellipsis">
                {{ show.name }}
            </h3>
            <p class="text-left p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                by {{ show.publisher }}
            </p>
        </div>
    </div>
    <hr />
</template>

<script setup lang="ts">
    import type { ShowSearchResult } from '~/models/Show';

    defineProps<{ 
        show: ShowSearchResult
    }>()
</script>

<style scoped>

</style>