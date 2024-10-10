<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import HelloWorld from './components/HelloWorld.vue'
import KeyboardController from './components/KeyboardController.vue'
import { OrbitControls } from '@tresjs/cientos'
import { Suspense, ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three';
import gsap from 'gsap';

const rabbitPosition = ref({ x: 0, y: 5, z: 0 });
const rabbitAnimation = ref('idle');

onMounted(() => {
    const timeline = gsap.timeline();

    rabbitAnimation.value = 'grabbed';

    timeline.to(rabbitPosition.value, {
            y: 0,
            duration: 1,
            ease: 'bounce.out',
            onComplete: () => {
                rabbitAnimation.value = 'idle';
            },
        })
        .to(rabbitPosition.value, {
            z: 2,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                rabbitAnimation.value = 'greeting';
            },
        })
        .to(rabbitPosition.value, {
            duration: 1.5,
            onComplete: () => {
                rabbitAnimation.value = 'idle';
            },
        });
});

</script>

<template>
    <div class="main">
        <div>
            <h1>Move the rabbit with the arrow keys</h1>
        </div>
        <div>
            <TresCanvas
                shadows
            >
                <TresPerspectiveCamera
                  :position="[0, 5, 15]"
                  :look-at="[0, 0, 0]"
                />
                <OrbitControls />
                <KeyboardController v-model="rabbitPosition" />

                <Suspense>
                    <HelloWorld :position="rabbitPosition" :animation="rabbitAnimation" />
                </Suspense>
            
                <TresAmbientLight :intensity="0.2" />
                <TresDirectionalLight
                  color="#FFFFFF"
                  :intensity="3"
                  :position="[3, 10, 5]"
                />
               
                <TresMesh
                    :position="[0, -1, 0]"
                    :rotation="[- Math.PI / 2, 0, 0]"
                    :scale="[1, 1, 1]"
                >
                    <TresBoxGeometry :args="[5, 5, 2]" />
                    <TresMeshPhongMaterial color="#F78B3D" shininess="200" />
                </TresMesh>
            </TresCanvas>
        </div>
    </div>
</template>

<style scoped>
.main {
    height: 100%;
    width: 100%;
    display: flex;
    z-index: 10;
}

.main > div:nth-child(1) {
    flex-shrink: 0;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F78B3D;
    color: white;
    font-size: 1.2rem;
    text-align: center;
    padding: 1rem;
}

.main > div:nth-child(2) {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #82DBC5;
}

#canvas {
    height: 100%;
    width: 100%;
}

@media (max-width: 768px) {
    .main {
        flex-direction: column-reverse;
    }

    .main > div:nth-child(1) {
        width: 100%;
        height: 20%;
    }

    .main > div:nth-child(2) {
        height: 80%;
    }
}
</style>

