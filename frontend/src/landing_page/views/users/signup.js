import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const SignUp = () => {
    // State hooks for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Destructure handleRegister from AuthContext
    const { handleRegister } = useContext(AuthContext);

    // Initialize navigate function
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call handleRegister function from context to register the user
            const response = await handleRegister(username, email, password);

            if (response) {
                console.log(response.message); // Display success message from server
                // Redirect to the homepage after successful signup
                navigate('/');  // This should redirect the user to "/"
            } else {
                console.error('Registration failed', response.message); // Handle error
            }
        } catch (error) {
            console.error('Error occurred during registration:', error); // Handle any unexpected errors
        }
    };

    return (
        <div className="row mt-3">
            <h1 className="col-6 offset-3">Sign Up </h1>
            <div className="col-6 offset-3">
                <form onSubmit={handleSubmit} noValidate className="needs-validation">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username :</label><br />
                        <input 
                            className="form-control" 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter Your Name" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">E-mail :</label><br />
                        <input 
                            required 
                            className="form-control" 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter Your Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password :</label><br />
                        <input 
                            required 
                            className="form-control" 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter Your Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button className="btn btn-success" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
