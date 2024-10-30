import React, { useState, useRef } from "react";
import './profile.css'; 
import Navbar from '../Navbar';
import Footer from "../Footer";
function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [followers, setFollowers] = useState([]); 
  const [newFollower, setNewFollower] = useState(""); 
  const [aboutDetails, setAboutDetails] = useState(""); 
  const [submittedAboutDetails, setSubmittedAboutDetails] = useState(""); 
  const fileInputRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  const handleDocumentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name); 
    }
  };

  const handleAddFollower = () => {
    if (newFollower.trim() !== "") {
      setFollowers([...followers, newFollower.trim()]);
      setNewFollower(""); 
    }
  };

  const handleRemoveFollower = (followerToRemove) => {
    setFollowers(followers.filter(follower => follower !== followerToRemove));
  };
  const handleAboutChange = (e) => {
    setAboutDetails(e.target.value); 
};
const handleAboutSubmit = (e) => {
    e.preventDefault();
    if (aboutDetails.trim() !== "") {
      setSubmittedAboutDetails(aboutDetails); 
      setAboutDetails(""); 
    }
  };

  return (
    <div>
         <Navbar />
         <Footer/>
    <div className="profile-page">

      <div className="header">
      <div className="profile-picture">
    <img src="https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg?w=768" alt="Icon" className="icon" />
      </div>

        <div className="profile-info">
          <h2>Name: New User</h2>
          <p>Company: XYZ Corp</p>
          <p>Position: Software Engineer</p>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}>
          About
        </button>
        <button 
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}>
          Chat
        </button>
        <button 
          className={activeTab === "docs" ? "active" : ""}
          onClick={handleDocumentClick}> 
          Upload Documents
        </button>

        <button 
          className={activeTab === "followers" ? "active" : ""}
          onClick={() => setActiveTab("followers")}>
          Followers
        </button>
      </div>

      <div className="content">
        {activeTab === "about" && (
          <div className="about-section">
            <h3>About</h3>
            <form onSubmit={handleAboutSubmit}>
                        <div>
                            <textarea
                                value={aboutDetails}
                                onChange={handleAboutChange}
                                placeholder="Write about yourself..."
                                className="about-textarea"
                                rows="4"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="submitted-messages">
                        <h4>Your About Details:</h4>
                        <p>{submittedAboutDetails}</p> 
                    </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="chat-section">
            <h3>Chat</h3>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <p key={index} className="message">{msg}</p>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="form-control"
              />
              <button onClick={handleSendMessage} className="btn btn-primary">Send</button>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="documents-section">
            <h3>Upload new Documents</h3>
            <p>List of documents will appear here.</p>
          </div>
        )}

{activeTab === "followers" && (
          <div className="follow-section">
            <h3>Followers</h3>
            <div className="add-follower">
              <input
                type="text"
                value={newFollower}
                onChange={(e) => setNewFollower(e.target.value)}
                placeholder="Add a follower..."
                className="form-control"
              />
              <button onClick={handleAddFollower} className="btn btn-primary">Add</button>
            </div>
            <div className="follower-list">
              <h4>Current Followers</h4>
              {followers.length > 0 ? (
                <ul>
                  {followers.map((follower, index) => (
                    <li key={index}>
                      {follower}
                      <button onClick={() => handleRemoveFollower(follower)} className="btn btn-danger btn-sm">Remove</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No followers yet.</p>
              )}
            </div>
          </div>
        )}
        <div className="interests">
          <h4>Interested in</h4>
          <p>Enthusiastic about stock market analysis, investment strategies, financial trends, and portfolio management. If you're interested, let's connect!</p>
        </div>

        <div className="contact-info">
          <h4>Contact</h4>
          <p>Email: example@example.com</p>
          <p>Phone: +1234567890</p>
          <p>LinkedIn: <a href="https://linkedin.com">linkedin.com/in/username</a></p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }}
          onChange={handleFileChange} 
        />
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;