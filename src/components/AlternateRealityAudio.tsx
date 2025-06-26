import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AlternateRealityAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // Auto-play on component mount
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setShowVolumeSlider(false);
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleMouseEnter = () => {
    if (isPlaying) {
      setShowVolumeSlider(true);
    }
  };

  const handleMouseLeave = () => {
    setShowVolumeSlider(false);
  };

  return (
    <>
      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
      >
        <source 
          src="https://res.cloudinary.com/dvrfzlgsg/video/upload/v1748341883/AudioCutter_Space_Ambient_Music___INTERSTELLAR_SPACE_JOURNEY___1_1_tc3pkt.mp3" 
          type="audio/mpeg" 
        />
        <source 
          src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" 
          type="audio/wav" 
        />
        Your browser does not support the audio element.
      </audio>

      {/* Fixed Audio Control Button and Volume Slider */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Volume Slider - Only show when playing and hovering */}
        <div className={`bg-black/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-600/50 transform transition-all duration-300 ease-in-out ${
          showVolumeSlider && isPlaying ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        }`}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
            style={{
              background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
            }}
          />
        </div>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className="bg-black/90 hover:bg-gray-900 backdrop-blur-sm text-white p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-600/50 group relative hover:scale-110"
          aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          
          {/* Subtle glow effect when playing */}
          <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isPlaying ? 'bg-white/20 opacity-100' : 'opacity-0'
          } blur-md -z-10`}></div>
          
          {/* Pulse animation when playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75"></div>
          )}
        </button>
      </div>
    </>
  );
};

export default AlternateRealityAudio;