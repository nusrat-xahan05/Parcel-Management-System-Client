import App from "@/App";
import Banner from "@/components/modules/HomePage/Banner";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Banner,
                index: true,
            },
        ]
    },
]);