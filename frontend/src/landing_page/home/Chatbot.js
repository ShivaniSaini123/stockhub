import React, { useState } from "react";
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        const userMessage = { text: input, sender: 'user' };

        // Set messages with the user's message only once
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post('http://localhost:3002/chatbot', {
                message: input,
            });

            const botResponse = response.data.reply;
            const botMessage = { text: botResponse, sender: 'bot' };

            // Add the bot's response message
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching stock data:", error);
            const errorMessage = { text: "There was an error retrieving stock information", sender: 'bot' };

            // Add the error message from the bot if API call fails
            setMessages((prev) => [...prev, errorMessage]);
        }
        setInput('');
    };

    return (
        <div className="position-relative">
            {/* Chatbot Icon */}
            <div
                className="position-fixed"
                style={{ 
                    cursor: 'pointer',
                    zIndex: 1000,
                    bottom: '120px', // Higher above the footer
                    right: '16px',   // Positioned at the bottom-right corner
                    color: 'black'   // Changed color to black
                }}
                data-bs-toggle="modal"
                data-bs-target="#chatbotModal"
            >
                <i className="fa fa-comments fa-3x" aria-hidden="true"></i>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id="chatbotModal"
                tabIndex="-1"
                aria-labelledby="chatbotModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="chatbotModalLabel">Chatbot</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <div className="card-body" style={{ height: '300px', overflowY: 'auto' }}>
                                    <div className="messages">
                                        {messages.map((msg, i) => (
                                            <div
                                                key={i}
                                                className={`d-flex mb-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                                            >
                                                <div
                                                    className={`badge ${msg.sender === 'user' ? 'bg-danger text-end' : 'bg-success text-start'}`}
                                                    style={{ maxWidth: '80%', padding: '10px', borderRadius: '12px' }}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="input-group mt-3">
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about a stock"
                                        className="form-control"
                                    />
                                    <button className="btn btn-success" onClick={handleSend}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
