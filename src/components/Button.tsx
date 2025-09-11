'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colors, spacing, borderRadius, typography } from '@/styles';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const StyledButton = styled(motion.button)<{
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
}>`
  border: none;
  border-radius: ${borderRadius.md}px;
  font-family: inherit;
  font-weight: ${typography.bodyBold.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  text-decoration: none;
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${spacing.sm}px ${spacing.md}px;
          font-size: ${typography.caption.fontSize}px;
          line-height: ${typography.caption.lineHeight}px;
        `;
      case 'lg':
        return css`
          padding: ${spacing.md}px ${spacing.xl}px;
          font-size: ${typography.body.fontSize}px;
          line-height: ${typography.body.lineHeight}px;
        `;
      default:
        return css`
          padding: ${spacing.sm}px ${spacing.lg}px;
          font-size: ${typography.body.fontSize}px;
          line-height: ${typography.body.lineHeight}px;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background: ${colors.primary};
          color: ${colors.text};
          
          &:hover:not(:disabled) {
            background: ${colors.primaryDark};
            transform: translateY(-1px);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return css`
          background: ${colors.surface};
          color: ${colors.text};
          border: 1px solid ${colors.border};
          
          &:hover:not(:disabled) {
            background: ${colors.surfaceVariant};
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${colors.primary};
          border: 1px solid ${colors.primary};
          
          &:hover:not(:disabled) {
            background: ${colors.primary};
            color: ${colors.text};
            transform: translateY(-1px);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </StyledButton>
  );
}
