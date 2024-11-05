import React, { useState, useRef } from "react"; // Import React and hooks
import './profile.css'; // Import CSS styles for the profile page
import Navbar from '../Navbar'; // Import Navbar component
import Footer from "../Footer"; // Import Footer component

// Define the ProfilePage component
function ProfilePage() {
  // State to track the currently active tab
  const [activeTab, setActiveTab] = useState("about");
  // State to manage messages in the chat section
  const [messages, setMessages] = useState([]);
  // State to handle new message input
  const [newMessage, setNewMessage] = useState("");
  // State to manage followers
  const [followers, setFollowers] = useState([]); 
  // State for adding new followers
  const [newFollower, setNewFollower] = useState(""); 
  // State for about section details
  const [aboutDetails, setAboutDetails] = useState(""); 
  // State to store submitted about details
  const [submittedAboutDetails, setSubmittedAboutDetails] = useState(""); 
  // Ref to handle file input for document upload
  const fileInputRef = useRef(null);

  // Function to send a message in the chat section
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") { // Ensure message is not empty
      setMessages([...messages, newMessage]); // Add the new message to the list
      setNewMessage(""); // Clear the input field
    }
  };

  // Function to trigger the file input click
  const handleDocumentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden file input
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log("Selected file:", file.name); // Log the file name (you can handle the file upload here)
    }
  };

  // Function to add a new follower
  const handleAddFollower = () => {
    if (newFollower.trim() !== "") { // Ensure follower name is not empty
      setFollowers([...followers, newFollower.trim()]); // Add the new follower to the list
      setNewFollower(""); // Clear the input field
    }
  };

  // Function to remove a follower
  const handleRemoveFollower = (followerToRemove) => {
    setFollowers(followers.filter(follower => follower !== followerToRemove)); // Filter out the removed follower
  };

  // Function to handle changes in the about textarea
  const handleAboutChange = (e) => {
    setAboutDetails(e.target.value); // Update about details state
  };

  // Function to submit the about details
  const handleAboutSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    if (aboutDetails.trim() !== "") { // Ensure about details are not empty
      setSubmittedAboutDetails(aboutDetails); // Store submitted about details
      setAboutDetails(""); // Clear the textarea
    }
  };

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <Footer /> {/* Render the Footer component */}
      <div className="profile-page"> {/* Main container for the profile page */}

        <div className="header"> {/* Header section with profile information */}
          <div className="profile-picture"> {/* Profile picture container */}
            <img 
              src="https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg?w=768" 
              alt="Icon" 
              className="icon" // Profile icon image
            />
          </div>

          <div className="profile-info"> {/* Profile information section */}
            <h2>Name: New User</h2> {/* User name */}
            <p>Company: XYZ Corp</p> {/* Company name */}
            <p>Position: Software Engineer</p> {/* User position */}
          </div>
        </div>

        <div className="tabs"> {/* Tab navigation for different sections */}
          <button 
            className={activeTab === "about" ? "active" : ""} // Highlight active tab
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

        <div className="content"> {/* Content area for the active tab */}
          {activeTab === "about" && (
            <div className="about-section"> {/* About section */}
              <h3>About</h3>
              <form onSubmit={handleAboutSubmit}> {/* Form for submitting about details */}
                <div>
                  <textarea
                    value={aboutDetails} // Bind textarea value to state
                    onChange={handleAboutChange} // Handle changes
                    placeholder="Write about yourself..."
                    className="about-textarea" // Class for styling
                    rows="4" // Number of rows in the textarea
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button> {/* Submit button */}
              </form>
              <div className="submitted-messages"> {/* Section for submitted about details */}
                <h4>Your About Details:</h4>
                <p>{submittedAboutDetails}</p> {/* Display submitted about details */}
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="chat-section"> {/* Chat section */}
              <h3>Chat</h3>
              <div className="chat-messages"> {/* Container for chat messages */}
                {messages.map((msg, index) => (
                  <p key={index} className="message">{msg}</p> // Render each message
                ))}
              </div>
              <div className="chat-input"> {/* Input area for sending messages */}
                <input
                  type="text"
                  value={newMessage} // Bind input value to state
                  onChange={(e) => setNewMessage(e.target.value)} // Handle input change
                  placeholder="Type a message..."
                  className="form-control" // Class for styling
                />
                <button onClick={handleSendMessage} className="btn btn-primary">Send</button> {/* Send button */}
              </div>
            </div>
          )}

          {activeTab === "docs" && (
            <div className="documents-section"> {/* Document upload section */}
              <h3>Upload new Documents</h3>
              <p>List of documents will appear here.</p> {/* Placeholder for document list */}
            </div>
          )}

          {activeTab === "followers" && (
            <div className="follow-section"> {/* Followers section */}
              <h3>Followers</h3>
              <div className="add-follower"> {/* Input area for adding followers */}
                <input
                  type="text"
                  value={newFollower} // Bind input value to state
                  onChange={(e) => setNewFollower(e.target.value)} // Handle input change
                  placeholder="Add a follower..."
                  className="form-control" // Class for styling
                />
                <button onClick={handleAddFollower} className="btn btn-primary">Add</button> {/* Add button */}
              </div>
              <div className="follower-list"> {/* List of current followers */}
                <h4>Current Followers</h4>
                {followers.length > 0 ? ( // Check if there are followers
                  <ul>
                    {followers.map((follower, index) => ( // Render each follower
                      <li key={index}>
                        {follower}
                        <button onClick={() => handleRemoveFollower(follower)} className="btn btn-danger btn-sm">Remove</button> {/* Remove button */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No followers yet.</p> // Message when no followers are present
                )}
              </div>
            </div>
          )}

          <div className="interests"> {/* Interests section */}
            <h4>Interested in</h4>
            <p>Enthusiastic about stock market analysis, investment strategies, financial trends, and portfolio management. If you're interested, let's connect!</p> {/* Description of interests */}
          </div>

          <div className="contact-info"> {/* Contact information section */}
            <h4>Contact</h4>
            <p>Email: example@example.com</p> {/* Email contact */}
            <p>Phone: +1234567890</p> {/* Phone contact */}
            <p>LinkedIn: <a href="https://linkedin.com">linkedin.com/in/username</a></p> {/* LinkedIn profile link */}
          </div>
          
          {/* Hidden file input for document upload */}
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} // Hide the file input
            onChange={handleFileChange} // Handle file selection
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; // Export the ProfilePage component
