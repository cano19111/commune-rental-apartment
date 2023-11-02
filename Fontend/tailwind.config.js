/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                main: "'Poppins', sans-serif;",
            },
            colors: {
                'midnight-blue': '#24324a',
                'midnight-blue-500': '#8a99b3',
            },
        },
    },
    plugins: [],
};
