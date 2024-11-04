import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <h2 style={styles.title}>EquiNex</h2>
        <div style={styles.socialMedia}>
          <a href="https://facebook.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://twitter.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://instagram.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://linkedin.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>
        <div style={styles.links}>
          <a href="/terms" style={styles.link}>Terms and Conditions</a>
          <span style={styles.separator}>|</span>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 0', // Reduced padding
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    margin: '0 0 5px', // Reduced bottom margin
    fontSize: '20px', // Adjusted font size
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', // Reduced gap between icons
    marginBottom: '5px', // Reduced margin
  },
  links: {
    marginTop: '5px', // Reduced top margin
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  separator: {
    color: 'white',
    margin: '0 5px',
  },
};

// Apply hover effect for links
const handleMouseEnter = (event) => {
  event.target.style.color = '#96e856';
};

const handleMouseLeave = (event) => {
  event.target.style.color = 'white';
};

const App = () => {
  return (
    <div>
      {/* Other components */}
      <Footer />
    </div>
  );
};

export default App;
