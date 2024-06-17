import React from 'react'
import { cn } from '../utils' // import { twMerge } from 'tailwind-merge'
import './loading.css' // import { twMerge } from 'tailwind-merge'

// import { twMerge } from 'tailwind-merge'

export interface IProps {
  type?: string
  className?: string
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  text?: string
}

export const Loading = (props: IProps) => {
  const { className, color = '#000' } = props
  const sizeMap = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  }

  const clsSize = sizeMap[props.size || 'md']

  return (
    <div className="flex items-center">
      <div className={cn(clsSize, 'loading loading-spinner', className)} />
    </div>
  )
}
