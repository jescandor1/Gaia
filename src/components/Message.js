import React from 'react';

const Message = ({ role, content }) => {
  const messageClass = role === 'user' ? 'user-message' : 'ai-message';

  return (
    <div className={`message ${messageClass}`}>
      {content}
    </div>
  );
};

export default Message;
