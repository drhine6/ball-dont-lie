'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

const Toggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Button
      onClick={toggleDarkMode}
      className="h-12 w-12 overflow-hidden lg:fixed absolute top-4 left-4"
    >
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={
          isDarkMode ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }
        }
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute"
      >
        <SunIcon className="h-6 w-6 text-primary" />
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={
          isDarkMode ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }
        }
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute"
      >
        <MoonIcon className="h-6 w-6 text-primary" />
      </motion.div>
    </Button>
  );
};

export default Toggle;
