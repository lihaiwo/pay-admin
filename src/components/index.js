import BaseLayout from './layout/base-layout.vue';
import SvgIcon from 'vue-svg-icon/Icon.vue'
import { getAllIcons } from '@/libs/require.context'

const components = {
  BaseLayout,
  SvgIcon,
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
  });
};

const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  install,
};

export default API;   // eslint-disable-line no-undef