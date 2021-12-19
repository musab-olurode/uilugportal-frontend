module.exports = {
	content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0052cc',
					50: '#f2f6fc',
					100: '#e6eefa',
					200: '#bfd4f2',
					300: '#99baeb',
					400: '#4d86db',
					500: '#0052cc',
					600: '#004ab8',
					700: '#003e99',
					800: '#00317a',
					900: '#002864',
				},
				secondary: {
					DEFAULT: '#ffba10',
					50: '#fffcf3',
					100: '#fff8e7',
					200: '#ffeec3',
					300: '#ffe39f',
					400: '#ffcf58',
					500: '#ffba10',
					600: '#e6a70e',
					700: '#bf8c0c',
					800: '#99700a',
					900: '#7d5b08',
				},
			},
			backgroundImage: {
				'login-hero': "url('/images/auditorium-bg.png')",
			},
			backgroundPosition: {
				'auditorium-center': '-80px, center',
			},
			backgroundSize: {
				'auditorium-size': '130%',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#0052cc',
					'primary-focus': '#004ab8',
					'primary-content': '#ffffff',
					secondary: '#ffba10',
					'secondary-focus': '#e6a70e',
					'secondary-content': '#ffffff',
					accent: '#ff5668',
					'accent-focus': '#e64d5e',
					'accent-content': '#ffffff',
					neutral: '#3d4451',
					'neutral-focus': '#2a2e37',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#d1d5db',
					'base-content': '#1f2937',
					info: '#2094f3',
					success: '#009485',
					warning: '#ff9900',
					error: '#ff5724',
				},
			},
		],
	},
};
