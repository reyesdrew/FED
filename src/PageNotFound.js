import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is correct based on your project structure
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="card shadow-sm text-center">
                <div className="card-body">
                    <h1 className="display-4 text-danger">404</h1>
                    <h2 className="mb-4">Page Not Found!</h2>
                    <p className="lead">Sorry, the page you are looking for does not exist.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary mt-3">Go to Home</button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;