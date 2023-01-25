import React, {Component} from 'react';
import {Grid, ListItem} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {Link} from "react-router-dom";

const StationListItem = ({station, linkTo}) => {
    return (
        <ListItem>
            <Grid container>
                <Grid item xs={3}>
                    <Link to={linkTo}>
                        {station.nameFI}
                    </Link>
                </Grid>
                <Grid item xs={4}>{station.addressFI}</Grid>
                <Grid item xs={2}>{station.cityFI}</Grid>
                <Grid item xs={2}>{station.operator}</Grid>
                <Grid item xs={1}>{station.capacity}</Grid>
            </Grid>
        </ListItem>
    )
}

export default StationListItem;