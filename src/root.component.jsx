/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Form } from 'features';
import { loggedIn } from 'api/authMethods';
import { Redirect } from '@reach/router';
import { createJss, rtl, jssPreset, StylesProvider } from '@openemp-mf/styleguide';

import i18n from 'assets/i18n';

const jss = createJss({ plugins: [...jssPreset().plugins, rtl()] });

const Root = () => {
  return !loggedIn() ? (
    <Suspense fallback={null}>
      <StylesProvider jss={jss}>
        <Form />
      </StylesProvider>
    </Suspense>
  ) : (
    <Redirect to="/" noThrow />
  );
};

export default Root;
