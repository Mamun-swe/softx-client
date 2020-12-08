import React from 'react';
import { checkIfLoggedIn } from '../../utils/Authenticate';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ props, children, ...rest }) {
    const loggedIn = checkIfLoggedIn()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn && loggedIn.role === rest.role ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                from: location
                            }}
                        />
                    )
            }
        />
    );
}

// https://www.youtube.com/watch?v=Y0-qdp-XBJg&t=573s
// https://www.youtube.com/watch?v=zSt5G3s3OJI
