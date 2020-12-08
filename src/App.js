import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'

import StudentMaster from './pages/student/Master'
import LibrarianMaster from './pages/librarian/Master'
import PrivateRoute from './components/PrivateRoute/Index'
import Authorization from './utils/Authenticate'

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />

          <PrivateRoute path="/student" component={StudentMaster} />
          <PrivateRoute path="/librarian" component={LibrarianMaster} />


          {/* <PrivateRoute path="/student" component={Authorization(StudentMaster, ["student"])} />
          <PrivateRoute path="/librarian" component={Authorization(LibrarianMaster, ["librarian"])} /> */}

        </Switch>
      </Router>
    </div>
  );
}

export default App;
