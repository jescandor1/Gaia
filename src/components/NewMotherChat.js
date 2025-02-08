import React, { useState } from 'react';
import ChatContainer from './ChatContainer';
import ChatForm from './ChatForm';
import { useChat } from '../hooks/useChat';

const NewMotherChat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isTyping, setIsTyping] = useState(false);

  const onSubmit = (e) => {
    setIsTyping(true);
    handleSubmit(e).finally(() => setIsTyping(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-purple-100">
      <div className="w-full max-w-2xl shadow-xl bg-white bg-opacity-80 rounded-lg p-6">
        <h1 className="text-2xl text-center text-purple-700 mb-4">New Mother's AI Assistant</h1>
        <ChatContainer messages={messages} />
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={onSubmit}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default NewMotherChat;
