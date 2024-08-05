'use strict'

import { UAParser } from 'ua-parser-js'

// 导出获取环境函数
export const getEnv = (userAgent?: string) => {
  // 获取userAgent
  userAgent = userAgent
    ? userAgent
    : typeof window !== 'undefined'
      ? window.navigator.userAgent
      : ''
  // 创建UAParser
  const uaParser = UAParser(userAgent)

  const { device, ua, os } = uaParser
  // 返回环境信息
  return {
    uaParser,
    isMobile: device.type === 'mobile',
    isFB: isFB(ua),
    isAndroid: os.name === 'Android',
    isIOS: os.name === 'iOS',
    isTablet: device.type === 'tablet',
    isMac: os.name === 'Mac OS',
    isApp: location.search.includes('rsApp'),
    
  }
}

/*
 * 判断是否是FB
 */
export const isFB = (ua: string) => {
  // 判断ua中是否包含FB相关字符串
  return /FBAN|FBAV|FB_IAB|FB_IABV_SIMULATOR/.test(ua)
}
