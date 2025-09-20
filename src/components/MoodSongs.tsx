import React, { useState } from 'react';
import { Music, Play, Pause, Heart, Smile, Frown, Zap, Coffee, Sun } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  embedId: string;
  mood: string;
}

interface MoodOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  description: string;
}

const MoodSongs: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [currentSong, setCurrentSong] = useState<string>('');

  const moodOptions: MoodOption[] = [
    {
      id: 'stressed',
      label: 'Stressed',
      icon: Zap,
      color: 'from-red-400 to-orange-500',
      description: 'Calming music to ease stress and tension'
    },
    {
      id: 'anxious',
      label: 'Anxious',
      icon: Heart,
      color: 'from-yellow-400 to-orange-500',
      description: 'Soothing melodies to reduce anxiety'
    },
    {
      id: 'sad',
      label: 'Sad',
      icon: Frown,
      color: 'from-blue-400 to-indigo-500',
      description: 'Gentle music to uplift your spirits'
    },
    {
      id: 'happy',
      label: 'Happy',
      icon: Smile,
      color: 'from-green-400 to-blue-500',
      description: 'Upbeat songs to celebrate your mood'
    },
    {
      id: 'energetic',
      label: 'Need Energy',
      icon: Coffee,
      color: 'from-purple-400 to-pink-500',
      description: 'Motivating tracks to boost your energy'
    },
    {
      id: 'peaceful',
      label: 'Want Peace',
      icon: Sun,
      color: 'from-teal-400 to-cyan-500',
      description: 'Tranquil sounds for inner peace'
    }
  ];

  const songDatabase: Record<string, Song[]> = {
    stressed: [
      { id: '1', title: 'Weightless', artist: 'Marconi Union', duration: '8:08', embedId: 'UfcAVejslrU', mood: 'stressed' },
      { id: '2', title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:00', embedId: 'CvFH_6DNRCY', mood: 'stressed' },
      { id: '3', title: 'River Flows in You', artist: 'Yiruma', duration: '3:37', embedId: '7maJOI3QMu0', mood: 'stressed' },
      { id: '4', title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', duration: '8:00', embedId: 'TJ6Mzvh3XCc', mood: 'stressed' }
    ],
    anxious: [
      { id: '5', title: 'Max Richter - Sleep', artist: 'Max Richter', duration: '8:22', embedId: 'rVN1B-tUpgs', mood: 'anxious' },
      { id: '6', title: 'Gymnopédie No.1', artist: 'Erik Satie', duration: '3:33', embedId: 'S-Xm7s9eGM0', mood: 'anxious' },
      { id: '7', title: 'Porcelain', artist: 'Moby', duration: '4:01', embedId: 'IJWlBfo5Oj0', mood: 'anxious' },
      { id: '8', title: 'Nuvole Bianche', artist: 'Ludovico Einaudi', duration: '5:57', embedId: 'kcihcYEOeic', mood: 'anxious' }
    ],
    sad: [
      { id: '9', title: 'Mad World', artist: 'Gary Jules', duration: '3:07', embedId: '4N3N1MlvVc4', mood: 'sad' },
      { id: '10', title: 'The Night We Met', artist: 'Lord Huron', duration: '3:28', embedId: 'KUtdNSXCy0A', mood: 'sad' },
      { id: '11', title: 'Hurt', artist: 'Johnny Cash', duration: '3:38', embedId: '8AHCfZTRGiI', mood: 'sad' },
      { id: '12', title: 'Hallelujah', artist: 'Jeff Buckley', duration: '6:53', embedId: 'y8AWFf7EAc4', mood: 'sad' }
    ],
    happy: [
      { id: '13', title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', embedId: 'ZbZSe6N_BXs', mood: 'happy' },
      { id: '14', title: 'Good as Hell', artist: 'Lizzo', duration: '2:39', embedId: 'SmbmeOgWsqE', mood: 'happy' },
      { id: '15', title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', duration: '3:56', embedId: 'ru0K8uYEZWw', mood: 'happy' },
      { id: '16', title: 'Walking on Sunshine', artist: 'Katrina and the Waves', duration: '3:58', embedId: 'iPUmE-tne5U', mood: 'happy' }
    ],
    energetic: [
      { id: '17', title: 'Thunder', artist: 'Imagine Dragons', duration: '3:07', embedId: 'fKopy74weus', mood: 'energetic' },
      { id: '18', title: 'High Hopes', artist: 'Panic! At The Disco', duration: '3:08', embedId: 'IPXIgEAGe4U', mood: 'energetic' },
      { id: '19', title: 'Stronger', artist: 'Kelly Clarkson', duration: '3:42', embedId: 'Xn676-fLq7I', mood: 'energetic' },
      { id: '20', title: 'Roar', artist: 'Katy Perry', duration: '3:43', embedId: 'CevxZvSJLk8', mood: 'energetic' }
    ],
    peaceful: [
      { id: '21', title: 'Aqueous Transmission', artist: 'Incubus', duration: '7:49', embedId: 'eQK7KSTQfaw', mood: 'peaceful' },
      { id: '22', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', embedId: 'u7K72X4eo_s', mood: 'peaceful' },
      { id: '23', title: 'Svefn-g-englar', artist: 'Sigur Rós', duration: '10:04', embedId: 'rtemrZ7-pj0', mood: 'peaceful' },
      { id: '24', title: 'Departure', artist: 'Max Richter', duration: '2:12', embedId: 'vt0YycaDMOM', mood: 'peaceful' }
    ]
  };

  const currentSongs = selectedMood ? songDatabase[selectedMood] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Mood-Based Music Therapy</h1>
          <p className="text-xl text-gray-600">Choose your mood and let music heal your mind</p>
        </div>

        {/* Mood Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How are you feeling right now?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;
              
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    isSelected
                      ? `bg-gradient-to-r ${mood.color} text-white scale-105`
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <Icon className={`mb-4 ${isSelected ? 'text-white' : 'text-gray-600'}`} size={32} />
                    <h3 className="font-bold text-lg mb-2">{mood.label}</h3>
                    <p className={`text-sm ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                      {mood.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Song List */}
        {selectedMood && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Recommended for {moodOptions.find(m => m.id === selectedMood)?.label} Mood
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {currentSongs.map((song) => (
                <div
                  key={song.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{song.title}</h3>
                        <p className="text-gray-600">{song.artist}</p>
                        <p className="text-sm text-gray-500">{song.duration}</p>
                      </div>
                      <button
                        onClick={() => setCurrentSong(currentSong === song.id ? '' : song.id)}
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                      >
                        {currentSong === song.id ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                    </div>
                    
                    {currentSong === song.id && (
                      <div className="aspect-video bg-black rounded-xl overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${song.embedId}?autoplay=1`}
                          title={song.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Music Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How Music Helps Your Mental Health</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Reduces Stress</h3>
              <p className="text-gray-600">Music lowers cortisol levels and helps your body relax</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Boosts Mood</h3>
              <p className="text-gray-600">Releases dopamine and endorphins for natural happiness</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="text-purple-600" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Improves Focus</h3>
              <p className="text-gray-600">Enhances concentration and cognitive performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSongs;