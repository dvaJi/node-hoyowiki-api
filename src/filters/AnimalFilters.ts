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
import type * as MenuFiltersAPIInterface from '../interfaces/MenuFiltersAPIInterface'

export class AnimalFilters {
  public static Type = {
    Other: '1458',
    Birds: '1471',
    Beasts: '1486',
    Fish: '1496'
  }

  public static async setFilterIds (): Promise<void> {
    const response = await axiosInstance.get('/get_menu_filters', {
      params: {
        menu_id: EntryPageMenu.Animal
      }
    })

    const filters: MenuFiltersAPIInterface.Filter[] = response.data.data.filters

    this.Type = {
      Other: filters[0]?.values[0]?.id ?? '1458',
      Birds: filters[0]?.values[1]?.id ?? '1471',
      Beasts: filters[0]?.values[2]?.id ?? '1486',
      Fish: filters[0]?.values[3]?.id ?? '1496'
    }
  }
}
