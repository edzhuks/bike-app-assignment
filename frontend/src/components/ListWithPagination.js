import {FormControl, Grid, InputLabel, List, MenuItem, Pagination, Select, Typography} from "@mui/material";

const options = [
    {value: 30, label: "30"},
    {value: 50, label: "50"},
    {value: 100, label: "100"},
    {value: 1000, label: "1000"},
];

const ListWithPagination = ({page, pageCount, itemsPerPage, children, onItemCountChange, onPageChange, itemName}) => {

    const handleItemCountChange = (e, selectedOption) => {
        onItemCountChange(selectedOption)
    };

    const handlePageChange = (e, value) => {
        onPageChange(value)
    };

    return (
        <div>
            <Grid container>
                <Grid xs={2} item>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>{itemName}s</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Pagination style={{margin: 'auto', width: 'fit-content', paddingTop: 10}}
                                color="primary"
                                count={pageCount}
                                page={page}
                                onChange={handlePageChange}/>
                </Grid>
                <Grid xs={2} item>
                    <FormControl fullWidth>
                        <InputLabel id="item-count-select-label">{itemName}s per page</InputLabel>
                        <Select
                            labelId="item-count-select-label"
                            id="item-count-select"
                            value={itemsPerPage}
                            label={`${itemName}s per page`}
                            onChange={handleItemCountChange}
                        >
                            {options.map((option) =>
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <List dense>
                {children}
            </List>
            <Pagination style={{margin: 'auto', width: 'fit-content'}}
                        count={pageCount}
                        color="primary"
                        page={page}
                        onChange={handlePageChange}/>
        </div>
    )
}

export default ListWithPagination;