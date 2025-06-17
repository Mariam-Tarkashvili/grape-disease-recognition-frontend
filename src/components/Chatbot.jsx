// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { sendToBackend } from '../api/chat';
import './Chatbot.css';
import sendIcon from './send.png';
import attachIcon from './attach.png';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [warning, setWarning] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendWith = async (fileArg, messageArg) => {
    const response = await sendToBackend(messageArg, fileArg);
    setChatHistory((prev) => [
      ...prev,
      { sender: 'bot', text: response.assistant_reply }
    ]);
    setFile(null);
  };

  const handleSend = async () => {
    if (file && message.trim()) {
      setWarning('⚠️ Please send the image first before typing a message.');
      return;
    }

    if (!message.trim() && !file) return;

    const userEntry = file
      ? { type: 'file', file }
      : { type: 'text', text: message };

    setChatHistory((prev) => [...prev, { sender: 'user', ...userEntry }]);
    setMessage('');
    setWarning('');

    await handleSendWith(file, message);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'user', type: 'file', file: droppedFile }
      ]);

      // Immediately send to backend
      handleSendWith(droppedFile, '');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setChatHistory((prev) => [
        ...prev,
        { sender: 'user', type: 'file', file: selectedFile }
      ]);
      handleSendWith(selectedFile, '');
    }
  };

  return (
    <div
      className={`chatbot-container ${isDragging ? 'drag-over' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="chatbox">
        {chatHistory.map((msg, index) => {
          const isUser = msg.sender === 'user';
          const className = `message ${isUser ? 'user' : 'bot'}`;

          if (msg.type === 'file' && msg.file) {
            return (
              <div key={index} className={className}>
                <img
                  src={URL.createObjectURL(msg.file)}
                  alt="User upload"
                  className="chat-image"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
              </div>
            );
          }

          return (
            <div key={index} className={className}>
              {msg.text}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {warning && <div className="warning">{warning}</div>}

      <textarea
        rows="2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your message..."
      />

      <div className="input-controls">
      
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        
        <img
          src={attachIcon}
          alt="upload "
          className="attachButton"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        />

        
        <button className="sendButton" onClick={handleSend}>
          <img className="sendB" src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
