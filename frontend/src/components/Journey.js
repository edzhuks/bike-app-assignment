// import React, {Component} from 'react';
import {Grid, ListItem} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {metersToKilometers, secondsToMinutes} from "../util/formatHelper";

const Journey = ({journey}) => {

    return (
        <ListItem>
            <Grid container>
                <Grid item xs={5}>{journey.departureStationName}</Grid>
                <Grid item xs={1}><DoubleArrowIcon/></Grid>
                <Grid item xs={4}>{journey.returnStationName}</Grid>
                <Grid item xs={1}>{secondsToMinutes(journey.duration)} min</Grid>
                <Grid item xs={1}>{metersToKilometers(journey.distance)} km</Grid>
            </Grid>
        </ListItem>

    )
}

export default Journey;