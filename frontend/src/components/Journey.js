import React, { Component } from 'react';
import {Grid} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

class Journey extends Component {
    render() {
        return (
            <Grid container>
                <Grid xs={5}>{this.props.journey.departureStation.nameEN}</Grid>
                <Grid xs={1}><DoubleArrowIcon/></Grid>
                <Grid xs={4}>{this.props.journey.returnStation.nameEN}</Grid>
                <Grid xs={1}>{Math.round(this.props.journey.duration / 60)} min</Grid>
                <Grid xs={1}>{Math.round((this.props.journey.distance / 1000 + Number.EPSILON)*100)/100} km</Grid>
            </Grid>
    )
    }
}

export default Journey;