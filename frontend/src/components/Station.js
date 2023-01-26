import {Form, useLoaderData, useParams} from "react-router-dom";
import React, {Component, useEffect} from 'react';
import {Grid, ListItem, Paper} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PlaceIcon from '@mui/icons-material/Place';
import {metersToKilometers, secondsToMinutes} from "../util/formatHelper";
import StationListItem from "./StationListItem";
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import {SpaceBar} from "@mui/icons-material";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'

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

const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng]);
    return null;
}

const Station = () => {

    const stationData = useLoaderData()


    return (

        <div style={{width:'100%'}}>
            <Paper sx={{p:4}}>
            <Grid container>
                <Grid item xs={4} className={"station-side station-left"}>
                    <ToOrFromStationInfo stationData={stationData} to={true}/>
                </Grid>
                <Grid item xs={4} className={"station-block"}>
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
                <Grid item xs={4} className={"station-side station-right"}>
                    <ToOrFromStationInfo stationData={stationData} to={false}/>
                </Grid>
            </Grid>
            </Paper>
            <Paper sx={{p:4, mt:4}}>
            <MapContainer style={{height:600, width:'100%'}} center={[stationData.station.latitude, stationData.station.longitude]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[stationData.station.latitude, stationData.station.longitude]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <RecenterAutomatically lat={stationData.station.latitude} lng={stationData.station.longitude} />
            </MapContainer>
            </Paper>
        </div>

    )
}

export default Station;
