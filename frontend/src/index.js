import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import JourneyList, {loader as journeyListLoader} from "./components/JourneyList";
import StationList, {loader as stationListLoader} from "./components/StationList";
import Station, {loader as stationLoader} from "./components/Station";

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
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
