import {Grid, ListItem, Typography} from "@mui/material";

const ListHeader = ({headers, handleSortChange, currentSortField, currentlySortDescending}) => {
    return (
        <ListItem>
            <Grid container>
                {headers.map(h => <ListHeaderItem
                    key={h.name}
                    searchField={h.searchField}
                    displayName={h.name}
                    size={h.size}
                    currentlySortDescending={currentlySortDescending}
                    currentSortField={currentSortField}
                    handleSortChange={handleSortChange}/>)}
            </Grid>
        </ListItem>
    )
}

const ListHeaderItem = ({
                            displayName,
                            size,
                            searchField,
                            handleSortChange,
                            currentSortField,
                            currentlySortDescending
                        }) => {
    return (
        <Grid sx={{cursor: "pointer"}} item
              onClick={(e) => handleSortChange(searchField)} xs={size}>
            <Typography component="a"
                        tabIndex="0"
                        role="link"
                        variant="body1"
                        sx={{fontWeight: 500}}
                        color="primary">
                {displayName}{currentSortField === searchField && (currentlySortDescending ? ' ↑' : ' ↓')}
            </Typography>
        </Grid>)
}

export default ListHeader;