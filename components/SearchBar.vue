<template>
    <div class="w-full" @keydown.esc="searchModalOpen = false; query = ''">
        <div class="flex flex-row justify-end w-full">
            <div :class="containerClasses">
                <i :class="iconClasses"></i>
                <input
                    class="p-2 bg-echo-bg rounded-r-xl font-roboto-light outline-none focus:outline-none w-full"
                    v-model="query"
                    @focus="searchBarFocused = true"
                    @blur="searchBarFocused = false"
                    @keydown.esc="searchModalOpen = false; query = ''"
                    @keydown.enter="searchModalOpen = true"
                    placeholder="Search for podcasts, episodes, users..."
                />
                <i v-if="query"
                    class="fas fa-times p-2 my-auto hover:text-orange-600 duration-100 cursor-pointer"
                    @click="query = ''; searchModalOpen = false"
                ></i>
            </div>
            <Transition v-if="query">
                <EchoButton @click="searchModalOpen = true" class="z-20">
                    Enter
                </EchoButton>
            </Transition>
        </div>
        <Transition v-if="searchModalOpen">
            <div class="absolute fixed w-full h-full bg-black/25 top-0 left-0 z-10">

                <SearchResultsModal 
                    :query="query"
                    @focus="resultsModalFocused = true"
                    @blur="resultsModalFocused = false"
                    @close="searchModalOpen = false; query = ''"
                />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    const searchBarFocused = ref(false)
    const resultsModalFocused = ref(false)
    const query = ref('')

    const iconClasses = computed(() => {
        return {
            'fas fa-search p-2 my-auto hover:text-orange-600 duration-100 cursor-pointer': true,
            'text-orange-400 hover:text-orange-600 duration-100 cursor-pointer': searchBarFocused.value,
        }
    })

    const containerClasses = computed(() => {
        return {
            ' w-2/3 mx-2 z-20 relative bg-echo-bg rounded-xl duration-300 flex flex-row w-full outline outline-offset-0 outline-2 outline-echo-gray': true,
            ' w-2/3 mx-2 outline outline-offset-0 outline-orange-400 outline-1': searchBarFocused.value,
        }
    })

    const searchModalOpen = ref(false)

</script>

<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
