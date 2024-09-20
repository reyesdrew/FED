// withUserContext.js
import React from 'react';
import { UserContext } from './UserContext';

const withUserContext = (Component) => {
  return (props) => (
    <UserContext.Consumer>
      {(context) => <Component {...props} context={context} />}
    </UserContext.Consumer>
  );
};

export default withUserContext;