import { createApp } from "vue"
import { createPinia } from "pinia"
import VueDatePicker from "@vuepic/vue-datepicker"
import VueVirtualScroller from "vue-virtual-scroller"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import "@vuepic/vue-datepicker/dist/main.css"
import "vue-virtual-scroller/dist/vue-virtual-scroller.css"

import router from "./router"
import App from "./App.vue"

import "./index.css"

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.component("VueDatePicker", VueDatePicker)
app.use(VueVirtualScroller)

app.mount("#app")
