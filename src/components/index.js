import page from './page'
import code from './code'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('ui-code', code)
    }
}
