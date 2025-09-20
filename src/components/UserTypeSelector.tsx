import React from 'react';
import { User, UserCheck, Heart, GraduationCap } from 'lucide-react';

type UserType = 'user' | 'therapist';

interface UserTypeSelectorProps {
  onSelectUserType: (type: UserType) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ onSelectUserType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MindEase</h1>
          <p className="text-xl text-gray-600 mb-2">AI-Powered Youth Mental Wellness Platform</p>
          <p className="text-gray-500">Choose your role to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Student/User Option */}
          <div
            onClick={() => onSelectUserType('user')}
            className="group cursor-pointer p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <User className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Student</h2>
              <p className="text-gray-600 mb-6">
                Access AI support, peer chat, mood-based therapy, art therapy, and connect with licensed therapists
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <Heart size={16} className="text-red-400" />
                  <span>Mental wellness support</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <User size={16} className="text-blue-400" />
                  <span>Anonymous peer support</span>
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-semibold hover:from-green-500 hover:to-blue-600 transition-all duration-200">
                Continue as Student
              </button>
            </div>
          </div>

          {/* Therapist Option */}
          <div
            onClick={() => onSelectUserType('therapist')}
            className="group cursor-pointer p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Therapist</h2>
              <p className="text-gray-600 mb-6">
                Join our internship program, connect with students, track sessions, and earn certificates
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <GraduationCap size={16} className="text-purple-400" />
                  <span>Internship opportunities</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <UserCheck size={16} className="text-pink-400" />
                  <span>Professional certification</span>
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all duration-200">
                Continue as Therapist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;