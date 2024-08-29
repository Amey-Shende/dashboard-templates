import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/login/Login";
import ProtectedRoute from "../components/protectedRoutes/ProtectedRoute";
import ForgotLayout from "../views/forgot/ForgotLayout";

//********* Without Login Pages */

const Register = lazy(() => import("../views/register/Register"));
const ForgotPassword = lazy(() => import("../views/forgot/ForgotPassword"));
const OTPVerification = lazy(() => import("../views/forgot/OTPVerification"));
const SetNewPassword = lazy(() => import("../views/forgot/SetNewPassword"));

//*********  Pages   *********/
const Home = lazy(() => import("../views/Home"));
const About = lazy(() => import("../views/About"));
const Settings = lazy(() => import("../views/Settings"));
const Events = lazy(() => import("../views/Events"));
const HelpAndSupport = lazy(() => import("../views/HelpAndSupport"));

//** Profile Related pages */
const Profile = lazy(() => import("../views/profile/Profile"));
const ChangePassword = lazy(() => import("../views/profile/ChangePassword"));



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
            { path: "setNewPassword", element: <SetNewPassword /> },
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

            // ***** profile related ****
            { path: "profile", element: <Profile /> },
            { path: "changePassword", element: <ChangePassword /> },
            
            { path: "*", element: <Navigate to="home" /> },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
];



export default Routers;