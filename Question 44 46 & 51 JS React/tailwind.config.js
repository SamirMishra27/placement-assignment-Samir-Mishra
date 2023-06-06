/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'theme-dark': '#27374D',
                'theme-semi-dark': '#526D82',
                'theme-semi-bright': '#9DB2BF',
                'theme-bright': '#DDE6ED',
            },
        },
    },
    plugins: [],
}
