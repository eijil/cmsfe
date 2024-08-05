export {}
declare global {
  interface Window {
    nativeCallback: (res: any) => void
    callNative: (params: any) => void
    webkit: any
    Android: any
  }
}
