'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '../hooks/useTheme';
import Button from './Button';
import { 
  Radio, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Home,
  Users,
  Calendar,
  Contact
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour gérer la navigation avec rafraîchissement
  const handleNavigation = (href) => {
    // Toujours fermer le menu mobile
    setIsOpen(false);
    
    // Forcer un rechargement complet si on est déjà sur la page
    if (pathname === href) {
        window.location.reload();
    }
    // Sinon, la navigation normale de Next.js fera l'affaire
  };

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Radio', href: '/radio', icon: Radio },
    { name: 'Événements', href: '/events', icon: Calendar },
    { name: 'À propos', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Contact },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              href="/" 
              passHref
              onClick={() => handleNavigation('/')}
            >
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <Radio className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Radio ENIS
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                passHref
                onClick={() => handleNavigation(item.href)}
              >
                <motion.div
                  className={`flex items-center space-x-1 cursor-pointer font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              className="!p-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              className="!p-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleMenu}
              className="!p-2"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            
            <motion.div
              className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-dark-800 z-50 md:hidden shadow-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              <div className="flex flex-col p-4 space-y-4">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    passHref
                  >
                    <motion.div
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                        pathname === item.href
                          ? 'text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-dark-700'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                      }`}
                      onClick={() => handleNavigation(item.href)}
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;