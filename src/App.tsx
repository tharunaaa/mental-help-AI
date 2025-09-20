import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Users, 
  Music, 
  Palette, 
  Gamepad2, 
  PenTool, 
  Phone,
  Brain,
  Menu,
  X,
  User,
  UserCheck
} from 'lucide-react';

import AIChat from './components/AIChat';
import PeerChat from './components/PeerChat';
import MoodSongs from './components/MoodSongs';
import AIArt from './components/AIArt';
import MiniGames from './components/MiniGames';
import DoodleNotes from './components/DoodleNotes';
import TherapistConnect from './components/TherapistConnect';
import UserTypeSelector from './components/UserTypeSelector';
import TherapistDashboard from './components/TherapistDashboard';

type UserType = 'user' | 'therapist' | null;

type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  component: React.ComponentType;
  userType?: UserType;
};

function App() {
  const [activeItem, setActiveItem] = useState('ai-chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);

  const menuItems: MenuItem[] = [
    { id: 'ai-chat', label: 'AI Support', icon: Brain, component: AIChat, userType: 'user' },
    { id: 'peer-chat', label: 'Peer Chat', icon: Users, component: PeerChat, userType: 'user' },
    { id: 'mood-songs', label: 'Mood Songs', icon: Music, component: MoodSongs, userType: 'user' },
    { id: 'ai-art', label: 'Art Therapy', icon: Palette, component: AIArt, userType: 'user' },
    { id: 'games', label: 'Mini Games', icon: Gamepad2, component: MiniGames, userType: 'user' },
    { id: 'doodle', label: 'Doodle & Notes', icon: PenTool, component: DoodleNotes, userType: 'user' },
    { id: 'therapist', label: 'Connect Therapist', icon: Phone, component: TherapistConnect, userType: 'user' },
    { id: 'dashboard', label: 'Dashboard', icon: UserCheck, component: TherapistDashboard, userType: 'therapist' }
  ];

  const filteredMenuItems = userType ? menuItems.filter(item => item.userType === userType) : [];
  const activeComponent = menuItems.find(item => item.id === activeItem)?.component;

  useEffect(() => {
    // Set default active item based on user type
    if (userType === 'user' && !filteredMenuItems.find(item => item.id === activeItem)) {
      setActiveItem('ai-chat');
    } else if (userType === 'therapist' && !filteredMenuItems.find(item => item.id === activeItem)) {
      setActiveItem('dashboard');
    }
  }, [userType, activeItem, filteredMenuItems]);

  if (!userType) {
    return <UserTypeSelector onSelectUserType={setUserType} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MindEase</h1>
              <p className="text-sm text-gray-500 capitalize">{userType} Portal</p>
            </div>
          </div>
          
          {/* User Type Switch */}
          <button
            onClick={() => setUserType(null)}
            className="mt-4 w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600"
          >
            <User size={16} />
            <span>Switch User Type</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {activeComponent && React.createElement(activeComponent)}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;