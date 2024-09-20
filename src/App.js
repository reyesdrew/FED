// src/App.js
import React from 'react';
import { UserProvider } from './UserContext';
import UserForm from './UserForm';
import UserList from './UserList';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserDetails from './UserDetails';
import PageNotFound from './PageNotFound';


function App() {
  return (

    <UserProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<><UserForm/><br/><br/><UserList /></>} />
          <Route path="/contact-detail/:id" element={<UserDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  </UserProvider>

  );
}

export default App;