import React from 'react'
import './Homepage.css'
import Posts from './Posts';

import Chatbot from './Chatbot';

import Navbar from '../Navbar';
import Footer from '../Footer';

function HomePage() {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '80px' }}> 
                <Posts />
                <Chatbot />
            </div>
            <Footer />
        </>
    );
}
export default HomePage;