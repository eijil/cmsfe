import CryptoJS from 'crypto-js'
import { decode } from 'js-base64'
import { decompressSync, strFromU8 } from 'fflate'

export function aesDecryptResponse(data: string) {
  if (!data) {
    return {}
  }
  const key = CryptoJS.enc.Utf8.parse('VvRSNGFynLBW7aCP')
  const iv = CryptoJS.enc.Utf8.parse('gLn8sxqpzyNjehDP')
  try {
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    })
    const resultDecipher = decrypted.toString(CryptoJS.enc.Base64)
    const secondDecodedText = decode(resultDecipher)
    const willDecompressString = atob(secondDecodedText)
    const charData = willDecompressString.split('').map(function (x) {
      return x.charCodeAt(0)
    })
    const binData = new Uint8Array(charData)
    const decompressed = decompressSync(binData)
    const origText = strFromU8(decompressed)
    return JSON.parse(origText)
  } catch (e) {
    console.log('aesDecryptResponse error:', e)
    return {}
  }
}
