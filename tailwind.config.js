// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins'",
        noto: "'noto'",
      },
      colors: {
        main: 'var(--theme-color, #5C48C1)',
        copy: '#444444',
        bg: '#EEECF9',
        inputGray: '#707070',
      },
      backgroundImage: {
        services: "url('/bg4.jpg')",
        b2b: "url('/b2b.jpg')",
        tourism: "url('/bg.jpg')",
        umrah: "url('/umrah.jpg')",
        bookings: "url('/bookings.jpg')",
        favs: "url('/favs.jpg')",
        com: "url('/com.jpg')",
        about: "url('/about.jpg')",
        terms: "url('/terms.jpg')",
        contact: "url('/contact.jpg')",
        faq: "url('/faq.jpg')",
        flight: "url('/flight.png')",
        hotel: "url('/hotel.png')",
        catering: "url('/catering.png')",
        transportation: "url('/transportation.png')",
      },
      gridTemplateColumns: {
        '3x1-0.75': 'repeat(3, minmax(0, 1fr)), 0.75fr',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
