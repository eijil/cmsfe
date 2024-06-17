import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'

export function cn(...inputs: any[]) {
  return twMerge(classNames(inputs))
}
