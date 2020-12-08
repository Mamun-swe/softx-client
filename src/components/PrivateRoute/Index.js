import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Authenticate from '../../utils/Authenticate'

export default function PrivateRoute({ component: Component, ...rest }) {
  
    return (
        <Route {...rest}
            render={({ location }) =>
                loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/"
                            }}
                        />
                    )
            }
        />
    );
}

// https://www.youtube.com/watch?v=Y0-qdp-XBJg&t=573s
// https://www.youtube.com/watch?v=zSt5G3s3OJI
