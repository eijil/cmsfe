import { expect, test } from 'vitest'
import { getEnv } from './env'

test('test env is facebook', () => {
  const ua =
    'Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SQ3A.220705.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/125.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/407.0.0.0.65;] Edg/125.0.0.0'
  const { isFB, isMobile } = getEnv(ua)
  expect(isFB).toBe(true)
  expect(isMobile).toBe(true)
})

test('test env is in IOS', () => {
  const ua =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/125.0.0.0'
  const { isMobile, isAndroid, isIOS } = getEnv(ua)
  expect(isMobile).toBe(true)
  expect(isAndroid).toBe(false)
  expect(isIOS).toBe(true)
})
