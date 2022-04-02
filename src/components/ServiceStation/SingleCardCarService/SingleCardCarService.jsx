import React from 'react';

import {
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

function SingleCardCarService({
  // eslint-disable-next-line react/prop-types
  carServiceIcon, name, description, id,
}) {
  return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/single-page-car-service/${id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={carServiceIcon}
            alt="icon"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default SingleCardCarService;
