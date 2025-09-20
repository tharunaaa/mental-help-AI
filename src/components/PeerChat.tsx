import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, AlertTriangle, Shield, Heart, RefreshCw, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'peer';
  timestamp: Date;
  isWarning?: boolean;
}

const PeerChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [peerName] = useState(`Anonymous${Math.floor(Math.random() * 1000)}`);
  const [showWarning, setShowWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectPersonalInfo = (text: string): boolean => {
    const patterns = [
      /\b\d{10,}\b/, // Phone numbers
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
      /\b(?:my name is|i'm|call me|i am)\s+[A-Z][a-z]+\b/i, // Names
      /\b(?:instagram|facebook|twitter|snapchat|discord)\b/i, // Social media
      /\b\d{1,5}\s+[A-Za-z\s]+(?:street|st|avenue|ave|road|rd|drive|dr)\b/i // Addresses
    ];
    
    return patterns.some(pattern => pattern.test(text));
  };

  const connectToPeer = () => {
    setIsConnecting(true);
    
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      setMessages([
        {
          id: '1',
          text: `You've been connected to ${peerName}. Remember to keep personal information private and focus on sharing healing words and support. 💙`,
          sender: 'peer',
          timestamp: new Date(),
          isWarning: true
        }
      ]);
      
      // Simulate peer messages
      setTimeout(() => {
        simulatePeerMessage("Hi there! I'm going through some tough times with school stress. How are you doing?");
      }, 2000);
    }, 3000);
  };

  const simulatePeerMessage = (text: string) => {
    const peerMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'peer',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, peerMessage]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    if (detectPersonalInfo(inputText)) {
      setShowWarning(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate peer responses
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that. I can relate to what you're going through.",
        "That sounds really challenging. You're not alone in feeling this way.",
        "I appreciate you opening up. It takes courage to share your feelings.",
        "Your words really resonate with me. We'll get through this together.",
        "That's a great perspective. Thanks for the reminder to stay positive.",
        "I'm sending you positive thoughts. You're stronger than you know.",
        "This conversation is really helping me too. Thank you for being here."
      ];
      
      simulatePeerMessage(responses[Math.floor(Math.random() * responses.length)]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setIsConnected(false);
    setMessages([]);
    connectToPeer();
  };

  if (!isConnected && !isConnecting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Peer Healing Chat</h1>
          <p className="text-gray-600 mb-6">
            Connect anonymously with another person going through similar experiences. 
            Share support, healing words, and positive energy.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="text-yellow-600 mt-0.5" size={20} />
              <div className="text-left">
                <h3 className="font-semibold text-yellow-800 mb-2">Safety Guidelines</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Keep all conversations anonymous</li>
                  <li>• Don't share personal information</li>
                  <li>• Focus on healing and support</li>
                  <li>• Report inappropriate behavior</li>
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={connectToPeer}
            className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-semibold hover:from-green-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            Start Anonymous Chat
          </button>
        </div>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Users className="text-white" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connecting to a peer...</h2>
          <p className="text-gray-600 mb-6">Finding someone who can offer support and understanding</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Peer Healing Chat</h1>
              <p className="text-gray-500 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Connected to {peerName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={startNewChat}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            <RefreshCw size={16} />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.isWarning
                  ? 'bg-yellow-400'
                  : message.sender === 'user' 
                    ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                    : 'bg-gradient-to-r from-purple-400 to-pink-500'
              }`}>
                {message.isWarning ? (
                  <AlertTriangle className="text-white" size={16} />
                ) : (
                  <User className="text-white" size={16} />
                )}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                message.isWarning
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : message.sender === 'user'
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                    : 'bg-white shadow-md text-gray-800'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.isWarning ? 'text-yellow-600' :
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Healing Prompts */}
      <div className="px-6 py-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "I'm here to listen",
            "You're not alone in this",
            "Sending positive energy",
            "This too shall pass"
          ].map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInputText(prompt)}
              className="flex items-center space-x-2 px-3 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Heart size={14} />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-6">
        <div className="flex space-x-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share healing words and support..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl hover:from-green-500 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Remember: Keep conversations anonymous and focused on healing and support
        </p>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Personal Information Detected</h3>
            </div>
            <p className="text-gray-600 mb-6">
              It looks like your message contains personal information. For your safety, 
              please avoid sharing phone numbers, emails, names, or other identifying details.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowWarning(false);
                  setInputText('');
                }}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Clear Message
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Edit Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerChat;