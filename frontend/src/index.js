import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import JourneyList, {loader as journeyListLoader} from "./components/JourneyList";
import StationList, {loader as stationListLoader} from "./components/StationList";
import Station, {loader as stationLoader} from "./components/Station";
import DataUploadPage from "./components/DataUpload"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "journeys",
                element: <JourneyList/>,
                loader: journeyListLoader
            },
            {
                path: "stations",
                element: <StationList/>,
                loader: stationListLoader,
                children:[
                    {
                        path: ":id",
                        element: <Station/>,
                        loader: stationLoader
                    }
                ]
            },
            {
                path: "upload",
                element: <DataUploadPage/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
        <RouterProvider router={router}/>
);
