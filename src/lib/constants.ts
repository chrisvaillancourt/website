const POSTS_PATH = '/posts/';

const NAV_LINKS = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'Posts',
		path: POSTS_PATH,
	},
	{
		title: 'About',
		path: '/about/',
	},
] as const;

const SOCIAL_LINKS = {
	github: 'https://github.com/chrisvaillancourt',
	twitter: 'https://twitter.com/christopher__v',
	linkedin: 'https://www.linkedin.com/in/chrisdvaillancourt',
} as const;

export { NAV_LINKS, SOCIAL_LINKS, POSTS_PATH };
