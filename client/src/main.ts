import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';
import VueVirtualScroller from 'vue-virtual-scroller'
import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import router from './router'
import App from './App.vue'

import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('VueDatePicker', VueDatePicker);
app.use(VueVirtualScroller)

app.mount('#app')
