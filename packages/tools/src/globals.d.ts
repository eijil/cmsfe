export {}

declare global {
   interface Window {
     nativeCallback: (res: any) => void
     webkit: any
     Android: any
   }
}