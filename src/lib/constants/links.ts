const POSTS_PATH = '/posts/';

const NAV_LINKS = [
	Object.freeze({
		title: 'Home',
		path: '/',
	}),
	Object.freeze({
		title: 'Posts',
		path: POSTS_PATH,
	}),
	Object.freeze({
		title: 'About',
		path: '/about/',
	}),
] as const;

const SOCIAL_LINKS = Object.freeze({
	github: 'https://github.com/chrisvaillancourt',
	twitter: 'https://twitter.com/christopher__v',
	linkedin: 'https://www.linkedin.com/in/chrisdvaillancourt',
});

export { NAV_LINKS, SOCIAL_LINKS, POSTS_PATH };
