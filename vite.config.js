import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/index.ts",
			name: "EnhancedDialog",
			fileName: (format) => `enhanced-dialog.${format}.js`,
		},
	},
});
