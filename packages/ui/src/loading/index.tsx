import React from 'react'
import './loading.css'

interface IProps {
  color?: string
  size?: number
}

export default function (props: IProps) {
  const styles = {
    color: props.color,
  }

  return <div className="cms-ui-loading"></div>
}
