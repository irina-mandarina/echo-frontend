<template>
    <div class="layout-container">
        <NuxtLayout>
            <div class="h-2/3 w-full bg-echo-gray top-0 flex flex-col justify-end">
                <span class="font-franklin text-5xl p-4">
                    Love what you listen to;
                    <br />
                    Let <span class="text-echo-orange">podcasts</span> be your passion project
                </span>
                <p class="font-roboto-light text-3xl p-4">
                    Share your listening experience. Explore, inspire, connect.
                </p>
            </div>

            <div class="echo-scrollbar py-20 px-2 relative">
                <p class="font-franklin text-3xl px-4 pb-2 text-echo-orange">
                    Picked just for you
                </p>
                <p class="roboto-light text-xl p-2">
                    We know you like Sea moss girlies and Diary of a CEO. How about you give our special recommendations a listen? 
                </p>
                <div class="whitespace-nowrap justify-between overflow-auto echo-scrollbar">
                    <div v-if="episodeRecommendations" v-for="episode in episodeRecommendations" class="p-4 inline-block">
                        <img width="350" heigth="350" :src="episode.images[0].url" />
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
                    
                    <div class="p-4 inline-block">
                        <img width="350" heigth="350" src="../assets/huberman.jpg" />
                    </div>
                    <div class="p-4 inline-block">
                        <img width="350" heigth="350" src="../assets/goop.jpeg" />
                    </div>
                    <div class="p-4 inline-block">
                        <img width="350" heigth="350" src="../assets/maintenance_phase.jpeg" />
                    </div>
                    <div class="p-4 inline-block">
                        <img width="350" heigth="350" src="../assets/crime_junkie.png" />
                    </div>
                </div>
                <EchoButton class="absolute right-2 bottom-6" />
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    import { getEpisodeRecommendations } from '~/requests/spotifyRequests'
    const episodeRecommendations = await getEpisodeRecommendations();
    console.log(episodeRecommendations)

</script>

<style scoped>

</style>