import React, { Component } from 'react';
import Journey from "./Journey";
import {Divider, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Pagination, Select} from "@mui/material";

const options = [
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 1000, label: "1000" },
];

class JourneyList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            journeys: [],
            page : 1,
            pageCount: 10,
            itemsPerPage : 20,
            sortField: 'duration',
            sortOrderAscending: true
        };
        this.handleItemCountChange.bind(this)
    }

    fetchJourneys(){
        fetch(`http://localhost:8080/journey/list?page=${this.state.page-1}&itemsPerPage=${this.state.itemsPerPage}&sortField=${this.state.sortField}&sortOrder=${this.state.sortOrder?'asc':'desc'}`)
            .then((res) => res.json())
            .then(data => { console.log(data)
                this.setState({
                    journeys: data.journeys,
                    pageCount: data.pageCount
                });
            });
    }

    componentDidMount() {
        this.fetchJourneys()
    }

    handleItemCountChange = (e, selectedOption) => {
        console.log(`Option selected:`, selectedOption.props.value);
        this.setState({itemsPerPage: selectedOption.props.value, page:1}, this.fetchJourneys);
    };

    handlePageChange = (e, value) => {
        this.setState({page:value}, this.fetchJourneys);
        console.log(`Option selected:`, value);
    };

    handleSortChange= (sortField, e) => {
        this.setState((state, props) => ({
            sortOrder: state.sortField === sortField ? !state.sortOrder : state.sortOrder,
            sortField:sortField
        }), this.fetchJourneys);
        console.log(`Option selected:`, sortField);
    };

    render() {
        let journeys = this.state.journeys.map((journey) => <ListItem key={journey.id}><Journey  journey={journey}/></ListItem>)
        return (<div>
            <Grid container padding={2}>
            <Grid xs={2}><FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Journeys per page</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.itemsPerPage}
                    label="Journeys per page"
                    onChange={this.handleItemCountChange}
                >
                    {options.map((option) => <MenuItem value={option.value}>{option.label}</MenuItem>)}
                </Select>
            </FormControl>
            </Grid>
            <Grid xs={8}>
                <Pagination style={{margin:'auto', width:'fit-content', paddingTop:10}} count={this.state.pageCount} page={this.state.page} onChange={this.handlePageChange} />
            </Grid>
            </Grid>
            <List dense>
                <ListItem>
                <Grid container>
                    <Grid onClick={(e) => this.handleSortChange("departureStation_nameFI", e)} xs={5}>
                        Departure station{this.state.sortField==="departureStation_nameFI"&&(!this.state.sortOrder?' ↑':' ↓')}
                    </Grid>
                    <Grid xs={1}/>
                    <Grid onClick={(e) => this.handleSortChange("returnStation_nameFI", e)} xs={4}>
                        Return station{this.state.sortField==="returnStation_nameFI"&&(!this.state.sortOrder?' ↑':' ↓')}
                    </Grid>
                    <Grid onClick={(e) => this.handleSortChange("duration", e)} xs={1}>
                        Duration{this.state.sortField==="duration"&&(!this.state.sortOrder?' ↑':' ↓')}
                    </Grid>
                    <Grid onClick={(e) => this.handleSortChange("distance", e)} xs={1}>
                        Distance{this.state.sortField==="distance"&&(!this.state.sortOrder?' ↑':' ↓')}
                    </Grid>
                </Grid>
                </ListItem>
                <Divider/>
                {journeys}
            </List>
            <Pagination style={{margin:'auto', width:'fit-content'}} count={this.state.pageCount} page={this.state.page} onChange={this.handlePageChange} />
        </div>)
    }

}

export default JourneyList;