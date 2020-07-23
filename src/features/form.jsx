import React from 'react';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { login } from 'api/authMethods';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
  TextField,
  Formik,
  Form,
  yup,
} from '@openemp-mf/styleguide';

import { LoginFields } from 'components';

const SignInSchema = yup.object().shape({
  username: yup.string().required('This field is required.'),
  password: yup.string().required('This field is required.'),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: {
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleSubmit = (values) => {
    login(values).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          {t('Sign in')}
        </Typography>
        <Formik
          initialValues={{
            username: '',
            password: '',
            remember: false,
          }}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          {(props) => <LoginFields {...props} />}
        </Formik>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://openemp.org/">
            {'OpenEmp '}
          </Link>
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  );
}
