import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Smile, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI wellness companion. I'm here to listen and support you through any stress, anxiety, or challenges you're facing. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Stress-related responses
    if (message.includes('stress') || message.includes('overwhelmed')) {
      return "I understand you're feeling stressed. That's completely normal, especially with everything you have going on. Try taking three deep breaths with me: breathe in for 4 seconds, hold for 4, and exhale for 6. What's causing you the most stress right now?";
    }
    
    // Anxiety responses
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried')) {
      return "Anxiety can feel overwhelming, but you're not alone in this. Remember that anxiety is your mind's way of trying to protect you, even when there's no real danger. Try grounding yourself: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. What specifically is making you feel anxious?";
    }
    
    // Study-related issues
    if (message.includes('study') || message.includes('exam') || message.includes('school') || message.includes('homework')) {
      return "Academic pressure can be really challenging. Remember that your worth isn't determined by your grades. Try breaking large tasks into smaller, manageable steps. The Pomodoro technique (25 minutes of focused study, then 5 minutes break) can be really helpful. What subject or assignment is giving you the most trouble?";
    }
    
    // Depression/sadness
    if (message.includes('sad') || message.includes('depressed') || message.includes('down') || message.includes('lonely')) {
      return "I'm sorry you're feeling this way. Your feelings are valid, and it's okay to not be okay sometimes. Remember that difficult emotions are temporary, even when they don't feel like it. Have you been able to connect with friends or family recently? Sometimes talking to someone you trust can help lighten the load.";
    }
    
    // Sleep issues
    if (message.includes('sleep') || message.includes('tired') || message.includes('exhausted') || message.includes('insomnia')) {
      return "Sleep issues can really affect your mental health. Try creating a calming bedtime routine: put devices away 1 hour before bed, try reading or gentle stretching, and keep your room cool and dark. If your mind is racing, try writing down your thoughts in a journal. How many hours of sleep are you typically getting?";
    }
    
    // Positive responses
    if (message.includes('good') || message.includes('great') || message.includes('happy') || message.includes('better')) {
      return "That's wonderful to hear! I'm so glad you're feeling positive. It's important to acknowledge and celebrate these good moments. What's been going well for you lately? Remember this feeling during tougher times.";
    }
    
    // Relationship issues
    if (message.includes('friend') || message.includes('relationship') || message.includes('family') || message.includes('conflict')) {
      return "Relationship challenges can be really difficult. Remember that healthy communication involves listening as much as speaking. It's okay to set boundaries, and it's okay to take time to cool down before addressing conflicts. What's been happening in your relationships that's bothering you?";
    }
    
    // General supportive responses
    const generalResponses = [
      "Thank you for sharing that with me. Your feelings are completely valid. Can you tell me more about what you're experiencing?",
      "I hear you, and I want you to know that you're not alone in feeling this way. Many students face similar challenges. What would feel most helpful to you right now?",
      "It sounds like you're going through a lot right now. Remember that it's okay to take things one step at a time. What's one small thing that might help you feel a bit better today?",
      "I appreciate you opening up to me. Sometimes just talking about what we're feeling can help. Is there anything specific that triggered these feelings recently?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AI Wellness Support</h1>
            <p className="text-gray-500">Your personal mental health companion</p>
          </div>
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
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                  : 'bg-gradient-to-r from-purple-400 to-pink-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="text-white" size={16} />
                ) : (
                  <Bot className="text-white" size={16} />
                )}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                  : 'bg-white shadow-md text-gray-800'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={16} />
              </div>
              <div className="bg-white shadow-md px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Response Buttons */}
      <div className="px-6 py-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { text: "I'm feeling stressed", icon: Zap },
            { text: "I'm anxious about exams", icon: Heart },
            { text: "I'm feeling better today", icon: Smile }
          ].map((quick, index) => {
            const Icon = quick.icon;
            return (
              <button
                key={index}
                onClick={() => setInputText(quick.text)}
                className="flex items-center space-x-2 px-3 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Icon size={14} />
                <span>{quick.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-6">
        <div className="flex space-x-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Remember: This is AI support, not professional therapy. For urgent help, contact a licensed professional.
        </p>
      </div>
    </div>
  );
};

export default AIChat;