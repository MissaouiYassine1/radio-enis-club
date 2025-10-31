'use client';

import React from 'react';
import { AudioProvider } from '../context/AudioContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Player from '../components/Player';
import { useTheme } from '../hooks/useTheme';

const MainLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <AudioProvider>
      <div className={`min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 ${theme}`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <Player />
      </div>
    </AudioProvider>
  );
};

export default MainLayout;