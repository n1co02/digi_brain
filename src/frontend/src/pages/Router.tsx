//Author: Nico Mangold
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {RouterRoutes} from '../constants/routerRoutes';

export function Router() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(RouterRoutes.Login);
  }, []);

  return <></>;
}
