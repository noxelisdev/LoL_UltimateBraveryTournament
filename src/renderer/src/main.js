import './css/app.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueTippy from 'vue-tippy'

createApp(App)
  .use(VueTippy, {
    directive: 'tippy',
    component: 'tippy',
    defaultProps: {
      theme: 'lol',
      arrow: true,
      animation: 'shift-away',
      placement: 'top',
      allowHTML: true,
      delay: 250
    }
  })
  .mount('#app')
