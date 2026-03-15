import { useState, useEffect, useRef } from 'react'

interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  error: string | null
  isLoading: boolean
}

export function useAudioPlayer(audioUrl: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    error: null,
    isLoading: true,
  })

  useEffect(() => {
    const audio = new Audio(audioUrl)
    audioRef.current = audio

    // Reset state for new audio source
    setState(prev => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      error: null,
      isLoading: true,
    }))

    const updateTime = () => {
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }))
    }

    const handleLoaded = () => {
      setState(prev => ({
        ...prev,
        duration: audio.duration || 0,
        isLoading: false,
        error: null,
      }))
    }

    const handleEnd = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }))
    }

    const handleError = () => {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: 'Failed to load audio. Please check the URL and try again.',
      }))
    }

    const handleCanPlay = () => {
      setState(prev => ({ ...prev, isLoading: false }))
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', handleLoaded)
    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('ended', handleEnd)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', handleLoaded)
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('ended', handleEnd)
      audio.removeEventListener('error', handleError)
      audio.pause()
    }
  }, [audioUrl])

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setState(prev => ({ ...prev, isPlaying: true, error: null }))
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Playback failed'
        setState(prev => ({
          ...prev,
          isPlaying: false,
          error: `Cannot play audio: ${message}`,
        }))
      }
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  const togglePlay = () => {
    if (state.isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setState(prev => ({ ...prev, currentTime: time }))
    }
  }

  const setVolume = (volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume))
    if (audioRef.current) {
      audioRef.current.volume = clamped
      setState(prev => ({ ...prev, volume: clamped }))
    }
  }

  return {
    ...state,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
  }
}
