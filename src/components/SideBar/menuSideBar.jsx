import React from 'react';

import {
  Add, Construction, DriveEta, Reply, RotateRight,
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
    link: '/send-for-maintenance',
    name: 'Отправить на техобслуживание',
    id: 3,
    icon: <Reply />,
  },
  {
    link: '/reception-for-maintenance',
    name: 'Прием авто на ТО',
    id: 4,
    icon: <Add />,
  },
  {
    link: '/maintenance',
    name: 'Проведение ТО',
    id: 5,
    icon: <RotateRight />,
  },
];

export default menuSideBar;
