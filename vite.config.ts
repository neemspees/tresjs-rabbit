import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.gltf'],
  plugins: [
      vue({
        ...templateCompilerOptions,
      })
  ],
})
