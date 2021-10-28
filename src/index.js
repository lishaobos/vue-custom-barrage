import Barrage from "../src/index.vue";
export let vue

export default function (Vue) {
  vue = Vue
  Vue.component(Barrage.name, Barrage)
}