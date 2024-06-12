<template>
    <h1 class="font-franklin text-center text-4xl text-echo-orange p-4">
        Listening activity for this week
    </h1>
    <div class="flex flex-row w-full h-full">
        <div class="w-1/2">
            <Line :data="weekListeningChartData" :options="weekListeningChartOptions" />
        </div>
        <div class="w-1/2">
            <div class="font-franklin text-xl echo-scrollbar px-2 relative">
                <p class="px-4 pb-2 text-echo-orange">
                    {{ showsThisWeek?.length }} shows
                </p>
                <div class="whitespace-nowrap justify-between overflow-auto echo-scrollbar">
                    <div v-if="showsThisWeek && showsThisWeek.length !== 0" v-for="show in showsThisWeek" class="p-4 inline-block">
                        <img width="100" heigth="100" :src="show.images[0].url" />
                    </div>
                    <div v-else class="heigth-[350px] flex justify-center">
                        <img src="../assets/loading.gif" />
                    </div>  
                </div>
            </div>

            <div class="font-franklin text-xl echo-scrollbar px-2 relative">
                <p class="px-4 pb-2 text-echo-orange">
                    {{ episodesThisWeek?.length }} shows
                </p>
                <div class="whitespace-nowrap justify-between overflow-auto echo-scrollbar">
                    <div v-if="episodesThisWeek && episodesThisWeek.length !== 0" v-for="episode in episodesThisWeek" class="p-4 inline-block">
                        <img width="100" heigth="100" :src="episode.images[0].url" />
                    </div>
                    <div v-else class="heigth-[350px] flex justify-center">
                        <img src="../assets/loading.gif" />
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
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
    import type { Stream } from '~/models/StreamingData';
    import type { Episode } from '~/models/Episode';
    import type { Show } from '~/models/Show';

    const props = defineProps<{
        streamingData: Stream[]
    }>()

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const showsThisWeek = ref<Show[] | null>(null);
    const episodesThisWeek = ref<Episode[] | null>(null);

    const weekListeningChartData = ref({
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Number of streams',
                backgroundColor: 'rgba(217, 217, 217, 0.5)',
                borderColor: 'rgba(240, 90, 25, 1)',
                borderWidth: 1,
                fill: true,
                data: []
            }
        ]
    });

    const weekListeningChartOptions = ref({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
            }
        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    });

    const processWeekStreamingData = () => {
        const weekListening = ref(props.streamingData || []);
        const episodeCounts = Array(7).fill(0); // Array to hold counts for each day of the week

        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday of the current week

        weekListening.value.forEach(stream => {
            const date = new Date(parseInt(stream.timestamps[0].toString()));
            if (date >= startOfWeek) {
                const dayIndex = (date.getDay() + 6) % 7; // Convert Sunday (0) to last day of the week (6)
                episodeCounts[dayIndex]++;
                if (showsThisWeek.value === null) {
                    showsThisWeek.value = [stream.episode.show];
                } else {
                    if (!showsThisWeek.value.filter(show => show.id === stream.episode.show.id).length) {
                        showsThisWeek.value.push(stream.episode.show);
                    }
                }
                if (episodesThisWeek.value === null) {
                    episodesThisWeek.value = [stream.episode];
                }
                else {
                    episodesThisWeek.value.push(stream.episode);
                }
            }
        });

        weekListeningChartData.value.datasets[0].data = episodeCounts as never[];
    };


    onBeforeMount(() => {
        processWeekStreamingData()
    })
</script>