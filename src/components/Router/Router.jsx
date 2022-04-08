import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CarPark from '../CarPark/CarPark';
import SingleCarPage from '../CarPark/SingleCarPage/SingleCarPage';
import HistoryMaintenance from '../HistoryMaintenance/HistoryMaintenance';
import Maintenance from '../Maintenance/Maintenance';
import ServiceStation from '../ServiceStation/ServiceStation';
import SinglePageCarService from '../ServiceStation/SinglePageCarService/SinglePageCarService';
import SideBar from '../SideBar/SideBar';

function Router() {
  return (
    <BrowserRouter>
      <SideBar>
        <Routes>
          <Route path="/" element={<ServiceStation />} />
          <Route path="/car-park" element={<CarPark />} />
          <Route path="/car-park/single-car-page/:id" element={<SingleCarPage />} />
          <Route path="/history-maintenance" element={<HistoryMaintenance />} />
          <Route path="/maintenance/:id" element={<Maintenance />} />
          <Route path="/single-page-car-service/:id" element={<SinglePageCarService />} />
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
}

export default Router;
