import {createApp} from "vue";
import App from "@/App.vue"

const app = createApp(App)
app.mount('#app')

// const app = createApp({
//     data() {
//         return {
//             name: 'Nurullah'
//         }
//     },
//     template: `<h1>Benim adım {{this.name}}</h1>`
// })
//
// app.mount("#app")

