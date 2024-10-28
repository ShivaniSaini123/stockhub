import React from 'react'

import Posts from './Posts';

import Chatbot from './Chatbot';

import Navbar from '../Navbar';
import Footer from '../Footer';

function HomePage() {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '80px' }}> {/* Height of your navbar */}
                <Posts />
                <Chatbot />
            </div>
            <Footer />
        </>
    );
}
export default HomePage;