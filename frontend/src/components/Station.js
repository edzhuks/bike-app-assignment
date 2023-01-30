import {useLoaderData} from "react-router-dom";
import {useEffect} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import {metersToKilometers, secondsToMinutes} from "../util/formatHelper";
import PedalBikeIcon from '@mui/icons-material/PedalBike';
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

    return (
        <div className={"station-side station-left"}>
            {journeys < 1 && <p><br/></p>}
            <p>Total {journeys} journeys</p>
            {journeys > 0 &&
                <p>
                    Average: {metersToKilometers(avgDistance)} km - {secondsToMinutes(avgDuration)} min
                </p>}
            <div className={"right-chev"}/>
            {topStations.length > 0 &&
                <div>
                    < h4 style={{marginTop: 5, marginBottom: 5}}>
                        Top {Math.min(topStations.length, 5)} {to ? "departure" : "return"} stations
                    </h4>
                    <p style={{marginTop: 5, marginBottom: 0}}>
                        {topStations.map((station) =>
                            <span key={station.id}>{station.nameFI}<br/></span>
                        )}
                    </p>
                </div>
            }
        </div>
    )
}

const RecenterAutomatically = ({lat, lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng]);
    return null;
}

const Station = () => {

    const stationData = useLoaderData()

    return (
        <div style={{width: '100%'}}>
            <Paper sx={{p: 4}}>
                <Typography component="h2" variant="h6" color="primary">{stationData.station.nameFI}</Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <ToOrFromStationInfo stationData={stationData} to={true}/>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={"station-block"}>
                            <p>
                                <PlaceIcon color="primary"/>
                                {stationData.station.addressFI}
                            </p>
                            <Typography style={{fontSize: 25}} component="p" variant="h6" gutterBottom>
                                {stationData.station.capacity}
                                <PedalBikeIcon fontSize={"large"} style={{verticalAlign: "bottom", paddingLeft: 10}}
                                               color="primary"/>
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={4} className={"station-side station-right"}>
                        <ToOrFromStationInfo stationData={stationData} to={false}/>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{p: 4, mt: 4}}>
                <MapContainer style={{height: 400, width: '100%'}}
                              center={stationData.station.latitude ? [stationData.station.latitude, stationData.station.longitude] : [60.1699, 24.9384]}
                              zoom={13}
                              scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {stationData.station.latitude !== 0 &&
                        <Marker position={[stationData.station.latitude, stationData.station.longitude]}>
                            <Popup>
                                {stationData.station.addressFI}
                            </Popup>
                        </Marker>}
                    <RecenterAutomatically
                        lat={stationData.station.latitude !== 0 ? stationData.station.latitude : 60.1699}
                        lng={stationData.station.longitude !== 0 ? stationData.station.longitude : 24.9384}/>
                </MapContainer>
            </Paper>
        </div>

    )
}

export default Station;
