/**
 * Formate une date pour l'affichage
 * @param {string} dateString - Date au format ISO
 * @param {Object} options - Options de formatage
 * @returns {string} Date formatée
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Date invalide';
  }

  return date.toLocaleDateString('fr-FR', defaultOptions);
};

/**
 * Formate l'heure pour l'affichage
 * @param {string} timeString - Heure au format HH:mm
 * @returns {string} Heure formatée
 */
export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':');
  return `${hours}h${minutes}`;
};

/**
 * Calcule le temps restant jusqu'à un événement
 * @param {string} eventDate - Date de l'événement
 * @returns {string} Temps restant formaté
 */
export const getTimeRemaining = (eventDate) => {
  const now = new Date();
  const event = new Date(eventDate);
  const diff = event - now;

  if (diff < 0) {
    return 'Terminé';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `Dans ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Dans ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    return 'Aujourd\'hui';
  }
};