<template>
    <div class="layout-container">
        <NuxtLayout class="w-full">
            <div class="w-1/2 m-auto bg-echo-gray rounded-lg p-6 flex flex-col">
                <h1 class="font-franklin text-center w-full">
                    Log in
                </h1>
                <div class="flex flex-row mt-4">
                    <div class="flex flex-col w-1/2 mx-auto h-full">
                        <EchoInput :value="identifier" @update:value="identifier=$event" class="my-2" label="Email or username" validation="" />
                        <EchoInput :value="password" @update:value="password=$event"class="my-2" label="Password" validation="" />
                        
                        <div v-if="userStore.errorMessage" class="text-red-500 text-sm">
                            {{ userStore.errorMessage }}
                        </div>

                        <EchoButton @click="logIn" class="w-1/2 mx-auto my-4">
                            Log in
                        </EchoButton>
                    </div>

                    <div class="flex flex-col my-3 w-1/2 h-full">
                        <img src="../assets/login.png">

                        <NuxtLink to="/signup" class="text-sm mx-auto text-center mt-2">
                            Don't have an account?
                            <br />
                            <span class="underline text-echo-orange">
                            Sign up
                        </span>
                        </NuxtLink>
                    </div>
                </div>

            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    import { getJWT, setJWT } from '~/lib/localStorageUtil';
    import { useUserStore } from '~/stores/userStore'

    const userStore = useUserStore()
    const identifier = ref('')
    const password = ref('')

    async function logIn() {
        console.log('Logging in: ', identifier.value, password.value)
        try {  
            await userStore.logIn(identifier.value, password.value)
            if (userStore.errorMessage) {
                return
            }
            navigateTo('/')
        } catch (error) {
            console.error(error)
        }
    }
</script>

<style scoped>

</style>