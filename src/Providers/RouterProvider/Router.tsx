import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../../Pages/Home/Home";
import Registration from "../../Pages/Registration/Registration";
import Profile from "../../Pages/Profile/Profile";
import Projects from "../../Pages/Projects/List/List";
import ProjectCreate from "../../Pages/Projects/Create/Create";
import ProjectEdit from "../../Pages/Projects/Edit/Edit";
import ProjectShow from "../../Pages/Projects/Show/Show";

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

    {
        path: '/projects',
        children: [
            {
                index: true,
                element: <Projects />
            },
            {
                path: "create",
                element: <ProjectCreate/>
            },
            {
                path: ":id/edit",
                element: <ProjectEdit />
            },
            {
                path: ":id/show",
                element: <ProjectShow />
            },
        ]
    },
])


const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;