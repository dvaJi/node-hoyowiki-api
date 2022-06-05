/*
 * Copyright (c) 2020-2022 原神資訊站 Genshin Impact Info
 * https://genshininfo.reh.tw/
 *
 * Developed by 旋風之音 GoneTone
 * https://github.com/GoneTone
 *
 *                               _oo0oo_
 *                              o8888888o
 *                              88" . "88
 *                              (| -_- |)
 *                              0\  =  /0
 *                            ___/`---'\___
 *                          .' \\|     |# '.
 *                         / \\|||  :  |||# \
 *                        / _||||| -:- |||||- \
 *                       |   | \\\  -  #/ |   |
 *                       | \_|  ''\---/''  |_/ |
 *                       \  .-\__  '-'  ___/-. /
 *                     ___'. .'  /--.--\  `. .'___
 *                  ."" '<  `.___\_<|>_/___.' >' "".
 *                 | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *                 \  \ `_.   \_ __\ /__ _/   .-` /  /
 *             =====`-.____`.___ \_____/___.-`___.-'=====
 *                               `=---='
 *           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *               佛祖保佑                       永無 BUG
 *
 * GitHub: https://github.com/GoneTone/node-hoyowiki-api
 */

import { axiosInstance } from '../utils/api'
import { EntryPageMenu } from '../utils/constants'
import type { EntryPageListData, EntryPageDataOptions } from '../interfaces/EntryPageListDataInterface'
import type * as EntryPageListDataArtifactAPIInterface from '../interfaces/EntryPageListDataArtifactAPIInterface'

export class Artifact implements EntryPageListData {
  /**
   * @param {EntryPageDataOptions | undefined} options
   *
   * @returns {Promise<EntryPageListDataArtifactAPIInterface.Data>}
   */
  public async get (options?: EntryPageDataOptions): Promise<EntryPageListDataArtifactAPIInterface.Data> {
    const response = await axiosInstance.post('/get_entry_page_list', {
      filters: options?.filters ?? [],
      menu_id: EntryPageMenu.Artifact,
      page_num: options?.pageNum ?? 1,
      page_size: options?.pageSize ?? 30,
      use_es: true
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.data?.retcode === 0) return response.data.data

    throw new Error('Unable to get data.')
  }

  /**
   * @param {EntryPageDataOptions | undefined} options
   *
   * @returns {Promise<EntryPageListDataArtifactAPIInterface.List[]>}
   *
   * @private
   */
  private async getListConcat (options?: EntryPageDataOptions): Promise<EntryPageListDataArtifactAPIInterface.List[]> {
    const data = await this.get(options)

    if (data.list.length === 0) return []

    const dataNext = await this.getListConcat({
      pageNum: options?.pageNum ? options.pageNum + 1 : 2,
      pageSize: options?.pageSize ?? 30,
      filters: options?.filters ?? []
    })

    return [...data.list, ...dataNext]
  }

  /**
   * Get Artifact Entry Page Data List.
   *
   * @param {string[]} filters
   *
   * @returns {Promise<EntryPageListDataArtifactAPIInterface.List[]>}
   */
  public async getList (...filters: string[]): Promise<EntryPageListDataArtifactAPIInterface.List[]> {
    return await this.getListConcat({
      filters
    })
  }

  /**
   * Get Artifact Entry Page Data Total.
   *
   * @param {string[]} filters
   *
   * @returns {Promise<number>}
   */
  public async getTotal (...filters: string[]): Promise<number> {
    const data = await this.get({
      pageNum: 1,
      pageSize: 0,
      filters
    })

    return Number(data.total)
  }

  /**
   * Search List By Artifact Name.
   *
   * @param {string} name Artifact Name
   *
   * @returns {Promise<EntryPageListDataArtifactAPIInterface.List[]>}
   */
  public async searchListByName (name: string): Promise<EntryPageListDataArtifactAPIInterface.List[]> {
    const data = await this.getList()
    return data.filter(item => item.name === name)
  }
}
