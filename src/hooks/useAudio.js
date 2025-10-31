import { useState, useRef, useCallback } from 'react';
import { useAudio as useAudioContext } from '../context/AudioContext';

export const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    isPlaying,
    currentTrack,
    volume,
    isMuted,
    currentTime,
    duration,
    play: contextPlay,
    pause: contextPause,
    setTrack,
    setVolume: contextSetVolume,
    toggleMute: contextToggleMute,
    updateTime,
    setDuration,
  } = useAudioContext();

  // Charger une piste audio - CORRIGÉ
  const loadTrack = useCallback((trackUrl) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    setIsLoading(true);
    setError(null);

    const audio = audioRef.current;
    
    // Réinitialiser les événements
    audio.onerror = null;
    audio.onloadedmetadata = null;
    audio.ontimeupdate = null;
    audio.onended = null;

    try {
      audio.src = trackUrl;
      
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        setIsLoading(false);
      };

      audio.onerror = (e) => {
        console.error('Audio error:', e);
        setError('Impossible de charger le flux audio');
        setIsLoading(false);
      };

      audio.ontimeupdate = () => {
        updateTime(audio.currentTime);
      };

      audio.onended = () => {
        contextPause();
      };
    } catch (err) {
      setError('Erreur de configuration audio');
      setIsLoading(false);
    }
  }, [setDuration, updateTime, contextPause]);

  // Lecture - CORRIGÉ
  const play = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      // Pour les flux live, on ne peut pas toujours utiliser play() directement
      if (audioRef.current.src) {
        await audioRef.current.play();
      }
      contextPlay();
      setError(null);
    } catch (err) {
      console.error('Play error:', err);
      setError('Erreur de lecture - vérifiez la connexion');
      setIsLoading(false);
    }
  }, [contextPlay]);

  // Pause
  const pause = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    contextPause();
  }, [contextPause]);

  // Contrôle du volume
  const setVolume = useCallback((newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    contextSetVolume(newVolume);
  }, [contextSetVolume]);

  // Mute/unmute
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    contextToggleMute();
  }, [isMuted, contextToggleMute]);

  // Seek
  const seek = useCallback((time) => {
    if (audioRef.current && !isNaN(time)) {
      audioRef.current.currentTime = time;
      updateTime(time);
    }
  }, [updateTime]);

  // Initialiser le lecteur audio - CORRIGÉ
  const initializeAudio = useCallback((streamUrl) => {
    if (!streamUrl || streamUrl === '/audio/live.mp3') {
      // URL invalide ou par défaut - ne pas initialiser
      setError('URL de flux non configurée');
      setIsLoading(false);
      return;
    }

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audio = audioRef.current;
      audio.crossOrigin = 'anonymous';
      audio.preload = 'none';
      
      setTrack(streamUrl);
      loadTrack(streamUrl);
    } catch (err) {
      setError('Erreur d\'initialisation audio');
      setIsLoading(false);
    }
  }, [setTrack, loadTrack]);

  return {
    audioRef,
    isPlaying,
    isLoading,
    error,
    currentTrack,
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
    loadTrack,
  };
};