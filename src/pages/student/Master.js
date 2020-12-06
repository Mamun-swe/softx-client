import React from 'react'
import { Route } from 'react-router-dom'

import HomeIndex from './home/Index'
import RequestIndex from './pendingRequests/Index'
import LibraryIndex from './library/Index'
import ShowBook from './library/Show'

const Master = () => {
    return (
        <div>
            <Route exact path="/student/" component={HomeIndex} />
            <Route exact path="/student/pending-requests" component={RequestIndex} />
            <Route exact path="/student/library" component={LibraryIndex} />
            <Route exact path="/student/book/:id/show" component={ShowBook} />
        </div>
    );
};

export default Master;