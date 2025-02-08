import { useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { id: Date.now(), role: 'user', content: input.trim() };
      setMessages([...messages, userMessage]);
      setInput('');
      await getAIResponse(input.trim());
    }
  };

  const getAIResponse = async (message) => {
    const typingIndicator = { id: Date.now() + 1, role: 'ai', content: 'AI is typing...' };
    setMessages((prevMessages) => [...prevMessages, typingIndicator]);
    try {
      const response = await fetch('/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: message }),
      });
      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== 'AI is typing...'),
        { id: Date.now() + 2, role: 'ai', content: data.response },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== 'AI is typing...'),
        { id: Date.now() + 2, role: 'ai', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    }
  };

  return { messages, input, handleInputChange, handleSubmit };
};
