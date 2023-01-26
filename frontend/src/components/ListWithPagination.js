import React, {Component} from 'react';
import {FormControl, Grid, InputLabel, List, MenuItem, Pagination, Select} from "@mui/material";

const options = [
    {value: 30, label: "30"},
    {value: 50, label: "50"},
    {value: 100, label: "100"},
    {value: 1000, label: "1000"},
];

const ListWithPagination = ({page, pageCount, itemsPerPage, children, onItemCountChange, onPageChange, itemName}) => {

    const handleItemCountChange = (e, selectedOption) => {
        console.log(`Option selected:`, selectedOption.props.value);
        onItemCountChange(selectedOption)
    };

    const handlePageChange = (e, value) => {
        onPageChange(value)
        console.log(`Option selected:`, value);
    };

    return (<div>
        <Grid container padding={2}>
            <Grid xs={2} item><FormControl fullWidth>
                <InputLabel id="item-count-select-label">{itemName}s per page</InputLabel>
                <Select
                    labelId="item-count-select-label"
                    id="item-count-select"
                    value={itemsPerPage}
                    label="Journeys per page"
                    onChange={handleItemCountChange}
                >
                    {options.map((option) => <MenuItem key={option.value}
                                                       value={option.value}>{option.label}</MenuItem>)}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={8}>
                <Pagination style={{margin: 'auto', width: 'fit-content', paddingTop: 10}}
                            count={pageCount} page={page} onChange={handlePageChange}/>
            </Grid>
        </Grid>
        <List dense>
            {children}
        </List>
        <Pagination style={{margin: 'auto', width: 'fit-content'}} count={pageCount}
                    page={page} onChange={handlePageChange}/>
    </div>)


}

export default ListWithPagination;