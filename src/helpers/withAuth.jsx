import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';

import { loggedIn, getConfirm } from 'api/authMethods';

export default function withAuth(AuthComponent) {
  return () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      if (!loggedIn()) {
        navigate('/login');
      } else {
        try {
          const confirm = getConfirm();
          // console.log('confirmation is:', confirm);
          setUser(confirm);
        } catch (err) {
          // console.log(err);
          //   Auth.logout();
          //   this.props.history.replace('/login');
        }
      }
    }, []);

    if (user) {
      // console.log('confirmed!');
      return <AuthComponent user={user} />;
    }
    // console.log('not confirmed!');
    return null;
  };
}
