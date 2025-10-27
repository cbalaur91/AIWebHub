"use client"

import { useState } from 'react'
import Link from 'next/link'

interface GradientButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export const GradientButton = ({ href, children, variant = 'primary', className = '' }: GradientButtonProps) => {
  const [scale, setScale] = useState(1)
  const [innerBg, setInnerBg] = useState(variant === 'primary' ? 'rgb(5, 6, 45)' : 'rgba(255, 255, 255, 0.05)')

  const primaryStyle = {
    alignItems: 'center',
    backgroundImage: 'linear-gradient(144deg, rgb(175, 64, 255), rgb(91, 66, 243) 50%, rgb(0, 221, 235))',
    border: '0px',
    borderRadius: '8px',
    boxShadow: 'rgba(151, 65, 252, 0.2) 0px 15px 30px -5px',
    boxSizing: 'border-box' as const,
    color: 'rgb(255, 255, 255)',
    display: 'inline-flex',
    fontSize: '14px',
    justifyContent: 'center',
    lineHeight: '1em',
    maxWidth: '100%',
    minWidth: 'auto',
    padding: '3px',
    textDecoration: 'none',
    userSelect: 'none' as const,
    touchAction: 'manipulation' as const,
    whiteSpace: 'nowrap' as const,
    cursor: 'pointer',
    height: '50px',
    marginTop: '1rem',
    transform: `scale(${scale})`,
    width: 'auto',
    transition: 'transform 0.1s ease'
  }

  const secondaryStyle = {
    alignItems: 'center',
    background: innerBg,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    boxShadow: 'rgba(255, 255, 255, 0.05) 0px 1px 0px inset',
    boxSizing: 'border-box' as const,
    color: 'rgb(255, 255, 255)',
    display: 'inline-flex',
    fontSize: '14px',
    justifyContent: 'center',
    lineHeight: '1em',
    maxWidth: '100%',
    minWidth: 'auto',
    padding: '3px',
    textDecoration: 'none',
    userSelect: 'none' as const,
    touchAction: 'manipulation' as const,
    whiteSpace: 'nowrap' as const,
    cursor: 'pointer',
    height: '50px',
    marginTop: '1rem',
    transform: `scale(${scale})`,
    width: 'auto',
    transition: 'background 0.2s ease, transform 0.1s ease'
  }

  const innerSpanStyle = {
    background: innerBg,
    padding: '16px 24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'background 0.2s ease'
  }

  return (
    <Link
      href={href}
      style={variant === 'primary' ? primaryStyle : secondaryStyle}
      className={className}
      onMouseEnter={() => {
        if (variant === 'primary') {
          setInnerBg('none')
        } else {
          setInnerBg('rgba(255, 255, 255, 0.1)')
        }
      }}
      onMouseLeave={() => {
        if (variant === 'primary') {
          setInnerBg('rgb(5, 6, 45)')
        } else {
          setInnerBg('rgba(255, 255, 255, 0.05)')
        }
      }}
      onMouseDown={() => setScale(0.9)}
      onMouseUp={() => setScale(1)}
    >
      {variant === 'primary' ? (
        <span style={innerSpanStyle}>{children}</span>
      ) : (
        <span style={{ padding: '16px 24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {children}
        </span>
      )}
    </Link>
  )
}
