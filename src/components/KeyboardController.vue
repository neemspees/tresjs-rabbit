<script setup lang="ts">
import { defineProps, defineModel, onMounted, onBeforeUnmount } from 'vue'
import { useLoop } from '@tresjs/core'

const model = defineModel({
    type: Object as { x: number, y: number, z: number },
    default: { x: 0, y: 0, z: 0 },
});
const props = defineProps({
    speed: {
        type: Number,
        default: 2,
    },
});

const { onBeforeRender } = useLoop();

const keyboardInputs = {
    up: false,
    down: false,
    left: false,
    right: false,
};

const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowUp':
            keyboardInputs.up = true;
            break;
        case 'ArrowDown':
            keyboardInputs.down = true;
            break;
        case 'ArrowLeft':
            keyboardInputs.left = true;
            break;
        case 'ArrowRight':
            keyboardInputs.right = true;
            break;
    }
};

const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowUp':
            keyboardInputs.up = false;
            break;
        case 'ArrowDown':
            keyboardInputs.down = false;
            break;
        case 'ArrowLeft':
            keyboardInputs.left = false;
            break;
        case 'ArrowRight':
            keyboardInputs.right = false;
            break;
    }
};

onBeforeRender(({ delta }) => {
    if (keyboardInputs.up) {
        model.value.z -= props.speed * delta;
    }
    if (keyboardInputs.down) {
        model.value.z += props.speed * delta;
    }
    if (keyboardInputs.left) {
        model.value.x -= props.speed * delta;
    }
    if (keyboardInputs.right) {
        model.value.x += props.speed * delta;
    }
});

onMounted(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
});
</script>

<template>
    <TresObject3D />
</template>

