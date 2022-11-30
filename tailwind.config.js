/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.php"],
	theme: {
		extend: {
			colors: {
				blue: {
					DEFAULT: "#0026AE",
					50: "#6788FF",
					100: "#5278FF",
					200: "#2958FF",
					300: "#0138FF",
					400: "#002FD7",
					500: "#0026AE",
					600: "#001A76",
					700: "#000D3E",
					800: "#000106",
					900: "#000000",
				},
				green: {
					DEFAULT: "#20D0A5",
					50: "#B4F3E4",
					100: "#A2F1DE",
					200: "#7FEBD1",
					300: "#5CE6C4",
					400: "#38E0B7",
					500: "#20D0A5",
					600: "#199F7E",
					700: "#116F58",
					800: "#0A3E31",
					900: "#020E0B",
				},
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
};
