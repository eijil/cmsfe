import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
export * from 'react-hot-toast';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'primary' | 'secondary' | 'neutral' | 'accent' | 'ghost' | 'link';
    size?: 'xs' | 'sm' | 'lg';
    disabled?: boolean;
}
declare const Button: ({ children, className, onClick, type, size, disabled, }: ButtonProps) => react_jsx_runtime.JSX.Element;

type Fixed = {
    zIndex?: number;
    opacity?: number;
};
interface LoadingProps {
    className?: string;
    /**
     * @description 颜色
     * @default '#000'
     */
    color?: string;
    /**
     * @description 尺寸
     * @default md
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    text?: string;
    fixed?: Fixed;
    style?: React.CSSProperties;
}
declare const Loading: (props: LoadingProps) => react_jsx_runtime.JSX.Element;

export { Button, Loading, type LoadingProps };
