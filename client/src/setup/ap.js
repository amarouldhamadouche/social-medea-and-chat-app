
import Profil from './pages/profil/profil.jsx'
import Home from './pages/home/home'
import Login from './pages/Login/Login'
import Register from './pages/register/register'
import Messenger from './pages/messenger/messenger'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext } from './contexs/AuthContex.js';
import {useContext} from 'react'
 function App()
{
  const {user} = useContext(AuthContext)
 return(
 <>
 <Router>
 <Switch>
<Route exact path = "/">
  {user?<Home/>:<Login/>}
</Route>
<Route path="/profile/:username">
    { user ? <Profil/> : <Login/>}
  </Route>
  <Route path="/login"> {user ? <Redirect to ="/"/> : <Login/>}
  </Route>
  <Route path="/register">
    {user ? <Redirect to ="/"/> : <Register/> }
  </Route>
  <Route path="/messenger">
    {!user ? <Redirect to ="/"/> : <Messenger/> }
  </Route>
  </Switch>
  </Router>
  </>
  )
}
export default App
