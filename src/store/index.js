import Vue from 'vue'
import Vuex from 'vuex'

import Vincent from './modules/Vincent'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        Vincent
    }
})