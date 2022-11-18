import {createBrowserRouter} from "react-router-dom"
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main"
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import AllUsers from "../../pages/DashBoard/AllUsers/AllUsers";
import DashBoard from "../../pages/DashBoard/DashBoard/DashBoard";
import MyAppointment from "../../pages/DashBoard/MyAppointment/MyAppointment";
import Home from "../../pages/Home/Home/Home"
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

 const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element:<Appointment></Appointment>
            }
        ]
     },
     {
         path: '/dashboard',
         element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
         children: [
             {
                 path: '/dashboard',
                 element:<MyAppointment></MyAppointment>
             },
             {
                 path: '/dashboard/users',
                 element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
             }

         ]
     }
 ])

export default router;