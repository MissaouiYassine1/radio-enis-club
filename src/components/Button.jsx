import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant Button réutilisable
 * @param {Object} props - Props du composant
 * @param {ReactNode} props.children - Contenu du bouton
 * @param {string} props.variant - Variante de style (primary, secondary, danger)
 * @param {string} props.size - Taille (sm, md, lg)
 * @param {boolean} props.disabled - État désactivé
 * @param {function} props.onClick - Fonction de clic
 * @param {string} props.type - Type de bouton (button, submit, reset)
 * @param {Object} props.rest - Autres props
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) => {
  // Classes de base
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variantes
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  // Tailles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;