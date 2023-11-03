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
            boxShadow: {
                'card-md': '0 0 0 1px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.15)',
                'card-lg': '0 3px 10px rgba(0,0,0,0.1)',
            },
        },
    },
    plugins: [],
};
