

import {createBrowserRouter} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Showusers from './components/Showusers';
import Editusers from './components/Editusers';
import LoginSuccess from './components/LoginSuccess';


 const projectRoute = createBrowserRouter([
            {
                 path: '/',
                element:<Register/>
            },
            {
                 path: '/login',
                element:<Login/>
            },
            {
                path : '/show-users',
                element : <Showusers/>
            },
            {
                path : "/edit-users/:userid",
                element :<Editusers/>
            },
            {
                path : "/loginSuccess",
                element :<LoginSuccess/>
            }
           
 ])

 export default projectRoute;

