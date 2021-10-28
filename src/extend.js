import { vue } from './index'

export const createVueNode = (attributeData, slots) => vue.extend({
  render(h) {
    return h('div', attributeData, slots)
  }
})