import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import FormPage from "../Pages/FormPage/FormPage";
import TablePage from "../Pages/TablePage/TablePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "" , element: <HomePage />},
            {path: "/home" , element: <HomePage />},
            {path: "form" , element: <FormPage />},
            {path: "table" , element: <TablePage />}
        ]
    }
])

