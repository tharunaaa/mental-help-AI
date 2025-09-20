import React, { useState } from 'react';
import { Phone, Video, MessageCircle, Clock, Star, User, X } from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  status: 'online' | 'busy' | 'offline';
  nextAvailable: string;
  image: string;
}

const TherapistConnect: React.FC = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio' | 'chat'>('video');
  const [isConnecting, setIsConnecting] = useState(false);

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Stress Management',
      rating: 4.9,
      experience: '5 years',
      status: 'online',
      nextAvailable: 'Available now',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Depression & Mood Disorders',
      rating: 4.8,
      experience: '7 years',
      status: 'busy',
      nextAvailable: 'Available in 30 min',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Student Counseling',
      rating: 4.7,
      experience: '4 years',
      status: 'online',
      nextAvailable: 'Available now',
      image: 'https://images.unsplash.com/photo-1594824475317-48c0e7e4c0d1?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Behavioral Therapy',
      rating: 4.9,
      experience: '8 years',
      status: 'offline',
      nextAvailable: 'Tomorrow 9:00 AM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const startCall = (type: 'video' | 'audio' | 'chat') => {
    setCallType(type);
    setShowCallModal(true);
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Connect with a Therapist</h1>
          <p className="text-xl text-gray-600">Professional support when you need it most</p>
        </div>

        {/* Therapist Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {therapists.map((therapist) => (
            <div key={therapist.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(therapist.status)} rounded-full border-2 border-white`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{therapist.name}</h3>
                  <p className="text-gray-600 mb-2">{therapist.specialization}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span>{therapist.rating}</span>
                    </div>
                    <span>{therapist.experience} experience</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 ${getStatusColor(therapist.status)} rounded-full`} />
                  <span className="text-sm font-medium text-gray-700">{getStatusText(therapist.status)}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>{therapist.nextAvailable}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedTherapist(therapist);
                    startCall('video');
                  }}
                  disabled={therapist.status === 'offline'}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Video size={16} />
                  <span>Video Call</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedTherapist(therapist);
                    startCall('audio');
                  }}
                  disabled={therapist.status === 'offline'}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Phone size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedTherapist(therapist);
                    startCall('chat');
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Support */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">Emergency Support</h2>
          <p className="text-red-600 mb-4">
            If you're having thoughts of self-harm or suicide, please reach out immediately:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:988"
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <Phone size={16} />
              <span>988 Suicide & Crisis Lifeline</span>
            </a>
            <a
              href="tel:911"
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <Phone size={16} />
              <span>Emergency: 911</span>
            </a>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <button
              onClick={() => {
                setShowCallModal(false);
                setIsConnecting(false);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {isConnecting ? (
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {callType === 'video' ? <Video className="text-white" size={32} /> :
                   callType === 'audio' ? <Phone className="text-white" size={32} /> :
                   <MessageCircle className="text-white" size={32} />}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Connecting to {selectedTherapist?.name}...
                </h3>
                <p className="text-gray-600 mb-6">
                  Please wait while we establish a secure connection
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Connected to {selectedTherapist?.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  Your session is now active. This is a demo interface - in a real app, 
                  you would see the video call or chat interface here.
                </p>
                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <p className="text-gray-700">
                    Demo: {callType === 'video' ? 'Video call' : callType === 'audio' ? 'Audio call' : 'Chat'} 
                    session with {selectedTherapist?.name} would appear here with full functionality.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowCallModal(false);
                    setIsConnecting(false);
                  }}
                  className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  End Session
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistConnect;