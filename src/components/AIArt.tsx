import React, { useState } from 'react';
import { Palette, Download, Sparkles, Heart, Smile, Frown, Zap, Sun, Cloud } from 'lucide-react';

interface Artwork {
  id: string;
  mood: string;
  imageUrl: string;
  prompt: string;
  timestamp: Date;
}

interface MoodOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  prompt: string;
}

const AIArt: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [generatedArt, setGeneratedArt] = useState<Artwork[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const moodOptions: MoodOption[] = [
    {
      id: 'peaceful',
      label: 'Peaceful',
      icon: Sun,
      color: 'from-blue-400 to-teal-500',
      prompt: 'serene mountain landscape with calm lake'
    },
    {
      id: 'energetic',
      label: 'Energetic',
      icon: Zap,
      color: 'from-orange-400 to-red-500',
      prompt: 'vibrant sunset over ocean waves'
    },
    {
      id: 'happy',
      label: 'Happy',
      icon: Smile,
      color: 'from-yellow-400 to-orange-500',
      prompt: 'colorful meadow with butterflies and flowers'
    },
    {
      id: 'calm',
      label: 'Calm',
      icon: Cloud,
      color: 'from-gray-400 to-blue-400',
      prompt: 'misty forest with gentle morning light'
    },
    {
      id: 'hopeful',
      label: 'Hopeful',
      icon: Heart,
      color: 'from-pink-400 to-purple-500',
      prompt: 'rainbow after rain over green hills'
    },
    {
      id: 'contemplative',
      label: 'Contemplative',
      icon: Frown,
      color: 'from-indigo-400 to-purple-500',
      prompt: 'quiet library with warm golden light'
    }
  ];

  // Mock art generation with Unsplash images
  const generateArt = async () => {
    if (!selectedMood && !customPrompt) return;

    setIsGenerating(true);
    
    const mood = moodOptions.find(m => m.id === selectedMood);
    const prompt = customPrompt || mood?.prompt || 'abstract art';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Use Unsplash for mock AI-generated art based on mood
    const imageQueries = {
      peaceful: ['nature', 'zen', 'meditation', 'tranquil'],
      energetic: ['energy', 'dynamic', 'vibrant', 'powerful'],
      happy: ['joy', 'bright', 'colorful', 'celebration'],
      calm: ['minimal', 'serene', 'quiet', 'gentle'],
      hopeful: ['sunrise', 'growth', 'fresh', 'optimistic'],
      contemplative: ['reflection', 'thoughtful', 'deep', 'introspective']
    };
    
    const query = selectedMood ? imageQueries[selectedMood as keyof typeof imageQueries] || ['abstract'] : ['art'];
    const randomQuery = query[Math.floor(Math.random() * query.length)];
    const imageUrl = `https://picsum.photos/800/600?random=${Date.now()}&blur=1`;

    const newArtwork: Artwork = {
      id: Date.now().toString(),
      mood: selectedMood || 'custom',
      imageUrl,
      prompt,
      timestamp: new Date()
    };

    setGeneratedArt(prev => [newArtwork, ...prev]);
    setIsGenerating(false);
    setCustomPrompt('');
  };

  const downloadImage = (artwork: Artwork) => {
    const link = document.createElement('a');
    link.href = artwork.imageUrl;
    link.download = `mindease-art-${artwork.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Palette className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Art Therapy</h1>
          <p className="text-xl text-gray-600">Transform your emotions into beautiful, healing artwork</p>
        </div>

        {/* Mood Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose your current mood</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;
              
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    isSelected
                      ? `bg-gradient-to-r ${mood.color} text-white scale-105`
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <Icon className={`mb-2 ${isSelected ? 'text-white' : 'text-gray-600'}`} size={24} />
                    <h3 className="font-semibold">{mood.label}</h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Prompt */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Or describe what you'd like to see</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe your ideal peaceful scene..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={generateArt}
                disabled={(!selectedMood && !customPrompt) || isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Generate Art</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Generated Art Gallery */}
        {generatedArt.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Art Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedArt.map((artwork) => (
                <div
                  key={artwork.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={artwork.imageUrl}
                      alt={`AI generated art for ${artwork.mood} mood`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 capitalize">{artwork.mood} Mood</h3>
                      <button
                        onClick={() => downloadImage(artwork)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{artwork.prompt}</p>
                    <p className="text-xs text-gray-400">
                      Generated {artwork.timestamp.toLocaleDateString()} at {artwork.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Art Therapy Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Benefits of Art Therapy</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Emotional Expression</h3>
              <p className="text-gray-600 text-sm">Visual art helps express feelings that are hard to put into words</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Stress Relief</h3>
              <p className="text-gray-600 text-sm">Creating and viewing art reduces cortisol and promotes relaxation</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-purple-600" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Self-Discovery</h3>
              <p className="text-gray-600 text-sm">Art creation leads to insights about yourself and your emotions</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Mindfulness</h3>
              <p className="text-gray-600 text-sm">Focusing on art brings you into the present moment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIArt;