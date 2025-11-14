import { useState, useEffect, useRef } from 'react'

interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
}

export function useAudioPlayer(audioUrl: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
  })

  useEffect(() => {
    const audio = new Audio(audioUrl)
    audioRef.current = audio

    const updateTime = () => {
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }))
    }

    const handleEnd = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }))
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateTime)
    audio.addEventListener('ended', handleEnd)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateTime)
      audio.removeEventListener('ended', handleEnd)
      audio.pause()
    }
  }, [audioUrl])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setState(prev => ({ ...prev, isPlaying: true }))
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  const togglePlay = () => {
    state.isPlaying ? pause() : play()
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setState(prev => ({ ...prev, currentTime: time }))
    }
  }

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume))
      setState(prev => ({ ...prev, volume }))
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
