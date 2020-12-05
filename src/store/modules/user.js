/*
 * @Author: Damom
 * @Date: 2020-12-05 10:36:36
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 10:39:03
 * @Description: file content
 */
export default {
    namespaced: true,
    state: {
    // 用户信息
        info: {}
    },
    actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
        set ({ state, dispatch }, info) {
            return new Promise(async resolve => {
                // store 赋值
                state.info = info
                // 持久化
                await dispatch(
                    'db/set',
                    {
                        dbName: 'sys',
                        path: 'user.info',
                        value: info,
                        user: true
                    },
                    { root: true }
                )
                // end
                resolve()
            })
        },
        /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
        load ({ state, dispatch }) {
            return new Promise(async resolve => {
                // store 赋值
                state.info = await dispatch(
                    'db/get',
                    {
                        dbName: 'sys',
                        path: 'user.info',
                        defaultValue: {},
                        user: true
                    },
                    { root: true }
                )
                // end
                resolve()
            })
        }
    }
}
