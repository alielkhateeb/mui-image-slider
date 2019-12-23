import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import {uglify} from 'rollup-plugin-uglify';

export default {
    input: './src/index.js',
    plugins: [
        replace({__buildEnv__: 'production'}),
        commonjs({
            include: ['node_modules/**'],
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        uglify({
            compress: {
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),
    ],
    output: {
        file: './dist/index.js',
        format: 'cjs',
        exports: 'named',
    },
    external: [
        'react',
        'react-dom',
        '@material-ui/core',
    ],
};
