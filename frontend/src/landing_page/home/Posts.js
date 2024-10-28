
import React, { useState } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [uploadedDoc, setUploadedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // To show add post form
    const toggleModal = () => setShowModal(!showModal);

    // To handle post submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() || uploadedDoc) {
            setPosts([...posts, { content: inputValue, doc: uploadedDoc }]);
            setInputValue('');
            setUploadedDoc(null);
            toggleModal();
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        setUploadedDoc(e.target.files[0]);
    };

    return (
        <div className="container mt-5">
            {/* Check if button renders correctly */}

            <div className="d-flex justify-content-center mb-3"> {/* Centering the button */}
                <button className="btn btn-outline-success" onClick={toggleModal}> {/* Outline button with green color */}
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
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-circle me-3" />
                                        <span className="fw-bold">User Name</span>
                                        <button type="button" className="btn btn-outline-success ms-auto">Video Call</button>
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
                            <span className="fw-bold">User Name</span>
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

