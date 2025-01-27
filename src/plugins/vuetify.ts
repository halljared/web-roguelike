/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  defaults: {
    VTextField: {
      hideDetails: 'auto', // Set 'hide-details' to auto for all v-text-field components
    },
    VSelect: {
      hideDetails: 'auto', // Set 'hide-details' to auto for all v-text-field components
    }
  },

})
