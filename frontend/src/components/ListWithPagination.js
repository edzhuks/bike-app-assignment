import React, { Component } from 'react';
import {FormControl, Grid, InputLabel, List, MenuItem, Pagination, Select} from "@mui/material";

const options = [
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 1000, label: "1000" },
];

class ListWithPagination extends Component {


    constructor(props) {
        super(props);

        this.handleItemCountChange.bind(this)
        this.handlePageChange.bind(this)
    }

    handleItemCountChange = (e, selectedOption) => {
        console.log(`Option selected:`, selectedOption.props.value);
        this.props.onItemCountChange(selectedOption)
    };

    handlePageChange = (e, value) => {
        this.props.onPageChange(value)
        console.log(`Option selected:`, value);
    };

    render() {
        return (<div>
            <Grid container padding={2}>
                <Grid xs={2}><FormControl fullWidth>
                    <InputLabel id="item-count-select-label">{this.props.itemName}s per page</InputLabel>
                    <Select
                        labelId="item-count-select-label"
                        id="item-count-select"
                        value={this.props.itemsPerPage}
                        label="Journeys per page"
                        onChange={this.handleItemCountChange}
                    >
                        {options.map((option) => <MenuItem value={option.value}>{option.label}</MenuItem>)}
                    </Select>
                </FormControl>
                </Grid>
                <Grid xs={8}>
                    <Pagination style={{margin:'auto', width:'fit-content', paddingTop:10}} count={this.props.pageCount} page={this.props.page} onChange={this.handlePageChange} />
                </Grid>
            </Grid>
            <List dense>
                {this.props.children}
            </List>
            <Pagination style={{margin:'auto', width:'fit-content'}} count={this.props.pageCount} page={this.props.page} onChange={this.handlePageChange} />
        </div>)
    }

}

export default ListWithPagination;