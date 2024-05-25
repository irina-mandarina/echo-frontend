<template>
    <button class="absolute inset-[16%] flex flex-col w-2/3 block bg-echo-white rounded-xl shadow-lg">
        <i
            class="absolute top-2 right-3 fas fa-times my-auto hover:text-orange-600 duration-100 cursor-pointer"
            @click="$emit('close')"
        ></i>
        <!-- sector titles -->
        <div class="w-full h-min justify-evenly flex border-b border-b-1 border-b-echo-gray font-lato-bold">
            <span
                v-for="i in Object.keys(ResultPage)"
                :class="`cursor-pointer border-b border-b-2 py-2 px-4 ${resultPage == i ? 'border-b-echo-orange' : 'border-b-echo-gray'}`"
                @click="resultPage = ResultPage[i as keyof typeof ResultPage]"
            >
                {{ i }}
            </span>
        </div>
        <div class="w-full p-3 overflow-x-hidden overflow-y-auto">
            <div v-if="(!userStore.user || !userStore.user?.spotifyConnected) && (resultPage === ResultPage.Shows || resultPage === ResultPage.Episodes)">
                Spotify search results are only available to users with a connected Spotify account.
                <EchoButton @click="navigateTo('/spotify')">
                    Connect your spotify
                </EchoButton>
            </div>

            <ShowSearchResult v-else-if="resultPage === ResultPage.Shows" v-for="show in showResults" :show="show" />
            <EpisodeSearchResult v-else-if="resultPage === ResultPage.Episodes" v-for="episode in episodeResults" :episode="episode" />
            <UserSearchResult v-else-if="resultPage === ResultPage.Profiles" v-for="user in userResults" :user="user" />
        </div>
    </button>
</template>

<script setup lang="ts">
    import type { Episode, EpisodeSearchResult } from '~/models/Episode';
    import type { Show, ShowSearchResult } from '~/models/Show';
    import type { User } from '~/models/User';
    import { searchEpisodes, searchShows } from '~/requests/spotifyRequests';
    import { searchUsers } from '~/requests/userRequests';
    import { useUserStore } from '~/stores/userStore';
    
    enum ResultPage {
        Shows = 'Shows',
        Episodes = 'Episodes',
        Profiles = 'Profiles'
    }

    const userStore = useUserStore()

    const props = defineProps<{ query: string }>()
    const emit = defineEmits<{ close: any }>()
    
    const resultPage = ref<ResultPage>(ResultPage.Shows)

    const showResults = ref<ShowSearchResult[]>([])
    const episodeResults = ref<EpisodeSearchResult[]>([])
    const userResults = ref<User[]>([])

    updateResults()

    watch(() => props.query, async () => {
        await updateResults()
    })

    watch(() => resultPage.value, async () => {
        await updateResults()
    })

    async function updateResults() {
        if (!props.query) return
        if (resultPage.value === ResultPage.Shows && userStore.user?.spotifyConnected) {
            try {
                showResults.value = await searchShows(props.query, 10, 1)
                console.log('showResults', showResults.value)
            } catch (error: any) {
                console.error(error)
                if (error.response.status == 401) {
                    navigateTo('/login')
                }
            }
        } 
        else if (resultPage.value === ResultPage.Episodes && userStore.user?.spotifyConnected) {
            try {
                episodeResults.value = await searchEpisodes(props.query, 10, 1)
            } catch (error: any) {
                console.error(error)
                if (error.response.status == 401) {
                    navigateTo('/login')
                }
            }
        } 
        else if (resultPage.value === ResultPage.Profiles) {
            try {
                userResults.value = await searchUsers(props.query)
                console.log('userResults', userResults.value)
            } catch (error: any) {
                console.error(error.response.status)
                if (error.response.status == 401) {
                    navigateTo('/login')
                }
            } 
        }
    }
</script>

<style scoped>

</style>