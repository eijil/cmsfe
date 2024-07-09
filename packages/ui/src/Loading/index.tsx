import React from 'react'
import { cn } from '../utils'
import './loading.css'

type Fixed = {
  zIndex?: number
  opacity?: number
}

export interface LoadingProps {
  className?: string
  /**
   * @description 颜色
   * @default '#000'
   */
  color?: string
  /**
   * @description 尺寸
   * @default md
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  text?: string

  fixed?: Fixed

  style?: React.CSSProperties
}

export const Loading = (props: LoadingProps) => {
  const { className, color = '#000', fixed, size, style } = props

  return (
    <div
      className={cn('flex', fixed && 'cmsfe-loading-fixed')}
      style={{
        zIndex: fixed?.zIndex || 100,
      }}
    >
      {fixed && (
        <div
          className={cn('cmsfe-loading-mask')}
          style={{
            opacity: fixed?.opacity || 0.5,
          }}
        ></div>
      )}
      <div
        className={cn('loading loading-spinner',`loading-${size}`, className)}
        style={style}
      />
    </div>
  )
}
