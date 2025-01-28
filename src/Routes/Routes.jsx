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
import AllPets from "../Pages/Dashboard/AllPets/AllPets";
import UpdatePet from "../Pages/Dashboard/UpdatePet/UpdatePet";
import MyAddedPets from "../Pages/Dashboard/MyAddedPets/MyAddedPets";
import PetListing from "../Pages/PetListing/PetListing";
import CreateDonationCampaign from "../Pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaign from "../Pages/Dashboard/MyDonationCampaign/MyDonationCampaign";
import UpdateCampaign from "../Pages/Dashboard/UpdateCampaign/UpdateCampaign";
import AllCampaigns from "../Pages/Dashboard/AllCampaigns/AllCampaigns";

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
            path:'/petListing',
            element:<PetListing></PetListing>
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
            element:<DonationCampaigns></DonationCampaigns>
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
          path:'myAddedPets',
          element:<MyAddedPets></MyAddedPets>
          //element:<AdminRoute><AddPet></AddPet></AdminRoute>
        },
        {
          path:'myAddedPets',
          element:<MyAddedPets></MyAddedPets>
          //element:<AdminRoute><AddPet></AddPet></AdminRoute>
        },
        {
          path:'createDonation',
          element:<PrivateRoute><CreateDonationCampaign></CreateDonationCampaign></PrivateRoute>
        },
        {
          path:'myDonationCampaign',
          element:<PrivateRoute><MyDonationCampaign></MyDonationCampaign></PrivateRoute>
        },
        {
          path:'allcampaigns',
          element:<PrivateRoute><AllCampaigns></AllCampaigns></PrivateRoute>
        },
        {
          path:'updateCampaign/:id',
          element:<UpdateCampaign></UpdateCampaign>,
          loader: ({params})=> fetch(`http://localhost:5000/campaigns/${params.id}`)
        },
        {
          path:'allpets',
          element:<AdminRoute><AllPets></AllPets></AdminRoute>
        },
        {
          path:'updatePet/:id',
          element:<UpdatePet></UpdatePet>,
          loader: ({params})=> fetch(`http://localhost:5000/pets/${params.id}`)
        },
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    }
  ]);