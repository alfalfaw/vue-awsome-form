import Vue from 'vue'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import axios from 'axios'
Vue.prototype.$httpajax = axios
Vue.use(Avue)
