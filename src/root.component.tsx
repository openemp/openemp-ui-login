import React, { Suspense } from 'react';
import { Redirect } from '@reach/router';
import { createJss, rtl, jssPreset, StylesProvider } from '@openemp/styleguide';

import { Form } from './features';
import { loggedIn } from './api/authMethods';

import './assets/i18n';

const jss = createJss({ plugins: [...jssPreset().plugins, rtl()] });

function Root() {
  return !loggedIn() ? (
    <Suspense fallback={null}>
      <StylesProvider jss={jss}>
        <Form />
      </StylesProvider>
    </Suspense>
  ) : (
    <Redirect to="/" noThrow />
  );
}

export default Root;
