/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormControlLabel, Checkbox, Link, Grid, makeStyles, TextField, Form } from '@openemp/styleguide';
import { LangSelector } from 'features';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginFields({ errors, touched, handleChange }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Form className={classes.form}>
      <LangSelector />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="username"
        label={t('Username')}
        name="username"
        autoComplete="username"
        autoFocus
        onChange={handleChange}
        error={errors.username && touched.username}
        helperText={errors.username && touched.username ? errors.username : null}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="password"
        label={t('Password')}
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handleChange}
        error={errors.password && touched.password}
        helperText={errors.password && touched.password ? errors.password : null}
      />
      <FormControlLabel
        control={<Checkbox id="remember" name="remember" label="remember" color="primary" onChange={handleChange} />}
        label={t('Remember me')}
      />
      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
        {t('Sign in')}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            {t('Forgot password?')}
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {t("Don't have an account? Sign Up")}
          </Link>
        </Grid>
      </Grid>
    </Form>
  );
}
