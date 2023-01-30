import {Grid, ListItem} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {metersToKilometers, secondsToMinutes} from "../util/formatHelper";
import {Link} from "react-router-dom";

const Journey = ({journey, linkToDeparture, linkToReturn}) => {

    return (
        <ListItem>
            <Grid container>
                <Grid item xs={4}>
                    <Link to={linkToDeparture}>
                        {journey.departureStationName}
                    </Link>
                </Grid>
                <Grid item xs={1}><DoubleArrowIcon color="primary"/>
                </Grid>
                <Grid item xs={3}>
                    <Link to={linkToReturn}>
                        {journey.returnStationName}
                    </Link>
                </Grid>
                <Grid item xs={2}>{secondsToMinutes(journey.duration)} min</Grid>
                <Grid item xs={2}>{metersToKilometers(journey.distance)} km</Grid>
            </Grid>
        </ListItem>
    )
}

export default Journey;