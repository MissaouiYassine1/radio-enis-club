'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// État initial
const initialState = {
  isPlaying: false,
  currentTrack: null,
  volume: 1,
  isMuted: false,
  currentTime: 0,
  duration: 0,
};

// Actions
const AudioActions = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  SET_TRACK: 'SET_TRACK',
  SET_VOLUME: 'SET_VOLUME',
  TOGGLE_MUTE: 'TOGGLE_MUTE',
  UPDATE_TIME: 'UPDATE_TIME',
  SET_DURATION: 'SET_DURATION',
};

// Reducer
const audioReducer = (state, action) => {
  switch (action.type) {
    case AudioActions.PLAY:
      return { ...state, isPlaying: true };
    case AudioActions.PAUSE:
      return { ...state, isPlaying: false };
    case AudioActions.SET_TRACK:
      return { ...state, currentTrack: action.payload };
    case AudioActions.SET_VOLUME:
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    case AudioActions.TOGGLE_MUTE:
      return { ...state, isMuted: !state.isMuted };
    case AudioActions.UPDATE_TIME:
      return { ...state, currentTime: action.payload };
    case AudioActions.SET_DURATION:
      return { ...state, duration: action.payload };
    default:
      return state;
  }
};

// Création du contexte
const AudioContext = createContext();

// Provider
export const AudioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, initialState);

  const play = () => dispatch({ type: AudioActions.PLAY });
  const pause = () => dispatch({ type: AudioActions.PAUSE });
  const setTrack = (track) => dispatch({ type: AudioActions.SET_TRACK, payload: track });
  const setVolume = (volume) => dispatch({ type: AudioActions.SET_VOLUME, payload: volume });
  const toggleMute = () => dispatch({ type: AudioActions.TOGGLE_MUTE });
  const updateTime = (time) => dispatch({ type: AudioActions.UPDATE_TIME, payload: time });
  const setDuration = (duration) => dispatch({ type: AudioActions.SET_DURATION, payload: duration });

  // Sauvegarder le volume dans le localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('radio-volume');
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('radio-volume', state.volume.toString());
  }, [state.volume]);

  const value = {
    ...state,
    play,
    pause,
    setTrack,
    setVolume,
    toggleMute,
    updateTime,
    setDuration,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook personnalisé
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};