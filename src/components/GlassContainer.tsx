import { motion } from 'motion/react';
import React from 'react';
import { Theme } from '../types';

interface GlassContainerProps {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({ children, theme, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass ${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-[2.5rem] shadow-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
