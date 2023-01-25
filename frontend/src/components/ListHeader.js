import {Grid, ListItem} from "@mui/material";

const ListHeader = ({headers, handleSortChange, currentSortField, currentlySortDescending}) => {
    return (<ListItem>
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
    </ListItem>)
}

const ListHeaderItem = ({
                            displayName,
                            size,
                            searchField,
                            handleSortChange,
                            currentSortField,
                            currentlySortDescending
                        }) => {
    return (<Grid item onClick={(e) => handleSortChange(searchField)} xs={size}>
        {displayName}{currentSortField === searchField && (currentlySortDescending ? ' ↑' : ' ↓')}
    </Grid>)
}

export default ListHeader;