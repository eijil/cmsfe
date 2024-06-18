import React from 'react'
import { cn } from '../utils' // import { twMerge } from 'tailwind-merge'
import './loading.css' // import { twMerge } from 'tailwind-merge'

// import { twMerge } from 'tailwind-merge'

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
}

export const Loading = (props: LoadingProps) => {
  const { className, color = '#000', fixed } = props
  const sizeMap = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  }

  const clsSize = sizeMap[props.size || 'md']

  return (
    <div
      className={cn(
        'flex',
        fixed && 'fixed w-full h-full top-0 left-0 items-center justify-center'
      )}
      style={{
        zIndex: fixed?.zIndex || 100,
      }}
    >
      {fixed && (
        <div
          className={cn(
            'absolute top-0 left-0 w-full h-full  bg-gray-600 transition-all duration-300 ease-in-out'
          )}
          style={{
            opacity: fixed?.opacity || 0.5,
          }}
        ></div>
      )}
      <div
        className={cn(
          clsSize,
          'loading loading-spinner dark:text-blue-200',
          className
        )}
        style={{
          color: color,
        }}
      />
    </div>
  )
}


