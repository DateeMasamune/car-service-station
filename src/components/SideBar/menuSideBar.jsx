import React from 'react';
import {
  Construction, DriveEta, Reply,
} from '@mui/icons-material';

const menuSideBar = [
  {
    link: '/',
    name: 'Станции техобслуживания',
    id: 1,
    icon: <Construction />,
  },
  {
    link: '/car-park',
    name: 'Автопарк',
    id: 2,
    icon: <DriveEta />,
  },
  {
    link: '/history-maintenance',
    name: 'История',
    id: 3,
    icon: <Reply />,
  },
];

export default menuSideBar;
