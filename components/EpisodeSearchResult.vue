<template>
    <div class="flex flex-row p-2 w-full">
        <div class="w-[15%] h-full">
            <img :src="episode.images[2].url" alt="podcast cover" class="rounded" />
        </div>
        <div class="w-[85%] h-full">
            <span class="flex flex-row justify-between w-full">
                <h3 class="whitespace-nowrap px-2 font-roboto-light text-lg text-left w-4/5 overflow-hidden text-ellipsis">
                    {{ episode.name }}
                </h3>
                <p class="text-xs w-1/5">
                    {{ episode.release_date }}
                </p>
            </span>
            <p class="text-left px-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {{ episode.show }}
            </p>
        </div>
    </div>
    <hr />
</template>

<script setup lang="ts">
    import type { EpisodeSearchResult } from '~/models/Episode'

    defineProps<{ episode: EpisodeSearchResult }>()
</script>

<style scoped>

</style>