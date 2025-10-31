import { useState, useEffect, useCallback } from 'react';

// Données mock pour les événements
const mockEvents = [
  {
    id: 1,
    title: "Soirée de lancement de la radio",
    description: "Venez découvrir notre nouvelle station et rencontrer l'équipe !",
    date: "2024-02-15",
    time: "18:00",
    location: "Amphithéâtre ENIS",
    image: "/images/events/soiree-lancement.jpg",
    category: "Événement",
  },
  {
    id: 2,
    title: "Atelier podcast étudiant",
    description: "Apprenez à créer votre propre podcast de A à Z.",
    date: "2024-02-22",
    time: "14:00",
    location: "Studio Radio ENIS",
    image: "/images/events/atelier-podcast.jpg",
    category: "Atelier",
  },
  {
    id: 3,
    title: "Interview avec un ancien élève",
    description: "Rencontre avec un diplômé maintenant ingénieur chez Google.",
    date: "2024-03-01",
    time: "16:00",
    location: "Studio Radio ENIS",
    image: "/images/events/interview-alumni.jpg",
    category: "Interview",
  },
];

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    date: 'all',
  });

  // Charger les événements
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(mockEvents);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des événements');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Filtrer les événements
  const filteredEvents = useCallback(() => {
    return events.filter(event => {
      if (filters.category !== 'all' && event.category !== filters.category) {
        return false;
      }
      
      if (filters.date !== 'all') {
        const eventDate = new Date(event.date);
        const today = new Date();
        
        switch (filters.date) {
          case 'upcoming':
            return eventDate >= today;
          case 'past':
            return eventDate < today;
          default:
            return true;
        }
      }
      
      return true;
    });
  }, [events, filters]);

  // Ajouter un événement
  const addEvent = useCallback((newEvent) => {
    const event = {
      ...newEvent,
      id: Math.max(...events.map(e => e.id), 0) + 1,
    };
    setEvents(prev => [...prev, event]);
  }, [events]);

  // Modifier un événement
  const updateEvent = useCallback((id, updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  }, []);

  // Supprimer un événement
  const deleteEvent = useCallback((id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);

  return {
    events: filteredEvents(),
    allEvents: events,
    loading,
    error,
    filters,
    setFilters,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};