export {}
declare global {
  interface Window {
    webToNative: (res: any) => void
    nativeToWeb: (params: any) => void
    webkit: any
    Android: any
  }
}
