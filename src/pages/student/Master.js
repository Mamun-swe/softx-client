import React from 'react'
import { Route } from 'react-router-dom'

import HomeIndex from './home/Index'
import RequestIndex from './pendingRequests/Index'
import LibraryIndex from './library/Index'

const Master = () => {
    return (
        <div>
            <Route exact path="/student/" component={HomeIndex} />
            <Route exact path="/student/pending-requests" component={RequestIndex} />
            <Route exact path="/student/library" component={LibraryIndex} />
        </div>
    );
};

export default Master;