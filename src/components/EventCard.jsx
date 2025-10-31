import React from 'react';
import { motion } from 'framer-motion';
import { formatDate, formatTime, getTimeRemaining } from '../utils/formatDate';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventCard = ({ event, onClick }) => {
  const {
    id,
    title,
    description,
    date,
    time,
    location,
    image,
    category,
    attendees = 0,
  } = event;

  const timeRemaining = getTimeRemaining(date);
  const isPast = timeRemaining === 'Terminé';

  return (
    <motion.div
      className="card overflow-hidden group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={() => onClick && onClick(event)}
    >
      {/* Image de l'événement */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-white opacity-80" />
        </div>
        
        {/* Badge de catégorie */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300">
            {category}
          </span>
        </div>

        {/* Badge de statut */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              isPast
                ? 'bg-gray-500 text-white'
                : 'bg-green-500 text-white'
            }`}
          >
            {timeRemaining}
          </span>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        {/* Titre */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Métadonnées */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(date)}</span>
          </div>

          {/* Heure */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span>{formatTime(time)}</span>
          </div>

          {/* Lieu */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Participants */}
          {attendees > 0 && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Users className="h-4 w-4 mr-2" />
              <span>{attendees} participants</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-200">
            Voir détails
          </button>
          
          {!isPast && (
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              S'inscrire
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;