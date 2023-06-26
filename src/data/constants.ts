const NAV_LINKS = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'About',
		path: '/about/',
	},
	{
		title: 'Blog',
		path: '/posts/',
	},
] as const;

const SOCIAL_LINKS = {
	github: 'https://github.com/chrisvaillancourt',
	twitter: 'https://twitter.com/christopher__v',
	linkedin: 'https://www.linkedin.com/in/chrisdvaillancourt',
} as const;

export { NAV_LINKS, SOCIAL_LINKS };
