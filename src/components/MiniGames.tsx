import React, { useState, useEffect } from 'react';
import { Gamepad2, Play, Pause, RotateCcw, Heart, Circle } from 'lucide-react';

const MiniGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string>('breathing');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gamepad2 className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Relaxing Mini Games</h1>
          <p className="text-xl text-gray-600">Simple games designed to calm your mind and reduce stress</p>
        </div>

        {/* Game Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: 'breathing', label: 'Breathing Circle', icon: Circle },
            { id: 'gratitude', label: 'Gratitude Clicker', icon: Heart }
          ].map((game) => {
            const Icon = game.icon;
            return (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-200 ${
                  activeGame === game.id
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{game.label}</span>
              </button>
            );
          })}
        </div>

        {/* Game Content */}
        {activeGame === 'breathing' && <BreathingGame />}
        {activeGame === 'gratitude' && <GratitudeClicker />}
      </div>
    </div>
  );
};

const BreathingGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [seconds, setSeconds] = useState(0);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4, next: 'hold', instruction: 'Breathe In' },
    hold: { duration: 4, next: 'exhale', instruction: 'Hold' },
    exhale: { duration: 6, next: 'pause', instruction: 'Breathe Out' },
    pause: { duration: 1, next: 'inhale', instruction: 'Pause' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev >= phases[phase].duration - 1) {
            const nextPhase = phases[phase].next as keyof typeof phases;
            setPhase(nextPhase);
            if (nextPhase === 'inhale') {
              setCycle(c => c + 1);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, phase]);

  const getCircleScale = () => {
    const progress = seconds / phases[phase].duration;
    switch (phase) {
      case 'inhale':
        return 0.5 + (progress * 0.5); // Scale from 0.5 to 1
      case 'hold':
        return 1; // Stay at full size
      case 'exhale':
        return 1 - (progress * 0.5); // Scale from 1 to 0.5
      case 'pause':
        return 0.5; // Stay at small size
      default:
        return 0.5;
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setPhase('inhale');
    setSeconds(0);
    setCycle(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">4-4-6 Breathing Exercise</h2>
      <p className="text-gray-600 mb-8">
        Follow the circle: Inhale for 4 seconds, hold for 4 seconds, exhale for 6 seconds
      </p>
      
      {/* Breathing Circle */}
      <div className="relative w-80 h-80 mx-auto mb-8">
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-transform duration-1000 ease-in-out"
          style={{ transform: `scale(${getCircleScale()})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-2xl font-bold mb-2">{phases[phase].instruction}</p>
            <p className="text-lg">{phases[phase].duration - seconds}s</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          <span>{isPlaying ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>

      <div className="text-gray-600">
        <p>Breathing Cycles Completed: <span className="font-bold text-teal-600">{cycle}</span></p>
      </div>
    </div>
  );
};

const GratitudeClicker: React.FC = () => {
  const [gratitudePoints, setGratitudePoints] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showHearts, setShowHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const gratitudeMessages = [
    "I'm grateful for my family",
    "I appreciate my friends",
    "Thank you for this beautiful day",
    "I'm thankful for my health",
    "Grateful for opportunities to learn",
    "I appreciate having food to eat",
    "Thank you for a safe place to sleep",
    "I'm grateful for music and art",
    "Thankful for moments of peace",
    "I appreciate acts of kindness",
    "Grateful for nature's beauty",
    "Thank you for new experiences"
  ];

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setGratitudePoints(prev => prev + 1);
    setCurrentMessage(gratitudeMessages[Math.floor(Math.random() * gratitudeMessages.length)]);
    
    // Add floating heart
    const newHeart = { id: Date.now(), x, y };
    setShowHearts(prev => [...prev, newHeart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setShowHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);
  };

  const reset = () => {
    setGratitudePoints(0);
    setCurrentMessage('');
    setShowHearts([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gratitude Heart Clicker</h2>
      <p className="text-gray-600 mb-8">
        Click the heart and collect gratitude points while reflecting on positive messages
      </p>
      
      {/* Game Area */}
      <div 
        className="relative w-80 h-80 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center cursor-pointer select-none overflow-hidden"
        onClick={handleClick}
      >
        {/* Main Heart */}
        <Heart 
          size={80} 
          className="text-pink-500 fill-pink-500 hover:scale-110 transition-transform duration-200" 
        />
        
        {/* Floating Hearts */}
        {showHearts.map(heart => (
          <div
            key={heart.id}
            className="absolute animate-ping"
            style={{ left: heart.x - 12, top: heart.y - 12 }}
          >
            <Heart size={24} className="text-red-500 fill-red-500" />
          </div>
        ))}
      </div>

      {/* Current Message */}
      {currentMessage && (
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-6">
          <p className="text-pink-800 font-medium">{currentMessage}</p>
        </div>
      )}

      {/* Score */}
      <div className="mb-6">
        <p className="text-2xl font-bold text-pink-600 mb-2">
          Gratitude Points: {gratitudePoints}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-pink-400 to-rose-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((gratitudePoints / 50) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Goal: 50 points to unlock a special gratitude message!
        </p>
      </div>

      {/* Special Message */}
      {gratitudePoints >= 50 && (
        <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl p-4 mb-6">
          <p className="font-bold">🎉 Amazing! You've cultivated a heart full of gratitude! 🎉</p>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={reset}
        className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 mx-auto"
      >
        <RotateCcw size={20} />
        <span>Start Over</span>
      </button>
    </div>
  );
};

export default MiniGames;