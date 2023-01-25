import {Form, useLoaderData, useParams} from "react-router-dom";
import React, {Component} from 'react';
import {Grid, ListItem} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PlaceIcon from '@mui/icons-material/Place';
import {metersToKilometers, secondsToMinutes} from "../util/formatHelper";
import StationListItem from "./StationListItem";
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import {SpaceBar} from "@mui/icons-material";

export async function loader({params}) {
    return fetch(`http://localhost:8080/stations/${params.id}`)
        .then((res) => res.json())
        .then(data => {
            return data
        });
}

const ToOrFromStationInfo = ({stationData, to}) => {

    const journeys = to ? stationData.journeysToStation : stationData.journeysFromStation
    const avgDistance = to ? stationData.averageDistanceTo : stationData.averageDistanceFrom
    const avgDuration = to ? stationData.averageDurationTo : stationData.averageDurationFrom
    const topStations = to ? stationData.popularSources : stationData.popularDestinations

    return (<div>
        {journeys < 1 && <p><br/></p>}
        <p>
            Total {journeys} journeys
        </p>
        {journeys > 0 && <p>
            Average: {metersToKilometers(avgDistance)} km
            - {secondsToMinutes(avgDuration)} min
        </p>}
        <div className={"right-chev"}/>
        {topStations.length > 0 &&
            <div>
                < h4 style={{marginTop: 5, marginBottom: 5}}>Top {Math.min(topStations.length,5)} {to ? "departure" : "return"} stations</h4>
                <p style={{marginTop: 5}}>
            {topStations.map((station) =>
                <span key={station.id}>
            {station.nameFI}<br/>
                </span>)}
                </p>
            </div>
        }
    </div>)
}

const Station = () => {

    const stationData = useLoaderData()
    return (

        <div>
            <Grid container>
                <Grid xs={4} className={"station-side station-left"}>
                    <ToOrFromStationInfo stationData={stationData} to={true}/>
                </Grid>
                <Grid xs={4} className={"station-block"}>
                    <div>
                        <h2>{stationData.station.nameFI}</h2>
                        <p>
                            <PlaceIcon/>
                            {stationData.station.addressFI}
                        </p>
                        <p style={{fontSize: 25}}>
                            {stationData.station.capacity}
                            <PedalBikeIcon fontSize={"large"} style={{verticalAlign: "bottom", paddingLeft: 10}}/>
                        </p>
                    </div>
                </Grid>
                <Grid xs={4} className={"station-side station-right"}>
                    <ToOrFromStationInfo stationData={stationData} to={false}/>
                </Grid>
            </Grid>
        </div>

    )
}

export default Station;
