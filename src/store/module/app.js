export default {
	state: {
		cacheObj: {}
	},
	getters: {
	},
	mutations: {
		cache_increment (state, {key:type, value:dictList}) {
			state.cacheObj[type] = dictList;
		}
	},
	actions: {
	}
}