import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";
import del from 'rollup-plugin-delete';

export default [
    {
        input: 'src/index.ts',
        external: ['kuromoji'],
        plugins: [
            del({ targets: 'dist/*' }),
            commonjs(),
            nodeResolve(),
            typescript() // so Rollup can convert TypeScript to JavaScript
        ],
        output: [
            {
                file: 'dist/index.bundle.js',
                sourcemap: true,
            },
        ]
    },
    {
        input: "dist/dts/index.d.ts",
        output: [{ file: "dist/index.bundle.d.ts", format: "es" }],
        plugins: [
            dts(),
            del({ hook: "buildEnd", targets: 'dist/dts' })
        ]
    }
];