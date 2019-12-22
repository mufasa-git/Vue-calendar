import Vue from 'vue'
window.$ = window.jQuery = require('jquery')

import {
  Vuetify,
  VApp,
  VGrid,
  VDialog,
  VBtn,
  VCard,
  VTextField,
  VSelect,
  VAutocomplete,
  VMenu,
  VList,
  VIcon,
  VDivider,
  VSwitch,
  VCheckbox,
  VDatePicker,
  VTimePicker,
  /*VNavigationDrawer,
  VFooter,
  VOverflowBtn,
  VToolbar,
  */
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(
  Vuetify, {
    components: {
      VApp,
      VGrid,
      VDialog,
      VBtn,
      VCard,
      VTextField,
      VSelect,
      VAutocomplete,
      VMenu,
      VList,
      VIcon,
      VDivider,
      VSwitch,
      VCheckbox,
      VDatePicker,
      VTimePicker,
      /*VNavigationDrawer,
      VFooter,
      VOverflowBtn,
      VToolbar,
      */
      transitions
    },
    theme: {
      primary: '#ee44aa',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    },
  }
)
