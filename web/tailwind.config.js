/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', 
    content: [
      "./index.html",
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./**/*.{js,ts,jsx,tsx}", // Opción segura si usas estructura libre
    ],
    theme: {
      extend: {
        fontFamily: {
          barlow: ['Barlow', 'sans-serif'],
        },
        typography: (theme) => ({
          custom: {
            css: {
              h1: {
                fontSize: theme('fontSize.4xl'),
                fontWeight: '700',
                marginBottom: theme('spacing.4'),
              },
              h2: {
                fontSize: theme('fontSize.3xl'),
                fontWeight: '700',
                marginBottom: theme('spacing.3'),
              },
              h3: {
                fontSize: theme('fontSize.2xl'),
                fontWeight: '600',
              },
              p: {
                fontSize: theme('fontSize.base'),
              },
            },
          },
        }),
      },
    },
};
  