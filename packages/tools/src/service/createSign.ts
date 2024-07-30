import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'
const SHA256Key = 'kcvc6cb509rtye898dd48feecba965e0'
const REAPublicKey =
  '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6D4CRIl6AWxOS4Pq2l7nRCNw0nCIo9l4UdbbV5h5CkL57dVjT0sDSt3DpuqUyFZnsLiQ8apy2JmmFSFISpwXW4AReBgehiLP+rivkp2DqJDE/DQTagEerlhSUZm7wgzwXBVR0U9caT7EeFso0/Laz9/gVL1ufRh++HM7Zwe2UZwIDAQAB-----END PUBLIC KEY-----'

/**
 * reelshort 发送请求签名
 */
export default function (
  params: Record<string, any>,
  baseKey: string = SHA256Key,
  reapKey: string = REAPublicKey
): string {
  const paramsArr = [
    ...Object.keys(params)
      .map((k) => {
        const value =
          typeof params[k] === 'object' ? JSON.stringify(params[k]) : params[k]
        return {
          key: k,
          value,
        }
      })
      .filter(({ key, value }) => {
        return !(
          value === '' ||
          value === null ||
          value === undefined ||
          value === 'null'
        )
      }),
  ].sort((a, b) => {
    const x1 = a.key.toUpperCase()
    const x2 = b.key.toUpperCase()
    if (x1 < x2) {
      return -1
    }
    if (x1 > x2) {
      return 1
    }
    return 0
  })

  const paramsString = paramsArr
    .map(({ key, value }) => `${key}=${value}`)
    .join('&')
  const encryptedString = CryptoJS.HmacSHA256(paramsString, baseKey).toString()
  const encrypt = new JSEncrypt({})
  encrypt.setPublicKey(reapKey)

  return encrypt.encrypt(encryptedString) || ''
}
