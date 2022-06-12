import * as icon  from 'react-icons/si'

const social = [
	{ icon: icon.SiGithub, link: 'https://github.com' },
	{ icon: icon.SiCodepen, link: 'https://www.medium.com/' },
	{ icon: icon.SiTwitter, link: 'https://www.twitter.com/' },
	{ icon: icon.SiInstagram, link: 'https://www.instagram.com/' },
];

const work = [
	{
		name: 'Todo app',
		description: 'Phasellus metus mi, scelerisque eu volutpat non, posuere et massa. Nunc hendrerit, augue non fringilla mattis.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://example.com',
		linkGithub: 'https://github.com',
	},
	{
		name: 'Pokedex',
		description: 'Etiam eget volutpat risus. Nam magna bibendum a metus dignissim, id eleifend libero luctus molestie eget.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://example.com',
		linkGithub: 'https://github.com',
	},
	{
		name: 'E-Commerce',
		description: 'Nullam id mauris auctor, sollicitudin sapien id, sagittis turpis proin et nunc sempe, venenatis erat.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://example.com',
		linkGithub: 'https://github.com',
	},
	{
		name: 'Twitter clon',
		description: 'Cras leo mauris, gravida vel lectus ac, congue luctus odio. Sed varius varius est eget convallis sagittis sit amet.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://example.com',
		linkGithub: 'https://github.com',
	},
]

const stack = [
	{
		name: 'Front End',
		items: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiBootstrap, name: 'Bootstrap', },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiTypescript, name: 'Typescript' },
			{ icon: icon.SiReact, name: 'React', },
		],
	},
]

export { social, work, stack }