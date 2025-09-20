import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Award, 
  Clock, 
  TrendingUp,
  Download,
  User,
  CheckCircle,
  Phone,
  Video,
  MessageCircle
} from 'lucide-react';

interface SessionRequest {
  id: string;
  studentName: string;
  requestType: 'video' | 'audio' | 'chat';
  issue: string;
  urgency: 'low' | 'medium' | 'high';
  timestamp: Date;
  status: 'pending' | 'accepted' | 'completed';
}

interface TherapistProfile {
  name: string;
  college: string;
  email: string;
  internshipDuration: string;
  startDate: Date;
  sessionsCompleted: number;
  hoursCompleted: number;
  rating: number;
}

const TherapistDashboard: React.FC = () => {
  const [profile, setProfile] = useState<TherapistProfile | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'sessions'>('overview');

  // Initialize with mock data if no profile exists
  useEffect(() => {
    const savedProfile = localStorage.getItem('mindease-therapist-profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile({
        ...parsed,
        startDate: new Date(parsed.startDate)
      });
    } else {
      setShowProfileForm(true);
    }

    // Mock session requests
    setSessionRequests([
      {
        id: '1',
        studentName: 'Anonymous Student #1',
        requestType: 'video',
        issue: 'Exam anxiety and stress management',
        urgency: 'high',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        status: 'pending'
      },
      {
        id: '2',
        studentName: 'Anonymous Student #2',
        requestType: 'chat',
        issue: 'Depression and low mood',
        urgency: 'medium',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'pending'
      },
      {
        id: '3',
        studentName: 'Anonymous Student #3',
        requestType: 'audio',
        issue: 'Social anxiety and relationship issues',
        urgency: 'low',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        status: 'accepted'
      }
    ]);
  }, []);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newProfile: TherapistProfile = {
      name: formData.get('name') as string,
      college: formData.get('college') as string,
      email: formData.get('email') as string,
      internshipDuration: formData.get('duration') as string,
      startDate: new Date(),
      sessionsCompleted: 0,
      hoursCompleted: 0,
      rating: 0
    };

    setProfile(newProfile);
    localStorage.setItem('mindease-therapist-profile', JSON.stringify(newProfile));
    setShowProfileForm(false);
  };

  const acceptRequest = (requestId: string) => {
    setSessionRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: 'accepted' }
          : request
      )
    );

    // Update profile stats
    if (profile) {
      const updatedProfile = {
        ...profile,
        sessionsCompleted: profile.sessionsCompleted + 1,
        hoursCompleted: profile.hoursCompleted + 1,
        rating: Math.min(5, profile.rating + 0.1)
      };
      setProfile(updatedProfile);
      localStorage.setItem('mindease-therapist-profile', JSON.stringify(updatedProfile));
    }
  };

  const generateCertificate = () => {
    if (!profile) return;

    const monthsCompleted = Math.floor(
      (new Date().getTime() - profile.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    if (monthsCompleted < 1) {
      alert('Certificate will be available after completing 1 month of internship');
      return;
    }

    // Mock certificate generation
    const certificateData = {
      therapistName: profile.name,
      college: profile.college,
      completionDate: new Date().toLocaleDateString(),
      sessionsCompleted: profile.sessionsCompleted,
      hoursCompleted: profile.hoursCompleted,
      rating: profile.rating.toFixed(1)
    };

    // In a real app, this would generate a PDF
    alert(`Certificate Generated!\n\nTherapist: ${certificateData.therapistName}\nCollege: ${certificateData.college}\nSessions: ${certificateData.sessionsCompleted}\nHours: ${certificateData.hoursCompleted}\nRating: ${certificateData.rating}/5`);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'audio': return <Phone size={16} />;
      case 'chat': return <MessageCircle size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  if (showProfileForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Therapist Registration</h1>
            <p className="text-gray-600">Join our internship program</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College/University</label>
              <input
                type="text"
                name="college"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your educational institution"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Desired Internship Duration</label>
              <select
                name="duration"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select duration</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
            >
              Start Internship
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <UserCheck className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {profile.name}</h1>
              <p className="text-gray-600">{profile.college} • Intern Therapist</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'requests', label: 'Session Requests', icon: MessageSquare },
              { id: 'sessions', label: 'My Sessions', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:bg-white hover:bg-opacity-50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{profile.sessionsCompleted}</h3>
                    <p className="text-gray-600">Sessions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{profile.hoursCompleted}</h3>
                    <p className="text-gray-600">Hours</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{profile.rating.toFixed(1)}</h3>
                    <p className="text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {sessionRequests.filter(r => r.status === 'pending').length}
                    </h3>
                    <p className="text-gray-600">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress & Certificate */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Internship Progress</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Sessions Completed</span>
                      <span className="font-semibold">{profile.sessionsCompleted}/50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((profile.sessionsCompleted / 50) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Time Invested</span>
                      <span className="font-semibold">{profile.hoursCompleted}/100 hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((profile.hoursCompleted / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Certificate</h2>
                <p className="text-gray-600 mb-4">
                  Complete your internship to earn an official certificate of completion.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
                  <p className="text-purple-800 text-sm">
                    <strong>Requirements:</strong> 1 month minimum duration, 20+ sessions, 4.0+ rating
                  </p>
                </div>
                <button
                  onClick={generateCertificate}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                >
                  <Download size={16} />
                  <span>Generate Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Session Requests</h2>
            <div className="space-y-4">
              {sessionRequests.filter(r => r.status === 'pending').map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="text-gray-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{request.studentName}</h3>
                        <p className="text-gray-600 text-sm">
                          {request.timestamp.toLocaleDateString()} at {request.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {getRequestIcon(request.requestType)}
                        <span className="text-sm capitalize">{request.requestType}</span>
                      </div>
                      <div className={`px-3 py-1 border rounded-full text-xs font-medium capitalize ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Issue Description:</h4>
                    <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{request.issue}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => acceptRequest(request.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle size={16} />
                      <span>Accept & Start Session</span>
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
              
              {sessionRequests.filter(r => r.status === 'pending').length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">No pending session requests</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Sessions</h2>
            <div className="space-y-4">
              {sessionRequests.filter(r => r.status === 'accepted' || r.status === 'completed').map((session) => (
                <div key={session.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{session.studentName}</h3>
                        <p className="text-gray-600 text-sm">{session.issue}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600 capitalize">{session.status}</p>
                      <p className="text-sm text-gray-500">
                        {session.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {sessionRequests.filter(r => r.status !== 'pending').length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">No completed sessions yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistDashboard;