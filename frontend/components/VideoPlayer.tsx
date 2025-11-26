'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Zap } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string
  title: string
  duration?: number
}

export default function VideoPlayer({ videoUrl, title, duration = 0 }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    video.addEventListener('timeupdate', updateTime)
    return () => video.removeEventListener('timeupdate', updateTime)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handlePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full bg-black rounded-xl overflow-hidden group">
      <div className="relative bg-gray-900">
        <video
          ref={videoRef}
          className="w-full aspect-video bg-black"
          src={videoUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all">
            <button onClick={togglePlay} className="bg-white/80 hover:bg-white p-4 rounded-full transition-all">
              <Play className="w-8 h-8 text-black fill-black" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full h-1 bg-gray-600 rounded-full cursor-pointer group/bar">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <button onClick={toggleMute} className="text-white hover:scale-110 transition-transform">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Playback Speed */}
              <select 
                value={playbackRate} 
                onChange={(e) => handlePlaybackRate(parseFloat(e.target.value))}
                className="bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600 transition-all"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>

              <button onClick={toggleFullscreen} className="text-white hover:scale-110 transition-transform">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>HD Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}
