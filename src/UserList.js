// UserList.js


import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from './UserService';




const UserList = () => {
  const {users, setUsers, setIsUpdateMode, setSelectedUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleViewClick = (id) => {
    console.log(`View user with ID: ${id}`);
    navigate(`/contact-detail/${id}`)
  };

  //Function to update the details of a user
  const handleUpdateClick = (user) => {
    setIsUpdateMode(true);
    setSelectedUser(user);
    console.log(user);
  }
 
  // Function to handle user deletion
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            // Update the state to remove the deleted user
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };
  
  
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact No.</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
                        users.map(
                            user =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={() => handleViewClick(user.id)}>View</button>
                                        <button className='btn btn-primary' onClick={() => handleUpdateClick(user)} style={{ marginLeft: '10px' }} >Update</button>
                                        <button className='btn btn-danger' onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Delete</button>
                                    </td>
                                </tr>
                        )
                    }
      </tbody>
    </table>

  );
};

export default UserList;