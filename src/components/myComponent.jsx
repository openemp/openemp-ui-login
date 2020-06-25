import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@openemp-mf/styleguide';

const MyComponent = (props) => {
  const { onClick, text } = props;
  return (
    <Grid>
      <Button onClick={onClick}>
        <Typography>{text}</Typography>
      </Button>
    </Grid>
  );
};

MyComponent.defaultProps = {
  onClick: () => {},
  text: 'Hello OpenEMP',
};

MyComponent.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default MyComponent;
