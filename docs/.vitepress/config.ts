import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Contonest",
	description: "Documentations & Setup Guide",
	themeConfig: {
		nav: [{ text: "Home", link: "/" }],

		sidebar: [
			{
				text: "Introduction",
				items: [{ text: "Overview", link: "/intro.md" }],
			},
			{
				text: "Frontend",
				collapsible: true,
				items: [
					{ text: "Stack", link: "/frontend/stack.md" },
					{ text: "Setup", link: "/frontend/setup.md" },
				],
			},
			{
				text: "Backend",
				collapsible: true,
				items: [
					{ text: "Stack", link: "/backend/stack.md" },
					{ text: "Setup", link: "/backend/setup.md" },
				],
			},
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/erfanmola/Contonest" },
		],
	},
});
