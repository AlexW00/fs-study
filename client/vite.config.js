import { defineConfig } from "vite";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
export default defineConfig({
	build: {
		outDir: "../dist",
	},
	plugins: [viteCommonjs()],
	optimizeDeps: {
		esbuildOptions: {
			plugins: [esbuildCommonjs(["fs-lib"])],
		},
	},
});
