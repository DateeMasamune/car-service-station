import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CarPark from '../CarPark/CarPark';
import SingleCarPage from '../CarPark/SingleCarPage/SingleCarPage';
import Maintenance from '../Maintenance/Maintenance';
import ReceptionForMaintenance from '../ReceptionForMaintenance/ReceptionForMaintenance';
import SendForMaintenance from '../SendForMaintenance/SendForMaintenance';
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
          <Route path="/send-for-maintenance" element={<SendForMaintenance />} />
          <Route path="/reception-for-maintenance" element={<ReceptionForMaintenance />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/single-page-car-service/:id" element={<SinglePageCarService />} />
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
}

export default Router;
