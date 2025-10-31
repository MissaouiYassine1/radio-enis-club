/**
 * Fonction utilitaire pour les appels API
 * @param {string} url - URL de l'API
 * @param {Object} options - Options de fetch
 * @returns {Promise} Données de la réponse
 */
export const fetcher = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Gestionnaire d'erreurs pour les appels API
 * @param {Error} error - Erreur à gérer
 * @param {string} context - Contexte de l'erreur
 */
export const handleApiError = (error, context = '') => {
  console.error(`Erreur API ${context}:`, error);
  
  if (error.message.includes('404')) {
    throw new Error(`${context} non trouvé`);
  } else if (error.message.includes('500')) {
    throw new Error('Erreur serveur. Veuillez réessayer plus tard.');
  } else if (error.message.includes('Network Error')) {
    throw new Error('Erreur de connexion. Vérifiez votre connexion internet.');
  } else {
    throw new Error(`Une erreur est survenue: ${error.message}`);
  }
};

/**
 * Crée un délai artificiel (pour le développement)
 * @param {number} ms - Temps en millisecondes
 * @returns {Promise}
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));