import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function useSinglePageCarService() {
  const location = useLocation().pathname.split('/');
  const pageId = location[location.length - 1];
  const navigate = useNavigate();
  const reduxStore = useSelector((store) => store.serviceStation);
  const currentService = useMemo(() => (
    reduxStore.find((service) => service.id === pageId)
  ), [reduxStore]);

  const backPage = () => (navigate(-1));

  return {
    currentService,
    backPage,
  };
}

export default useSinglePageCarService;
