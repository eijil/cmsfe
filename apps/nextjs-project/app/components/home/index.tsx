'use client'

import { useEffect } from "react"
import { reportSDK } from "../../lib/index"
export default function (){
  useEffect(()=>{
    reportSDK.eventReport({
      event_name: 's',
      sub_event_name: 's',
      properties: {
        test: 11,
      },
    })
  },[])
  return <>123</>

}