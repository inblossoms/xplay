import router from "./router";
import App from "./App.vue";
import { useStore } from "./store/index";
import { routerBeforeEach } from "./router/route";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "@/assets/style.css";

createApp(App).use(createPinia()).use(router).mount("#app");

routerBeforeEach(router, useStore());
