/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 13:20:49
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 19:32:25
 * @description:
 */
import request from '@/plugin/axios'

/**
 * @description:  获取商品详情 '/api/p'
 * @param {type}
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime:
 * @return:
 * @Date: 2019-07-17 11:15:16
 */
export function getProduct (id, data) {
    return request({
        url: `/api/p/${id}`,
        method: 'get',
        hasLoading: true,
        data
    })
}
