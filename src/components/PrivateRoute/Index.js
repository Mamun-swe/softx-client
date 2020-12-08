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


