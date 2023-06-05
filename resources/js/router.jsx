import { createBrowserRouter } from "react-router-dom"
import GuestLayout from "./layouts/GuestLayout"
import ProtectedLayout from "./layouts/ProtectedLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"
import Profile from "./pages/Profile"





const router = createBrowserRouter([
    {
        path:'/',
        element:<GuestLayout />,
        children:[
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }   
        ]
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children:[
            {
				path: '/about',
				element: <About />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
        ]
    }
]);

export default router;