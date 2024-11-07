import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // For navigation

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { handleLogin } = useContext(AuthContext); // Get handleLogin function from context
    const router = useNavigate(); // For navigating after login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Attempt to log in using the handleLogin function from context
            const loginResponse = await handleLogin(username, password);

            // Check for success or failure in the response
            if (loginResponse && loginResponse.success) {
                console.log('Login Successful:', loginResponse.message);
                router('/'); // Redirect to home page after successful login
            } else {
                setErrorMessage('Login failed: Incorrect credentials');
            }
        } catch (err) {
            setErrorMessage('Error during login: ' + err.message);
            console.error('Error during login:', err.message);
        }
    };

    return (
        <div className="row mt-3">
            <h1 className="col-6 offset-3">Log In </h1>
            <div className="col-6 offset-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username :</label><br />
                        <input 
                            required 
                            className="form-control" 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter Your Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
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
                    <button className="btn btn-success" type="submit">Log In</button>
                </form>
                {errorMessage && (
                    <div className="alert alert-danger mt-3">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
