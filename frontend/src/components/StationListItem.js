import {Grid, ListItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const StationListItem = ({station, linkTo}) => {
    return (
        <ListItem>
            <Grid container>
                <Grid item xs={3}>
                    <Link to={linkTo}>
                        <Typography variant="body2" component="p">
                            {station.nameFI}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2" component="p">
                        {station.addressFI}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body2" component="p">
                        {station.cityFI}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body2" component="p">
                        {station.operator}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body2" component="p">
                        {station.capacity}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default StationListItem;