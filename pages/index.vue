<template>
    <div class="layout-container">
        <NuxtLayout class="w-full">
            <div class="h-[500px] w-full bg-echo-gray top-0 flex flex-row justify-end overflow-hidden bg-picture">
                <div class="font-franklin text-5xl px-4 my-auto w-full">
                    Love what you listen to<span class="text-echo-orange">;</span>
                    <br />
                    Let <span class="text-echo-orange">podcasts</span> be your passion project
                    <p class="font-roboto-light text-3xl py-4">
                        Share your listening experience. Explore, inspire, connect.
                    </p>
                </div>
            </div>

            <div class="echo-scrollbar py-20 px-2 relative">
                <p class="font-franklin text-3xl px-4 pb-2 text-echo-orange">
                    Picked just for you
                </p>
                <p class="roboto-light text-xl p-2">
                    We know you like 
                    {{ userStore.user?.streamingData && userStore.user?.streamingData.length > 0 ?  userStore.user?.streamingData[0]?.episode?.show.name ?? "Sea moss girlies" : "Sea moss girlies"}}
                     and 
                     {{ userStore.user?.streamingData && userStore.user?.streamingData.length > 0 ? userStore.user?.streamingData[1]?.episode?.show.name ?? "Diary of a CEO" : "Diary of a CEO"}}
                     . How about you give our special recommendations a listen? 
                </p>
                <div class="whitespace-nowrap justify-between overflow-auto echo-scrollbar">
                    <div v-if="episodeRecommendations && episodeRecommendations.length !== 0" v-for="episode in episodeRecommendations" class="p-4 inline-block">
                        <img width="350" heigth="350" :src="episode.images[0].url" />
                    </div>
                    <div v-else class="heigth-[350px] flex justify-center">
                        <img src="../assets/loading.gif" />
                    </div>  
                </div>
                <div class="right-2 inset-y-3/4 absolute pt-8 pr-2">
                    <EchoButton>
                        See more ->
                    </EchoButton> 
                </div>  
            </div>

            
            <div class="echo-scrollbar py-20 px-2 relative">
                <p class="font-franklin text-3xl px-4 pb-2 text-echo-orange">
                    Trending this week
                </p>
                <p class="roboto-light text-xl p-2">
                    Other people have been listening to these lately. Would you like to hear what the fuss is all about?
                </p>
                <div class="whitespace-nowrap justify-between overflow-auto echo-scrollbar">
                    <div v-if="topShows && topShows.length !== 0" v-for="show in topShows" class="p-4 inline-block">
                        <img width="350" heigth="350" :src="show.images[0].url" />
                    </div>
                    <div v-else class="heigth-[350px] flex justify-center">
                        <img src="../assets/loading.gif" />
                    </div>  
                </div>
                <div class="right-2 inset-y-3/4 absolute pt-8 pr-2">
                    <EchoButton>
                        See more ->
                    </EchoButton> 
                </div>  
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    import type { Episode } from '~/models/Episode';
    import type { Show } from '~/models/Show';
    import { getEpisodeRecommendations, getTopShows } from '~/requests/spotifyRequests'
    import { useUserStore } from '~/stores/userStore'
    import { demoTopShows }  from '~/stores/topShows'
    import { demoEpisodeRecommendations } from '~/stores/episodeRecommendations'

    let userStore= useUserStore()
    let episodeRecommendations = ref()
    let topShows = ref()

    onMounted(async () => {
        try {
            episodeRecommendations.value = await getEpisodeRecommendations()
            if (episodeRecommendations.value.length === 0) {
                episodeRecommendations.value = demoEpisodeRecommendations
            }
        }
        catch(e: any) {
            console.error(e.response?.errors?.[0]?.message)
            if (e.error === "Unauthorised") {
                navigateTo('/login')
            }
            episodeRecommendations.value = demoEpisodeRecommendations
        }

        try {
            topShows.value = await getTopShows();
            if (topShows.value.length === 0) {
                topShows.value = demoTopShows
            }
        }
        catch(e: any) {
            console.error(e.response?.errors?.[0]?.message)
            if (e.error === "Unauthorised") {
                navigateTo('/login')
            }
            topShows.value = demoTopShows

        }

    })

</script>

<style>
    button:focus {
        outline: none;
    }

    .bg-picture {
        background-image: url('../assets/pod.jpeg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

</style>