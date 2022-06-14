import * as icon  from 'react-icons/si'

const work = [
	{
		id: 1,
		name: 'Todo app',
		description: `A simple To-do app cause, am I really a junior dev if I don't have one?.`,
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://to-do-platzi.vercel.app/',
		linkGithub: 'https://github.com/ImGaston/to-do-list',
	},
	{
		id: 2,
		name: 'Quote-generator',
		description: 'Random quote generator from Leo Piccioli Linkedin articles.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://imgaston.github.io/quote-generator/',
		linkGithub: 'https://github.com/ImGaston/quote-generator',
	},
	{
		id: 3,
		name: 'Facundo Campazzo Stats',
		description: 'A card player stats using info from an NBA API.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://example.com',
		linkGithub: 'https://github.com/ImGaston',
	},
	{
		id: 4,
		name: 'Cards play note',
		description: 'A solution to an argentian game called Truco.',
		stack: [
			{ icon: icon.SiHtml5, name: 'HTML' },
			{ icon: icon.SiCss3, name: 'CSS' },
			{ icon: icon.SiJavascript, name: 'Javascript' },
			{ icon: icon.SiReact, name: 'ReactJS' },
		],
		linkProject: 'https://anotador.com.ar/',
		linkGithub: 'https://github.com/ImGaston/anotador',
	},
]

export default work;