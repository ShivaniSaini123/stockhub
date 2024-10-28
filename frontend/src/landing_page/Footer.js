
import React from 'react';

function Footer() {
    return (
        <footer
            className="text-center text-white fixed-bottom"
            style={{
                backgroundImage: 'url(media/images/footerbg.jpg)',

                backgroundSize: 'cover', // Ensures the image covers the entire footer
                backgroundPosition: 'center', // Centers the image
                padding: '10px 0', // Padding for the footer
            }}
        >
            <div className="container">
                <p className="m-1">© {new Date().getFullYear()} Company Name.</p>
                <p>Privacy
                    Terms</p>
            </div>
        </footer>
    );
}

export default Footer;
