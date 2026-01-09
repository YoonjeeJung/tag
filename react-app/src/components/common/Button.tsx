import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'save' | 'cancel' | 'nav' | 'delete';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
