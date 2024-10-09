import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import Loading from '../components/Loading';
import { AuthContext } from '../context';

interface PrivateRouteProps {
  route: React.JSX.Element;
}

const PrivateRoute = ({ route }: PrivateRouteProps): JSX.Element => {
  const { authLoading, isAuthenticated, validateToken } = useContext(AuthContext);

  useEffect(() => {
    const initialize = async () => {
      await validateToken();
    };
    initialize();
  }, [validateToken]);

  if (isAuthenticated === null || authLoading === null || authLoading) {
    return (
      <Grid container direction="column" height="100vh" wrap="nowrap">
        <Loading />
      </Grid>
    );
  }

  return <div>{isAuthenticated ? { ...route } : <Navigate to={'/login'} replace />}</div>;
};

export default PrivateRoute;
