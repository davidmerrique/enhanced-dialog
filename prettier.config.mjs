/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	trailingComma: "all",
	overrides: [
		{
			files: "*.liquid",
			options: {
				useTabs: false,
				plugins: ["@shopify/prettier-plugin-liquid"],
			},
		},
	],
};
