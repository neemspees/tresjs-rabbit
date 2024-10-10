<script setup lang="ts">
import { ref, shallowRef, watchEffect, defineProps, watch, onMounted } from 'vue'
import type { TresObject } from '@tresjs/core'
import { useLoop } from '@tresjs/core'
import { useAnimations, useGLTF } from '@tresjs/cientos'

const props = defineProps({
    position: {
        type: Object as {x: number, y: number, z: number},
        default: { x: 0, y: 0, z: 0 },
    },
    animation: {
        type: String as 'idle' | 'grabbed' | 'greeting' | 'tpose',
        default: 'idle',
    },
});

const { scene, animations } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf');
const { actions } = useAnimations(animations, scene);
const meshRef = shallowRef<TresObject | null>(null)
let activeAnimation = null; 

const updateAnimation = (animation: string) => {
    const animationName = {
        idle: 'Iddle',
        grabbed: 'Grabbed',
        greeting: 'Greeting',
        tpose: '0TPose',
    }[animation];

    if (!actions[animationName]) {
        return;
    }

    if (activeAnimation) {
        activeAnimation.stop();
    }

    activeAnimation = actions[animationName];
    activeAnimation.play();
};

watch(() => props.position, () => {
    if (!meshRef.value) {
        return
    }

    meshRef.value.position.x = props.position.x;
    meshRef.value.position.y = props.position.y;
    meshRef.value.position.z = props.position.z;
});

onMounted(() => {
    updateAnimation(props.animation);
});

watch(() => props.animation, (newVal) => {
    updateAnimation(newVal);
});
</script>

<template>
    <primitive :object="scene" ref="meshRef" :position="[props.position.x, props.position.y, props.position.z]" />
</template>

<style scoped></style>
