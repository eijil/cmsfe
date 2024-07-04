'use client'
import React from 'react'
import { ReactNode } from 'react'
import { cn } from '../utils'

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'primary' | 'secondary' | 'neutral' | 'accent' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'lg'
  disabled?: boolean
}

export const Button = ({
  children,
  className,
  onClick,
  type,
  size,
  disabled
}: ButtonProps) => {

  const typeMap: any = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    neutral: 'btn-neutral',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    link: 'btn-link',
  }
  const sizeMap = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    lg: 'btn-lg',
  }
  const btnType = type? typeMap[type] : ''
  const btnSize = size? sizeMap[size] : ''

  return (
    <button
      className={cn('btn', btnType, btnSize, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
