import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '../hooks/useAudio';
import Button from '../components/Button';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Loader2,
  Radio,
  ListMusic,
  Users,
  Clock
} from 'lucide-react';

const RadioPage = () => {
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    play,
    pause,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  // Programme de la semaine (données mock)
  const schedule = [
    { day: 'Lundi', time: '18:00-20:00', show: 'Tech Talk', host: 'Karim Jlassi' },
    { day: 'Mardi', time: '17:00-19:00', show: 'Musique du Monde', host: 'Sarah Melliti' },
    { day: 'Mercredi', time: '16:00-18:00', show: 'Actualités Campus', host: 'Ahmed Ben Salah' },
    { day: 'Jeudi', time: '19:00-21:00', show: 'Débat Étudiant', host: 'Marie Dupont' },
    { day: 'Vendredi', time: '20:00-22:00', show: 'Soirée Musicale', host: 'Équipe Radio' },
    { day: 'Samedi', time: '15:00-17:00', show: 'Interview Exclusive', host: 'Invités Spéciaux' },
    { day: 'Dimanche', time: '14:00-16:00', show: 'Rediffusion', host: 'Équipe Radio' },
  ];

  // Émissions populaires
  const popularShows = [
    { title: 'Tech Talk', description: 'Les dernières innovations technologiques', listeners: 150 },
    { title: 'Musique du Monde', description: 'Découverte musicale internationale', listeners: 120 },
    { title: 'Débat Étudiant', description: 'Discussions sur les sujets actuels', listeners: 180 },
  ];

  return (
    <>
      <Head>
        <title>Radio Live - Radio ENIS</title>
        <meta 
          name="description" 
          content="Écoutez Radio ENIS en direct, découvrez notre programmation et nos émissions populaires." 
        />
      </Head>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Radio ENIS Live
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Écoutez notre diffusion en direct, découvrez nos émissions et 
                rejoignez la communauté des auditeurs de Radio ENIS.
              </p>
              
              {/* Indicateur de statut */}
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {isPlaying ? 'En direct maintenant' : 'En pause'}
                </span>
              </div>

              {/* Contrôles principaux */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={isPlaying ? pause : play}
                  disabled={isLoading}
                  className="flex items-center space-x-2 min-w-[200px] justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                  <span className="text-lg">
                    {isLoading ? 'Connexion...' : isPlaying ? 'Mettre en pause' : 'Écouter en direct'}
                  </span>
                </Button>

                {/* Contrôle du volume */}
                <div className="flex items-center space-x-3 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-lg p-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={toggleMute}
                    className="!p-2"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                  />
                </div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <motion.div
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl p-8 text-center">
                <Radio className="h-24 w-24 text-white mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  En direct sur le campus
                </h3>
                <p className="text-primary-100 mb-6">
                  Rejoignez les {isPlaying ? '85' : '0'} auditeurs actuellement connectés
                </p>
                <div className="flex justify-center space-x-4 text-primary-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-sm">Diffusion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-sm">Émissions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm">Auditeurs/semaine</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programme de la semaine */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Programme de la semaine
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez notre grille des programmes et ne manquez pas vos émissions préférées.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            {schedule.map((slot, index) => (
              <motion.div
                key={slot.day}
                className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {slot.day}
                </h3>
                <div className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                  {slot.time}
                </div>
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {slot.show}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {slot.host}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Émissions populaires */}
      <section className="py-16 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Émissions populaires
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez les émissions les plus écoutées de Radio ENIS.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularShows.map((show, index) => (
              <motion.div
                key={show.title}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <ListMusic className="h-8 w-8 text-primary-600" />
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{show.listeners}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {show.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {show.description}
                </p>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg transition-colors duration-200 font-medium">
                  Écouter l'émission
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proposer une émission
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Vous avez une idée d'émission ? Rejoignez-nous et proposez votre concept 
              d'émission à la communauté Radio ENIS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Proposer une idée
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Devenir animateur
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default RadioPage;