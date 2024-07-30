import { default as createSign } from './createSign'
export * from './aesDecrypt'

export async function requestWithSign<T>(
  url: string,
  data: Record<string, any>
): Promise<T> {
  try {
    const sign = createSign({
      test: '1',
    })

    console.log(sign)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        sign,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    // 错误处理
    console.error('Fetch error:', error)
    throw error
  }
}
