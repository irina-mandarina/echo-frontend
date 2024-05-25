<template>
    <div class="layout-container">
        <NuxtLayout>
            <div class="flex flex-col">
                <p class="text-2xl p-4 font-franklin text-green-600 w-full text-center">
                    Connect to Spotify
                </p>
                <p class="font-lato-light text-xl p-4 w-1/2 mx-auto">
<!--                    &nbsp;&nbsp;&nbsp;&nbsp;-->
                    By connecting your Spotify account, you'll enable our app to provide you with a personalized experience tailored to your music preferences.
                </p>
                <p class="p-4 w-1/2 mx-auto text-center">
                    Click the button below to connect to your Spotify account.
                </p>

                <EchoButton class="mx-auto" @click="navigateToLogIn">
                    <template #default>
                        Connect
                    </template>
                    <template #loader>
                        Connecting...
                    </template>
                </EchoButton>
                <p v-if="errorMessage" class="text-red-800">
                    {{ errorMessage }}
                </p>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSpotifyAuthURL } from '~/requests/authRequests'

const router = useRouter();

const errorMessage = ref<string>('')

const navigateToLogIn = async () => {
    try {
        const url = await getSpotifyAuthURL()
        console.log(url)
        window.location.href = url
    }
    catch (e) {
        console.error(e)
        errorMessage.value = 'An error occurred while connecting to Spotify. Please try again later.'
    }
}
</script>

<style scoped>
</style>
