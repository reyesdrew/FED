import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from './UserService';


 
const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Hook for navigation
 
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getUserById(id);
                setUser(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [id]);
 
    if (!user) {
        return <div>Loading...</div>;
    }
 
    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h2>User Details</h2>
                </div>
                <div className="card-body p-4">
                    <p className="h5 border-bottom pb-2">ID: {user.id}</p>
                    <p className="h5 border-bottom pb-2">Name: {user.name}</p>
                    <p className="h5 border-bottom pb-2">Email: {user.email}</p>
                    <p className="h5 border-bottom pb-2">Contact: {user.contact}</p>
                    <button onClick={() => navigate('/')} className="btn btn-light h5 btn-lg mt-3">&lt; Back</button>
                </div>
            </div>
        </div>
    );
};
 
export default UserDetails;