import React from 'react';
import Message from './Message';

const ChatContainer = ({ messages }) => {
  return (
    <div id="chat-container" className="chat-container mb-4">
      {messages.map((m) => (
        <Message key={m.id} role={m.role} content={m.content} />
      ))}
    </div>
  );
};

export default ChatContainer;
