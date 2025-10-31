import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import NewsSection from '../components/NewsSection';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  const { events, loading } = useEvents();
  const upcomingEvents = events.slice(0, 3);

  return (
    <>
      <Head>
        <title>Radio ENIS - La voix des étudiants</title>
        <meta 
          name="description" 
          content="Radio ENIS - La voix des étudiants de l'ENIS. Émissions en direct, événements culturels et actualités du campus." 
        />
        <meta name="keywords" content="radio, ENIS, étudiants, émissions, événements, campus" />
        <meta property="og:title" content="Radio ENIS - La voix des étudiants" />
        <meta property="og:description" content="Découvrez nos émissions, événements culturels et l'actualité du campus en direct." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <HeroSection />

      {/* Événements à venir */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Événements à venir
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ne manquez pas nos prochains événements et activités organisés par le club radio.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>

              {upcomingEvents.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun événement à venir
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Revenez bientôt pour découvrir nos prochains événements.
                  </p>
                </motion.div>
              )}

              {upcomingEvents.length > 0 && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link href="/events">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2">
                      <span>Voir tous les événements</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section Actualités */}
      <NewsSection />

      {/* Section CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez le Club Radio
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Passionné de radio, de podcast ou simplement curieux ? Venez découvrir 
              l'univers de la radio étudiante et participez à nos activités.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                  Nous contacter
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                  En savoir plus
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;