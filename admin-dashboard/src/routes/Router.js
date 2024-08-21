import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/login/Login";
import ProtectedRoute from "../components/protectedRoutes/ProtectedRoute";
import ForgotLayout from "../views/forgot/ForgotLayout";

//********* Without Login Pages */

const Register = lazy(() => import("../views/register/Register"));
const ForgotPassword = lazy(() => import("../views/forgot/ForgotPassword"));
const OTPVerification = lazy(() => import("../views/forgot/OTPVerification"));
const NewPassword = lazy(() => import("../views/forgot/NewPassword"));

//*********  Pages   *********/
const Home = lazy(() => import("../views/Home"));
const About = lazy(() => import("../views/About"));
const Settings = lazy(() => import("../views/Settings"));
const Events = lazy(() => import("../views/Events"));
const HelpAndSupport = lazy(() => import("../views/HelpAndSupport"));
const Profile = lazy(() => import("../views/profile/Profile"));



//******** Complete Layout  ********/
const FullLayout = lazy(() => import("../layouts/FullLayout"));

//****** Routes *******/
const Routers = [
    {
        path: "/login",
        element: <Login />,
        index: true
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/forgot",
        element: <ForgotLayout />,
        children: [
            { path: "/forgot/", element: < ForgotPassword />, index: true },
            { path: "forgotPassword", element: <ForgotPassword /> },
            { path: "otp", element: <OTPVerification /> },
            { path: "newPassword", element: <NewPassword /> },
        ]
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute Comp={FullLayout} />,
        children: [
            { path: "/dashboard/", element: <Navigate to="home" />, index: true },
            { path: "home", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "event", element: <Events /> },
            { path: "setting", element: <Settings /> },
            { path: "helpandsupport", element: <HelpAndSupport /> },
            { path: "profile", element: <Profile /> },
            { path: "*", element: <Navigate to="home" /> },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
];



export default Routers;