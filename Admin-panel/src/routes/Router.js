import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/login/Login";
import ProtectedRoute from "../components/protectedRoutes/ProtectedRoute";

//********* Without Login Pages */
const ForgotLayout = lazy(() => import("../views/forgot/ForgotLayout"));
const ForgotPassword = lazy(() => import("../views/forgot/ForgotPassword"));
const OTPVerification = lazy(() => import("../views/forgot/OTPVerification"));
const SetNewPassword = lazy(() => import("../views/forgot/SetNewPassword"));

//*********  Pages   *********/
const Home = lazy(() => import("../views/home/Home"));
const Users = lazy(() => import("../views/users/Users"));
const UsersProfile = lazy(() => import("../views/users/UserProfile"));
const Events = lazy(() => import("../views/events/Events"));
const WishList = lazy(() => import("../views/wishlist/WishList"));

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
            { path: "users", element: <Users /> },
            { path: "userProfile", element: <UsersProfile /> },
            { path: "event", element: <Events /> },
            { path: "wishlist", element: <WishList /> },

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