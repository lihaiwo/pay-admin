import BaseLayout from './layout/base-layout.vue';

const components = {
  BaseLayout,
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