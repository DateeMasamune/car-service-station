import { useState } from 'react';

function useSideBar(window) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return {
    mobileOpen,
    handleDrawerToggle,
    container,
  };
}

export default useSideBar;
