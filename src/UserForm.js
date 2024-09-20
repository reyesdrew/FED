// UserForm.js
import React, { useState, useEffect } from 'react';
import withUserContext from './withUserContext';
import { useLocation } from 'react-router-dom';
import { updateUser } from './UserService';

const UserForm = ({ context }) => {
  const [user, setUser] = useState({ id: '', name: '', email: '', contact: '' });

  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  if (context.isUpdateMode) {
      try {
          const updatedUser = await updateUser(user);
          context.updateUserInContext(updatedUser);
      } catch (error) {
          console.error('Error updating user:', error);
      }
  } else {
      context.addUser(user);
  }
  setUser({ id: '', name: '', email: '', contact: '' });
  context.setIsUpdateMode(false);
  context.setSelectedUser(null);
};

useEffect(() => {
  if (context.selectedUser) {
      setUser({
          id: context.selectedUser.id,
          name: context.selectedUser.name,
          email: context.selectedUser.email,
          contact: context.selectedUser.contact
      })
  }
}, [context.selectedUser]);

useEffect(() => {
  if (userId) {
      const userToEdit = context.users.find(user => user.id === parseInt(userId));
      if (userToEdit) {
          setUser(userToEdit);
      }
  }
}, [userId, context.users]);



  return (
    <form onSubmit={handleSubmit}>
    {context.isUpdateMode && (
        <div className='form-group'>
            <label className='form-label'>Id</label>
            <fieldset disabled>
                <input
                    type="text"
                    name="id"
                    placeholder="ID"
                    value={user.id || ''}
                    onChange={handleChange}
                    readOnly
                    className='form-control'
                />
            </fieldset>
        </div>
    )}
    <div className='form-group'>
        <label className='form-label'>Name</label>
        <input
            name="name"
            required
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className='form-control'
        />
    </div>
    <div className='form-group'>
        <label className='form-label'>Email</label>
        <input
            name="email"
            required
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className='form-control'
        />
    </div>
    <div className='form-group'>
        <label className='form-label'>Contact No</label>
        <input
            name="contact"
            required
            value={user.contact}
            onChange={handleChange}
            placeholder="Contact No"
            className='form-control'
        />
    </div>
    <button className='btn btn-primary' type="submit">{context.selectedUser ? 'Update' : 'Add'}</button>
</form>
  );
};

export default withUserContext(UserForm);
 