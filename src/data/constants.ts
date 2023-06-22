const MENU_LINKS = [
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
	email: 'chris.d.vaillancourt@gmail.com',
} as const;

export { MENU_LINKS, SOCIAL_LINKS };
