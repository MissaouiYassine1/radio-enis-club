import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import { Calendar, Filter, Search, Grid, List } from 'lucide-react';

const EventsPage = () => {
  const { events, loading, filters, setFilters } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Filtrer les événements par terme de recherche
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['all', 'Événement', 'Atelier', 'Interview', 'Conférence'];
  const dateFilters = [
    { value: 'all', label: 'Tous les événements' },
    { value: 'upcoming', label: 'À venir' },
    { value: 'past', label: 'Passés' },
  ];

  return (
    <>
      <Head>
        <title>Événements - Radio ENIS</title>
        <meta 
          name="description" 
          content="Découvrez tous les événements organisés par le club radio de l'ENIS : ateliers, conférences, interviews et soirées." 
        />
      </Head>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Nos événements
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez tous les événements organisés par le club radio : ateliers, 
              conférences, interviews exclusives et soirées culturelles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="py-8 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Barre de recherche */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un événement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Filtre par catégorie */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtre par date */}
              <select
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
              >
                {dateFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {/* Mode d'affichage */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-900 text-gray-700 dark:text-gray-300'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-900 text-gray-700 dark:text-gray-300'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des événements */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {/* Résultats */}
              <div className="mb-8">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Grille des événements */}
              {filteredEvents.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }>
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <EventCard 
                        event={event} 
                        onClick={(selectedEvent) => {
                          // Navigation vers les détails de l'événement
                          console.log('Event selected:', selectedEvent);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun événement trouvé
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchTerm 
                      ? `Aucun événement ne correspond à "${searchTerm}"`
                      : 'Aucun événement ne correspond aux filtres sélectionnés'
                    }
                  </p>
                  {(searchTerm || filters.category !== 'all' || filters.date !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({ category: 'all', date: 'all' });
                      }}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                      Réinitialiser les filtres
                    </button>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default EventsPage;