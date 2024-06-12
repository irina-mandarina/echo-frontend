<template>
    <div class="layout-container">
        <NuxtLayout>
            <div class="font-franklin text-center text-3xl" v-if="!userStore.user!.streamingData || !userStore.user!.spotifyConnected">
                Please connect your spotify to view your charts
            </div>
            <div v-else class="h-full px-20">
                <div class="h-30 m-0>">
                    <ChartWeekStreams :streaming-data="userStore.user!.streamingData" />
                </div>
            </div>
                
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '~/stores/userStore';
    import { Line } from 'vue-chartjs';
    import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js'

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const userStore = useUserStore()

    onMounted(async () => {
        if (!userStore.user) {
            await userStore.init()
        }

    })
</script>

<style scoped>
.h-30 {
    height: 300px;
}

</style>