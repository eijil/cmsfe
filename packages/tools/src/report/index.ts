import { nanoid } from 'nanoid'

import pako from 'pako'
import { getEnv } from '../env'
import { Buffer } from 'buffer'
import { IParams, IReportParam, IEventReportParam } from './interface'


const env = getEnv()

/** 记录上报过的id */
let reported: any = {}

class ReportSDK {
  private VERSION: string
  private APP_ID: string
  private CHANNEL_ID: string
  private PACKAGE_NAME: string
  private REPORT_API: string

  private static instance: ReportSDK

  private constructor(params: IParams) {
    this.REPORT_API = params.reportAPI
    this.VERSION = params.version
    this.APP_ID = params.appId
    this.CHANNEL_ID = params.channelId
    this.PACKAGE_NAME = params.packageName || 'h5'
  }

  public static getInstance(params: IParams): ReportSDK {
    if (!ReportSDK.instance) {
      ReportSDK.instance = new ReportSDK(params)
    }
    return ReportSDK.instance
  }

  /**
   * 通用上报
   * @param param
   */
  public eventReport(
    { event_name, sub_event_name, properties, ctime }: IEventReportParam,
    key?: string
  ): void {
    if (key && reported[key]) {
      return
    }
    const data = {
      _event_name: event_name,
      _sub_event_name: sub_event_name,
      properties,
    }
    try {
      this.reportHandle(data, ctime)
    } catch (e) {
      console.log('上报失败', e)
    }
    if (key) {
      reported[key] = true
    }
  }

  /**
   * 加载页面上报
   * @param {string} pageName 当前路由名
   * @param {string} prePageName 前路由名
   * @param {string} url 页面路径
   * @param {string} _scene_name 场景
   */
  public pageEnter(params: {
    _page_name: string
    _pre_page_name: string
    _url: string
    project_id?: number
    project_info?: any
  }) {
    this.reportHandle({
      _event_name: 'm_page_enter',
      properties: {
        ...params,
        _referrer_url: document?.referrer,
      },
    })
  }

  /**
   * 应用安装激活
   */
  public installReport() {
    const { uaParser } = env

    let category = ''
    if (env.isMobile) {
      category = 'phone'
    } else if (env.isTablet) {
      category = 'tablet'
    } else if (env.isMac) {
      category = 'mac'
    } else {
      category = 'pc'
    }

    if (!localStorage.getItem('_app_install_id')) {
      this.reportHandle({
        _event_name: 'm_app_install',
        properties: {
          _device_brand: '', // 拿不到就是空
          _device_model: '', // 拿不到就是空
          _device_screen_h: window.screen.height,
          _device_screen_w: window.screen.width,
          _device_ram: 0, // 拿不到就是空
          _device_lang: 'en',
          _device_category: category, //设备类型 phone/tablet/pc/mac/
          browser_brand: uaParser.browser.name,
          browser_version: uaParser.browser.version,
          _ua: navigator.userAgent,
          _url: window.location.href,
          _referrer_url: document?.referrer,
        },
      })
    }
  }

  private getBaseInfo() {
    const { uaParser } = env
    const _os_type = uaParser.os.name ? uaParser.os.name.toLowerCase() : ''

    const baseInfo = {
      _app_id: this.APP_ID,
      _app_channel_id: this.CHANNEL_ID,
      _app_version: this.VERSION,
      _package_name: this.PACKAGE_NAME,
      _app_game_version: '', // 传空
      _app_res_version: '', // 传空
      _app_install_id: localStorage.getItem('_app_install_id') || '', // install_id
      _app_activate_id: sessionStorage.getItem('_app_activate_id') || '', // 3.5 run_id
      _device_id: '', // 传空
      _ad_id: '', // 传空
      _androidid: '', // 传空
      _idfv: '', // 传空
      _os_type, // 获取平台id
      _os_version: '', // 有就报，没有就报空
      _os_timezone_offset: `utc_offset=-8:00`,
      _os_timestamp: Math.floor(new Date().getTime() / 1000), // 3.5 ctime
      _device_network_type: 0,
      _app_user_id: localStorage.getItem('uid') || '', // uuid
      // @ts-ignore
      _app_lang: navigator?.language || navigator?.userLanguage || '', // 浏览器语言
      _event_name: '', // 之前的eid,A列的事件名称
      _sub_event_name: '', // 子事件名称， 默认传空字符串
      properties: {},
    }
    const h = new Date().getTimezoneOffset() / 60
    const m = (new Date().getTimezoneOffset() % 60).toString().padStart(2, '0')
    /** 时区 */
    baseInfo._os_timezone_offset = `utc_offset=${h}:${m}`

    /** 首次进入生成id */
    if (!localStorage.getItem('_app_install_id')) {
      const _app_install_id = nanoid()
      baseInfo._app_install_id = _app_install_id
      localStorage.setItem('_app_install_id', _app_install_id.toString())
    }
    /** 每次打开会话生成id */
    if (!sessionStorage.getItem('_app_activate_id')) {
      const _app_activate_id = nanoid()
      baseInfo._app_activate_id = _app_activate_id
      sessionStorage.setItem('_app_activate_id', _app_activate_id.toString())
    }

    return baseInfo
  }

  private reportHandle(params: IReportParam, ctime?: number) {
    const reportInfo = this.getBaseInfo()
    if (ctime) reportInfo._os_timestamp = ctime
    const data = {
      ...reportInfo,
      ...params,
    }
    this.send(data)
  }

  /**
   * 发送数据到服务端
   */
  private async send(data: any) {
    console.log('上报信息', data)

    const d = pako.deflate(JSON.stringify([data]))
    const buffer = Buffer.from(d)
    const result = await fetch(this.REPORT_API, {
      method: 'POST',
      body: buffer.toString('base64'),
    }).catch((err) => {
      console.log('上报失败', err)
    })

    return result
  }
}

export default ReportSDK
