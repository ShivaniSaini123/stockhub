import React from 'react';

function Chatbot() {
    return (
        <div className="position-relative">
            {/* Chatbot Icon */}
            <div
                className="position-fixed bottom-16 start-0 m-3" // Adjusted bottom value for spacing above the footer
                style={{ cursor: 'pointer', zIndex: 1000 }} // Ensure it's above other elements
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
                                    {/* Sample messages for display */}
                                    <div className="mb-2 text-start">
                                        <span className="badge bg-secondary">Hello! How can I assist you today?</span>
                                    </div>
                                    <div className="mb-2 text-end">
                                        <span className="badge bg-primary">I need help with my account.</span>
                                    </div>
                                    <div className="mb-2 text-start">
                                        <span className="badge bg-secondary">Sure! What issue are you facing?</span>
                                    </div>
                                    <div className="mb-2 text-end">
                                        <span className="badge bg-primary">I can't log in.</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <form className="d-flex">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Type your message..."
                                        />
                                        <button type="submit" className="btn btn-primary ms-2">Send</button>
                                    </form>
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
