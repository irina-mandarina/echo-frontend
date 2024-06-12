<template>
        <label :class="labelClasses">
            {{ label }}
        </label>
        <input @focus="isFocused = true"
               @blur="isFocused = false"
                v-model="props.value"
                @input="updateValue"
               class="p-2 rounded-xl bg-echo-white font-roboto focus:outline focus:outline-offset-0 focus:outline-orange-400 focus:outline-1 duration-300" />
</template>

<script setup lang="ts">

    const emit = defineEmits(['update:value'])
    const props = defineProps<{
        label: string
        validation: string
        value: string
        class: string
    }>()

    const isFocused = ref(false)

    const labelClasses = computed(() => {
        return {
            'block font-roboto-light text-xs font-medium duration-100 mb-0 p-0 mt-2': true,
            'text-orange-400': isFocused.value,
            '-translate-y-1': isFocused.value
        }
    })

    function updateValue(event: Event) {
        const target = event.target as HTMLInputElement
        const value = target.value
        // @ts-ignore
        emit('update:value', value)
    }
</script>

<style scoped>

</style>