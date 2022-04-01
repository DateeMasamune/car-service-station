import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceStation from '../ServiceStation/ServiceStation';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServiceStation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
