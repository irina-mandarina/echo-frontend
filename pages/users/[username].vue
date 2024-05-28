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


            <div class="pl-40"> 
                <div class="">
                    <p class="font-franklin text-3xl inline-block p-4">
                        @{{ user?.username }}
                    </p>
                    <EchoButton v-if="isFollowed" class="inline-block mx-4" @click="unfollow">
                        Unfollow
                    </EchoButton>
                    <EchoButton v-else class="inline-block mx-4" @click="follow">
                        Follow
                    </EchoButton>
                    <p class="font-roboto-light text-l px-2 inline-block">
                        {{ user?.followers?.length ?? 0 }} followers
                    </p>
                    <p class="font-roboto-light text-l px-2 inline-block">
                        {{ user?.following?.length ?? 0 }} followers
                    </p>
                </div>
                
                <p class="font-roboto-light p-2">
                    {{ user?.bio ?? 'This user has not set a bio yet.' }}
                </p>
            </div>
            
           <!-- Stream data -->
           <StreamingDataList class="my-10" :streaming-data="user?.streamingData" />

        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    import type { User } from '~/models/User'
    import { getFollowers, getStreamingData, getUser } from '~/requests/userRequests';
    import { useUserStore } from '~/stores/userStore'

    let user = ref()
    const route = useRoute()
    const username: string = route.params.username.toString()
    const userStore = useUserStore()

    onBeforeMount(async () => {
        await userStore.init()
        if (username === userStore.user?.username) {
            navigateTo('/profile')
        }
        try {
            user.value = await getUser(username)
            console.log(user.value)
        }
        catch(error: any) {
            console.error(error)
        }
    })

    // setInterval(async () => {
       // user.value.streamingData = await getStreamingData(user.value.username)
    //}, 60000)


    const follow = async () => {
        try {
            await userStore.followUser(user.value.username)
            await refreshFollowers()
        }
        catch(error: any) {
            console.error(error)
        }
    }

    const unfollow = async () => {
        try {
            await userStore.unfollowUser(user.value.username)
            await refreshFollowers()
        }
        catch(error: any) {
            console.error(error)
        }
    }

    const refreshFollowers = async () => {
        try {
            user.value.followers = await getFollowers(user.value.username)
        }
        catch(error: any) {
            console.error(error)
        }
    }

    const isFollowed: ComputedRef<boolean> = computed(() => {
        return userStore?.user?.following?.filter((u) => u.username === user.value?.username)?.length as number > 0 ?? false
    })
</script>

<style scoped>

</style>