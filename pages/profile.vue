<template>
    <div class="layout-container">
        <NuxtLayout>
            <!-- Profile picture and BG -->
            <div class="absolute bg-echo-gray w-full h-1/3 -z-[101]">
                <div class="absolute bg-echo-gray w-full h-1/2 -top-1/2 -z-[101]"></div>
                <div class="rounded-full w-32 h-32 bg-echo-orange absolute -bottom-24 left-6"></div>
            </div>
            <div class="w-full h-1/3 relative opacity-0"></div>

            <EchoButton class="text-xs float-right m-4" @click="logout">
                Log out
            </EchoButton>

            <div class="flex flex-row justify-items-start"> 

                <!-- <div class="w-40 relative opacity-0"> &nbsp; </div> -->

                <div class="ml-40 p-4 w-1/2">
                    <div class="flex flex-row justify-between">
                        <p class="font-franklin text-3xl">
                            @{{ user?.username }}
                        </p>
                        <div class="flex flex-row">
                            <p class="font-franklin text-2xl px-4">
                                {{ user?.followers?.length ?? 0 }} followers
                            </p>
                            <p class="font-franklin text-2xl px-4">
                                {{ user?.following?.length ?? 0 }} following
                            </p>
                        </div>
                    </div>
                    <p class="font-roboto-light p-2">
                        {{ user?.bio }}
                    </p>
                </div>

                
            </div>
            
            <!-- Stream data -->
            <StreamingDataList class="my-10" :streaming-data="user?.streamingData as Stream[]" />
            <hr />
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

    setInterval(async () => {
        // await userStore.refreshStreamingData()
        console.log("TOFO")
    }, 30000)

    const logout = async () => {
        await userStore.logOut()
    }
</script>

<style scoped>

</style>