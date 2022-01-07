import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useThisContext } from '../context';

const PrivateRoute = ({ children, ...rest }) => {
    const { userEmail } = useThisContext();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                userEmail ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;