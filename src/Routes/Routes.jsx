import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AddPet from "../Pages/Dashboard/AddPet/AddPet";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/donation-campaigns',
            element:<PrivateRoute><DonationCampaigns></DonationCampaigns></PrivateRoute>
          }
      ]
    },
    {
      path:'dashboard',
      element:<DashboardLayout></DashboardLayout>,
      children:[
        {
          path:'addpet',
          element:<AddPet></AddPet>
          //element:<AdminRoute><AddPet></AddPet></AdminRoute>
        },
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    }
  ]);