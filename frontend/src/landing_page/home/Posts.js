import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Posts() {
    const [posts, setPosts] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [uploadedDoc, setUploadedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // getting all post from backend
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3003/api/posts");
                setPosts(response.data.posts); 
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // To show add post form
    const toggleModal = () => setShowModal(!showModal);

    // To handle post submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() || uploadedDoc) {
            const formData = new FormData();
            formData.append('content', inputValue);
            formData.append('username', username.trim() || 'anonymous');
            if (uploadedDoc) {
                formData.append('doc', uploadedDoc);
            }

            try {
                const response = await axios.post("http://localhost:3003/api/posts/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Check response data
                console.log(response.data.message); 
                setPosts([...posts, response.data.post]); 
                setInputValue('');
                setUploadedDoc(null);
                setUsername(''); 
                toggleModal();
            } catch (error) {
                console.error("Error creating post:", error); 
            }
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        setUploadedDoc(e.target.files[0]);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-outline-success" onClick={toggleModal}>
                    Create a Post
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create a Post</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username..."
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Write something..."
                                            className="form-control"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input type="file" onChange={handleFileUpload} className="form-control" />
                                    </div>

                                    <button type="submit" className="btn btn-outline-success w-100">Add Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Display Posts */}
            <div className="post-list">
                {posts.map((post, index) => (
                    <div key={index} className="card p-4 mb-3">
                        <div className="d-flex align-items-center mb-3">
                            <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-circle me-3" />
                            <span className="fw-bold">{post.username}</span>
                        </div>
                        <p className="mb-2">{post.content}</p>
                        {post.doc && (
                            <a href={URL.createObjectURL(post.doc)} download={post.doc.name} className="text-decoration-underline">
                                {post.doc.name}
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
