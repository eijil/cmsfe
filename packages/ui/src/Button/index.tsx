'use client'
import React from 'react'
import { ReactNode } from 'react'
import { cn } from '../utils'
import './button.css'

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
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={cn('btn', `cms-btn-${type}`, `cms-btn-${size}`, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
