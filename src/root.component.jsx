/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from 'features';
import { loggedIn } from 'api/authMethods';
import { Redirect } from '@reach/router';

const Root = () => {
  return !loggedIn() ? <Form /> : <Redirect to="/" noThrow />;
};

export default Root;
