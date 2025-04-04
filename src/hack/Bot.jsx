import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function Bot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [mails, setMails] = useState('');
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      if (inputText.includes('report by mail')) {
        const res = await axios.post('https://aimailssender.onrender.com/user-chat', {
          user_chat: mails,
        });

        console.log(res.data);
        const botMessage = {
          text: 'Your mail has been sent successfully.',
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
        };
        setMails('');
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const response = await fetch('https://ques-api.onrender.com/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ques: inputText }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        const botMessage = {
          text: data.responce || 'Unable to analyze the news at this time.',
          sender: 'bot',
          time: new Date().toLocaleTimeString(),
        };
        setMails((prev) => prev + `User Input: ${inputText}\nAI Response: ${data.responce}`);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speakText(botMessage.text);
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const botErrorMessage = {
        text: 'An error occurred while processing your request. Please try again.',
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botErrorMessage]);
    }

    setInputText('');
  };

  const speakText = (text) => {
    stopSpeaking();
    setSpeaking(true);
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.onend = () => setSpeaking(false);
    synthRef.current.speak(utteranceRef.current);
  };

  const stopSpeaking = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setSpeaking(false);
    }
  };

  const startListening = () => {
    if (!recognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInputText(speechToText);
      setTimeout(() => {
        handleSubmit(new Event('submit'));
      }, 1000);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-r  text-white p-2">
      <div className="flex-1 p-4 space-y-4 bg-gray-800 rounded-lg shadow-md mt-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-4 max-w-[450px] rounded-lg shadow-md ${
                message.sender === 'user' ? 'bg-bg-gradient-to-r from-[#0f7de6] to-[#c80f75] text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <p>{message.text}</p>
              <div className="text-xs text-gray-400 mt-1 text-right">{message.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-800 p-4 border-t  flex flex-col mt-4 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button type="submit" className="bg-bg-gradient-to-r from-[#0f7de6] to-[#c80f75] text-white px-4 rounded-lg hover:bg-orange-700">
            Send
          </button>
        </form>

        <div className="flex space-x-2 mt-4">
          <button
            onClick={startListening}
            className={`flex-1 px-6 py-2 rounded-lg ${
              listening ? 'bg-yellow-500' : 'bg-gradient-to-r from-[#0f7de6] to-[#c80f75] hover:bg-orange-700'
            } text-white`}
          >
            {listening ? '🎙 Listening...' : '🎤 Speak'}
          </button>
          <button
            onClick={stopSpeaking}
            className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-[#0f7de6] to-[#c80f75] hover:bg-orange-700 text-white"
          >
            🛑 Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bot;