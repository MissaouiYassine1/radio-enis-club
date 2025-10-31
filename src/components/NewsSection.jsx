import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/formatDate';
import { Calendar, ArrowRight } from 'lucide-react';

// Données mock pour les actualités
const mockNews = [
  {
    id: 1,
    title: "Nouvelle émission : 'Tech Talk'",
    excerpt: "Découvrez notre nouvelle émission dédiée aux technologies émergentes et innovations du monde numérique.",
    date: "2024-01-15",
    image: "/images/news/tech-talk.jpg",
    category: "Nouvelle émission",
  },
  {
    id: 2,
    title: "Interview exclusive avec le directeur de l'ENIS",
    excerpt: "Retrouvez notre interview complète avec le directeur discutant des projets futurs de l'école.",
    date: "2024-01-10",
    image: "/images/news/interview-directeur.jpg",
    category: "Interview",
  },
  {
    id: 3,
    title: "Soirée de fin d'année réussie",
    excerpt: "Retour en images sur la magnifique soirée de fin d'année organisée par le club radio.",
    date: "2023-12-20",
    image: "/images/news/soiree-fin-annee.jpg",
    category: "Événement",
  },
];

const NewsSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Actualités & Annonces
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Restez informé des dernières nouvelles, émissions et événements du club radio.
          </p>
        </motion.div>

        {/* Grille des actualités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((news, index) => (
            <motion.article
              key={news.id}
              className="card overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-primary-500 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Badge de catégorie */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={news.date}>
                    {formatDate(news.date, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>

                {/* Titre */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {news.title}
                </h3>

                {/* Extrait */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* Lire la suite */}
                <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200">
                  <span className="text-sm">Lire la suite</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bouton Voir plus */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2">
            <span>Voir toutes les actualités</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;