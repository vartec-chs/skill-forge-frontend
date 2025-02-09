import { resolve } from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@pages': resolve(__dirname, 'src/pages'),
			'@hooks': resolve(__dirname, 'src/hooks'),
			'@components': resolve(__dirname, 'src/components'),
			'@zod-schemas': resolve(__dirname, 'src/zod-schemas'),
			'@api': resolve(__dirname, 'src/api'),
			'@states': resolve(__dirname, 'src/states'),
			'@providers': resolve(__dirname, 'src/providers'),
			'@assets': resolve(__dirname, 'src/assets'),
			'@configs': resolve(__dirname, 'src/configs'),
			'@utils': resolve(__dirname, 'src/utils'),
			'@ts': resolve(__dirname, 'src/ts'),
		},
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
	plugins: [react()],
})
