<template>
    <h1 class="font-franklin text-center text-xl">
        Listening activity for this week
    </h1>
    <Line :data="weekListeningChartData" :options="weekListeningChartOptions" />
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

    const showsThisWeek = ref(0);
    const episodesThisWeek = ref(0);

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
                showsThisWeek.value++;
                episodesThisWeek.value++;
            }
        });

        weekListeningChartData.value.datasets[0].data = episodeCounts as never[];
    };


    onBeforeMount(() => {
        processWeekStreamingData()
    })
</script>