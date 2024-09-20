// UserContext.js
import React, { createContext, useState, useEffect} from 'react';
import { getUsers, addUser as addNewUser, deleteUser as deleteUserService} from './UserService';



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  
  //fetching or getting all the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
 
    fetchData();
  }, []);

    //add user
    const addUser = async (user) => {
        try {
          const newUser = await addNewUser(user);
          setUsers([...users, newUser]);
        } catch (error) {
          console.error('Error adding user:', error);
        }
      };

      //delete user

      const deleteUser = async (id) => {
        try {
          await deleteUserService(id); // Call the API to delete the user
          setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
          return { success: true }; // Return success status
        } catch (error) {
          console.error('Error deleting user:', error);
          return { success: false, message: error.message }; // Return failure status and message
        }
      };


      //update a user
      const updateUserInContext = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsUpdateMode(false);
        setSelectedUser(null);
      };


  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, setUsers, setIsUpdateMode, isUpdateMode, selectedUser, updateUserInContext, setSelectedUser}}>
      {children}
    </UserContext.Provider>
  );
};