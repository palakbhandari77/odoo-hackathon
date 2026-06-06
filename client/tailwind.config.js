/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#F9F9F9',  // Odoo main background
          100: '#FFFFFF', // Odoo card background
          200: '#E5E7EB', // Odoo thin borders
          900: '#212529', // Odoo dark text
          muted: '#71717A' // Odoo gray text
        },
        brand: {
          50: '#F5F0F4',  // Light purple hover
          500: '#875A7B', // Lighter Odoo Purple
          600: '#714B67', // Odoo Enterprise Purple (Primary)
          700: '#5C3D54', // Darker Purple for active states
          teal: '#017E84', // Odoo Secondary Action
        },
        status: {
          success: '#00A09D', // Odoo teal-green for success
          warning: '#F0AD4E',
          danger: '#D9534F',
          info: '#17A2B8'
        }
      },
      fontFamily: {
        // Odoo primarily uses native system fonts for maximum performance
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'odoo': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      }
    },
  },
  plugins: [],
}