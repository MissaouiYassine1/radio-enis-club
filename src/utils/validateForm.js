/**
 * Valide un formulaire de contact
 * @param {Object} data - Données du formulaire
 * @returns {Object} Erreurs de validation
 */
export const validateContactForm = (data) => {
  const errors = {};

  // Validation du nom
  if (!data.name?.trim()) {
    errors.name = 'Le nom est requis';
  } else if (data.name.length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }

  // Validation de l'email
  if (!data.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }

  // Validation du sujet
  if (!data.subject?.trim()) {
    errors.subject = 'Le sujet est requis';
  } else if (data.subject.length < 5) {
    errors.subject = 'Le sujet doit contenir au moins 5 caractères';
  }

  // Validation du message
  if (!data.message?.trim()) {
    errors.message = 'Le message est requis';
  } else if (data.message.length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  }

  return errors;
};

/**
 * Valide un email
 * @param {string} email - Email à valider
 * @returns {boolean} True si l'email est valide
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un formulaire d'événement
 * @param {Object} data - Données de l'événement
 * @returns {Object} Erreurs de validation
 */
export const validateEventForm = (data) => {
  const errors = {};

  // Validation du titre
  if (!data.title?.trim()) {
    errors.title = 'Le titre est requis';
  } else if (data.title.length < 5) {
    errors.title = 'Le titre doit contenir au moins 5 caractères';
  }

  // Validation de la description
  if (!data.description?.trim()) {
    errors.description = 'La description est requise';
  } else if (data.description.length < 10) {
    errors.description = 'La description doit contenir au moins 10 caractères';
  }

  // Validation de la date
  if (!data.date) {
    errors.date = 'La date est requise';
  } else {
    const eventDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      errors.date = 'La date ne peut pas être dans le passé';
    }
  }

  // Validation du lieu
  if (!data.location?.trim()) {
    errors.location = 'Le lieu est requis';
  }

  return errors;
};