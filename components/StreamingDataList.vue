<template>
    <div :class="`m-6 w-11/12 ${streamingData && streamingData.length > 0 ? 'h-[600px]' : 'h-min'} flex mx-auto overflow-hidden justify-between rounded-lg`">

        <div class="flex flex-col bg-echo-gray w-3/4 p-1 overflow-hidden">
            <p class="h-1/12 font-franklin text-2xl p-4">
                Recents streams
            </p>
            <div class="h-full overflow-y-auto whitespace-nowrap">
                <Stream v-if="streamingData && streamingData.length > 0" class="border-t border-gray-400" v-for="stream in streamingData" :stream="stream" />
                <div v-else>
                    <p class="text-center font-roboto-light text-echo-dark-gray">
                        No streams available
                    </p>
                </div>
                <!-- <Stream v-for="stream in user?.streamingData?.slice(-15)" :stream="stream" /> -->
            </div>
        </div>

        <!-- Stats -->
        <div class="p-6 bg-echo-gray border-l border-l-2 border-[#b2b1b1] w-1/4">
            <p class="font-franklin text-2xl px-4">
                Stats
            </p>
            <div class="flex p-6 flex-row justify-between font-franklin text-echo-orange text-xl text-center">
                <p class="px-4 border-2 border-echo-orange h-fit rounded-xl">
                    {{ streamingData?.length }}
                    <br />
                        streams 
                </p>
                <p class="px-4 border-2 border-echo-orange h-fit rounded-xl">
                    {{ streamingData ? new Set(streamingData.map(stream => stream.episode.show.id)).size : '-' }} 
                    <br />
                        shows 
                </p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { Stream } from '~/models/StreamingData';

    const props = defineProps<{
        streamingData: Stream[] | undefined
    }>()
</script>
