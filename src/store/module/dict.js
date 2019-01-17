import { getDictionaryByType } from '@/api/dict'
export default {
	state: {
		dicts: {} //数据字典
	},
	getters: {
		/**
		 * 根据字典类型获取字典的下拉列表
		 */
		getDictListByType: (state) => (type) => {
			return state.dicts[type]
		},
		/**
		 * 根据字典类型和键名获取键值
		 */
		getDictValueByKey: (state) => (type, key) => {
			var dictList = state.dicts[type]
			return dictList.find((row) => row.key == key)
		}
	},
	mutations: {
		addDictList (state, {key:type, value:dictList}) {
			state.dicts[type] = dictList;
		}
	},
	actions: {
		initDictByType({ state, commit }, type) {
			type = type.filter(row => !state.dicts[row])

			return new Promise((resolve, reject) => {
				if(type.length == 0){
					resolve()
					return
				}
				getDictionaryByType(type)
				.then( jsonData => {
					for (let [key, value] of Object.entries(jsonData)) {
						commit('addDictList', {key, value})
					}
					resolve()
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}