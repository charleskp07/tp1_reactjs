import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../../Pages/Home/Home";
import Registration from "../../Pages/Registration/Registration";
import Profile from "../../Pages/Profile/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    }, 
    {
        path: '/registration',
        element: <Registration />
    },

    {
        path: '/profile',
        element: <Profile />
    },
])


const Router = () => {
    return(
        <RouterProvider router={router}/>
    )
}

export default Router;