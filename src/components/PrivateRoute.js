import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useThisContext } from '../context';

const PrivateRoute = ({ children, ...rest }) => {
    const { userEmail = true } = useThisContext();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                true ? (
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