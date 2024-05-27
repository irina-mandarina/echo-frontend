<template>
    <div class="layout-container">
        <NuxtLayout>
            <!-- Profile picture and BG -->
            <div class="absolute bg-echo-gray w-full h-1/3 -z-[101]">
                <div class="absolute bg-echo-gray w-full h-1/2 -top-1/2 -z-[101]"></div>
                <div class="rounded-full w-32 h-32 bg-echo-orange absolute -bottom-24 left-6">
                </div>
            </div>
            <div class="w-full h-1/3 relative opacity-0"></div>


            <div class="flex flex-row justify-items-start"> 

                <!-- <div class="w-40 relative opacity-0"> &nbsp; </div> -->

                <div class="ml-40 p-4 w-1/2">
                    <div class="flex flex-row justify-between">
                        <p class="font-franklin text-3xl">
                            @{{ user?.username }}
                        </p>
                        <div class="flex flex-row">
                            <p class="font-franklin text-2xl px-4">
                                42 followers
                            </p>
                            <p class="font-franklin text-2xl px-4">
                                42 following
                            </p>
                        </div>
                    </div>
                    <p class="font-roboto-light p-2">
                        {{ user?.bio }}
                    </p>
                </div>

                <div class="flex flex-row justify-evenly w-1/3 font-franklin text-echo-orange text-2xl text-center p-6">
                    <p class="px-4 bg-echo-gray h-fit rounded-xl">
                        {{ user?.streamingData?.length }}
                        <br />
                         streams 
                    </p>
                    <p class="px-4 bg-echo-gray h-fit rounded-xl">
                        {{ user?.streamingData ? new Set(user?.streamingData.map(stream => stream.episode.show.id)).size : '-' }} 
                        <br />
                         shows 
                    </p>
                </div>
            </div>
            
            <!-- Stream data -->
            <StreamingDataList :streaming-data="user?.streamingData as Stream[]" />
        </NuxtLayout>   
    </div>
</template>

<script setup lang="ts">
    import type { Stream } from '~/models/StreamingData';
    import type { User } from '~/models/User'
    import { useUserStore } from '~/stores/userStore'

    const userStore = useUserStore()
    onBeforeMount(async () => {
        await userStore.init()
    })
    let user: ComputedRef<User | null> = computed(() => userStore.user)

    setInterval(() => {
        userStore.refreshStreamingData()
    }, 5000)
</script>

<style scoped>

</style>