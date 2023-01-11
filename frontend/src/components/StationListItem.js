import React, { Component } from 'react';
import {Grid, ListItem} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

class Journey extends Component {
    render() {
        return (
            <ListItem>
                <Grid container>
                    <Grid xs={3}>{this.props.station.nameFI}</Grid>
                    <Grid xs={3}>{this.props.station.addressFI}</Grid>
                    <Grid xs={2}>{this.props.station.cityFI}</Grid>
                    <Grid xs={2}>{this.props.station.operator}</Grid>
                    <Grid xs={2}>{this.props.station.capacity}</Grid>
                </Grid>
            </ListItem>
        )
    }
}

export default Journey;