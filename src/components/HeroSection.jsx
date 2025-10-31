import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { Play, Calendar, Users } from 'lucide-react';
import Image from "next/image";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 dark:from-dark-900 dark:to-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-800 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-primary-600 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              En direct maintenant
            </span>
          </motion.div>

          {/* Titre principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Radio{' '}
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              ENIS
            </span>
            {/* Logo centré */}
                  <div className="flex justify-center items-center my-12">
                    <Image
                      src="/images/logo-enis-radio.png"
                      alt="Logo Radio ENIS"
                      width={200}
                      height={200}
                    />
                  </div>
          </h1>

          {/* Sous-titre */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La voix des étudiants de l'ENIS. Découvrez nos émissions, 
            événements culturels et l'actualité du campus en direct.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Écouter en direct</span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Voir les événements</span>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Users, label: 'Membres actifs', value: '50+' },
              { icon: Play, label: 'Émissions', value: '20+' },
              { icon: Calendar, label: 'Événements/mois', value: '5+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-dark-700/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;