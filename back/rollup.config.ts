// rollup.config.js
import typescript from '@rollup/plugin-typescript'

export default {
    input: 'back/main.ts',
    output: {
        file: 'back/dist/bundle.back.js',
        format: 'cjs',
    },
    plugins: [typescript()],
};