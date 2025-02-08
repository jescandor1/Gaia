import React from 'react';

const ChatForm = ({ input, handleInputChange, handleSubmit, isTyping }) => {
  return (
    <form id="chat-form" className="flex space-x-2" onSubmit={handleSubmit}>
      <input
        type="text"
        id="user-input"
        placeholder="Ask anything about motherhood..."
        value={input}
        onChange={handleInputChange}
        className="flex-grow p-2 border border-gray-300 rounded"
        disabled={isTyping}
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        disabled={isTyping}
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
