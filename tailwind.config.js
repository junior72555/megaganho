/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {

      colors: {
        white: '#ffffff',
        'green-500': '#2d9bfc',
        'green-600': 'rgb(59 130 246)',
	'green-700': 'rgb(59 130 246)',
        'green-900': '#742a2a',

        'zinc-950': '#050e0f',
        'zinc-900': '#1B1E1F',
        'zinc-800': '#212425',
        'zinc-700': '#292D2E',
        'zinc-600': '#323637',
        'zinc-500': '#323637',
        'zinc-400': '#ADADAD',
        'zinc-300': '#C4C4C4',
        'zinc-200': '#DADADA',

        'yellow-500': "#FFE81A"
      },
      boxShadow: {
        'green': '0 0px 12px -3px #2d9bfc58',
        'yellow': '0 0px 12px -3px #FFD700',
      },
      dropShadow: {
        'green': '0 0 8px #2d9bfc99',
        'yellow': '0 0 8px #FFD70099',
      },
      backgroundImage: {
        'arrow': "url('/LionsBet/arrow.png')",
        'money-rain': "url('/LionsBet/money-rain.png')",
      }

    }
  },

  plugins:[],
}
