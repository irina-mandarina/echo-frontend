<template>
    <button class="py-2 px-6 bg-echo-orange text-echo-white rounded-xl hover:bg-orange-700 duration-100">
        <slot />
    </button>
</template>

<script setup lang="ts">
    // import { defineProps } from 'vue'
    // withDefaults(
    //     defineProps<{
    //         text1: string
    //     }>(),
    //     {
    //         text1: 'Click me!'
    //     }
    // )
</script>

<style scoped>

</style>