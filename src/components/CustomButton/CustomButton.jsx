import React from 'react';
import { Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
function CustomButton({ name, onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
    >
      {name}
    </Button>
  );
}

export default CustomButton;
