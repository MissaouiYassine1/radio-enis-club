'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../hooks/useAudio';
import Button from './Button';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  Radio
} from 'lucide-react';

const Player = () => {
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    currentTime,
    duration,
    play,
    pause,
    setVolume,
    toggleMute,
    seek,
    initializeAudio,
  } = useAudioPlayer();

  // URL du flux radio (à remplacer par votre URL réelle)
  const streamUrl = process.env.NEXT_PUBLIC_RADIO_STREAM_URL || '/audio/live.mp3';

  // Initialiser le lecteur audio au chargement
  useEffect(() => {
    initializeAudio(streamUrl);
  }, [initializeAudio, streamUrl]);

  // Formater le temps en minutes:secondes
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Gestion du changement de volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Gestion du seek
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  // Calcul du pourcentage de progression
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Informations de la radio */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Radio className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                Radio ENIS Live
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {isPlaying ? 'En direct' : 'En pause'}
              </p>
            </div>
          </div>

          {/* Contrôles de lecture */}
          <div className="flex items-center space-x-4 flex-1 justify-center">
            <Button
              variant="primary"
              size="sm"
              onClick={isPlaying ? pause : play}
              disabled={isLoading}
              className="!px-4 !py-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="ml-2">
                {isLoading ? 'Chargement...' : isPlaying ? 'Pause' : 'Écouter'}
              </span>
            </Button>

            {/* Barre de progression (pour podcasts, pas pour le live) */}
            {duration > 0 && (
              <div className="flex items-center space-x-2 w-48">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(currentTime)}
                </span>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(duration)}
                </span>
              </div>
            )}
          </div>

          {/* Contrôle du volume */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleMute}
              className="!p-2"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <div className="w-24">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Barre de progression globale */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <motion.div
              className="bg-primary-600 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Messages d'erreur */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-xs text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Player;