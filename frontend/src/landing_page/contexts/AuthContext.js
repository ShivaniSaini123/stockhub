// // Import necessary modules for making HTTP requests and managing state/context
// import axios from "axios"; // Axios for making HTTP requests
// import httpStatus from "http-status"; // For handling HTTP status codes
// import { createContext, useContext, useState } from "react"; // React context and hooks
// import { useNavigate } from "react-router-dom"; // Hook for navigation

// // Create a context for authentication
// export const AuthContext = createContext({});

// // Create an Axios instance with a base URL for user-related API requests
// const client = axios.create({
//     baseURL: "http://localhost:3003/api/v1/users" // Base URL for API endpoints
// });

// // AuthProvider component to wrap the application and provide auth context
// export const AuthProvider = ({ children }) => {
//     // Get current context (if any) and set user data state
//     const authContext = useContext(AuthContext);
//     const [userData, setUserData] = useState(authContext); // State to hold user data
//     const router = useNavigate(); // Hook for navigation

//     // Async function to handle user registration
//     const handleRegister = async (name, username, password) => {
//         try {
//             // Send POST request to register a new user
//             let request = await client.post("/register", {
//                 name: name,
//                 username: username,
//                 password: password
//             });

//             // Check if the request was successful (status 201)
//             if (request.status === httpStatus.CREATED) {
//                 return request.data.message; // Return success message
//             }
//         } catch (err) {
//             console.error("Registration error:", err); // Log registration error
//             throw err; // Propagate error
//         }
//     };

//     // Async function to handle user login
//     const handleLogin = async (username, password) => {
//         try {
//             // Send POST request to log in the user
//             let request = await client.post("/login", {
//                 username: username,
//                 password: password
//             });
//             console.log(username, password); // Log username and password for debugging
//             console.log(request.data); // Log response data

//             // Check if the request was successful (status 200)
//             if (request.status === httpStatus.OK) {
//                 localStorage.setItem("token", request.data.token); // Store JWT token in localStorage
//                 // setUserData(request.data.user); // Uncomment to store user data after login
//                 router("/"); // Redirect to home page after successful login
//             }
//         } catch (err) {
//             console.error("Login error:", err); // Log login error
//             throw err; // Propagate error
//         }
//     };

//     // Async function to get the user's activity history
//     const getHistoryOfUser = async () => {
//         try {
//             // Send GET request to fetch user activity history
//             let request = await client.get("/get_all_activity", {
//                 params: {
//                     token: localStorage.getItem("token") // Send token as a query parameter
//                 }
//             });
//             return request.data; // Return activity data
//         } catch (err) {
//             console.error("Error fetching user history:", err); // Log error while fetching history
//             throw err; // Propagate error
//         }
//     };

//     // Context value to provide to children components
//     const data = {
//         userData, // Current user data
//         setUserData, // Function to update user data
//         handleLogin, // Function to handle login
//         handleRegister, // Function to handle registration
//         getHistoryOfUser // Function to get user's activity history
//     };

//     // Provide the context value to children components
//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// Import necessary modules for making HTTP requests and managing state/context
import axios from "axios"; // Axios for making HTTP requests
import httpStatus from "http-status"; // For handling HTTP status codes
import { createContext, useContext, useState } from "react"; // React context and hooks
import { useNavigate } from "react-router-dom"; // Hook for navigation

// Create a context for authentication
export const AuthContext = createContext({});

// Create an Axios instance with a base URL for user-related API requests
const client = axios.create({
    baseURL: "http://localhost:3003/api/v1/users" // Base URL for API endpoints
});

// AuthProvider component to wrap the application and provide auth context
export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext); // State to hold user data
    const router = useNavigate(); // Hook for navigation

    // Async function to handle user registration
    const handleRegister = async (username, email, password) => {
        try {
            // Send POST request to register a new user
            let request = await client.post("/signup", {
                username: username,
                email: email,
                password: password
            });
    
            // Check if the request was successful and has the expected structure
            if (request && request.data) {
                // Log the entire response to inspect its structure
                console.log('Registration Response:', request.data);
    
                // Ensure that the 'success' field is available
                if (request.data.success) {
                    return request.data.message || "Registration successful"; // Use a default message if none exists
                } else {
                    throw new Error("Registration failed: No success field in response.");
                }
            } else {
                throw new Error("Registration failed: Invalid response from server.");
            }
        } catch (err) {
            console.error("Registration error:", err); // Log registration error
            throw err; // Propagate error
        }
    };
    
    // Async function to handle user login
    const handleLogin = async (username, password) => {
        try {
            // Send POST request to log in the user
            let request = await client.post("/login", {
                username: username,
                password: password
            });
            console.log("Request payload:", { username, password }); // Log request payload for debugging
            console.log("Response data:", request.data); // Log response data
    
            // Check if the request was successful (status 200)
            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token); // Store JWT token in localStorage
                // setUserData(request.data.user); // Uncomment if you want to store user data
                router("/"); // Redirect to home page after successful login
                return request.data; // Return the response data for further logging in the component
            }
        } catch (err) {
            console.error("Login error:", err); // Log login error
            throw err; // Propagate error
        }
    };
    
    // Async function to get the user's activity history
    const getHistoryOfUser = async () => {
        try {
            // Send GET request to fetch user activity history
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token") // Send token as a query parameter
                }
            });
            return request.data; // Return activity data
        } catch (err) {
            console.error("Error fetching user history:", err); // Log error while fetching history
            throw err; // Propagate error
        }
    };

    // Context value to provide to children components
    const data = {
        userData, // Current user data
        setUserData, // Function to update user data
        handleLogin, // Function to handle login
        handleRegister, // Function to handle registration
        getHistoryOfUser // Function to get user's activity history
    };

    // Provide the context value to children components
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
// Import necessary modules for making HTTP requests and managing state/context
