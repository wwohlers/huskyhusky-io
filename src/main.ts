import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import api from "./api/api";
import ApiInterface from "@/api/api.interface";

// Utils
import { dateUtils, DateUtils } from "./utils/date.utils";
import { htmlUtils, HtmlUtils } from "@/utils/html.utils";
import { metaUtils, MetaUtils } from "@/utils/meta.utils";

// Config
Vue.config.productionTip = false;

// Instance properties
Vue.prototype.$api = api;
Vue.prototype.$date = dateUtils;
Vue.prototype.$html = htmlUtils;
Vue.prototype.$meta = metaUtils;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiInterface;
    $date: DateUtils,
    $html: HtmlUtils,
    $meta: MetaUtils
  }
}
