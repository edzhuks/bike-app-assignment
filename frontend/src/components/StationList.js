import React, { Component } from 'react';
import StationListItem from "./StationListItem";
import {Divider, Grid, ListItem} from "@mui/material";
import ListWithPagination from "./ListWithPagination";


class JourneyList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            page : 1,
            pageCount: 10,
            itemsPerPage : 20,
            sortField: 'capacity',
            sortOrderAscending: true
        };
        this.handleItemCountChange.bind(this)
    }

    fetchStations(){
        fetch(`http://localhost:8080/station/list?page=${this.state.page-1}&itemsPerPage=${this.state.itemsPerPage}&sortField=${this.state.sortField}&sortOrder=${this.state.sortOrder?'asc':'desc'}`)
            .then((res) => res.json())
            .then(data => { console.log(data)
                this.setState({
                    stations: data.stations,
                    pageCount: data.pageCount
                });
            });
    }

    componentDidMount() {
        this.fetchStations()
    }

    handleItemCountChange = (selectedOption) => {
        console.log(`Option selected:`, selectedOption);
        this.setState({itemsPerPage: selectedOption.props.value, page:1}, this.fetchStations);
    };

    handlePageChange = (value) => {
        this.setState({page:value}, this.fetchStations);
        console.log(`Option selected:`, value);
    };

    handleSortChange= (sortField, e) => {
        this.setState((state, props) => ({
            sortOrder: state.sortField === sortField ? !state.sortOrder : state.sortOrder,
            sortField:sortField
        }), this.fetchStations);
        console.log(`Option selected:`, sortField);
    };

    render() {
        let stations = this.state.stations.map((station) => <StationListItem key={station.id} station={station}/>)
        return (<div>
            <ListWithPagination itemName="Station" itemsPerPage={this.state.itemsPerPage} page={this.state.page} pageCount={this.state.pageCount} onItemCountChange={this.handleItemCountChange} onPageChange={this.handlePageChange}>
                <ListItem>
                    <Grid container>
                        <Grid onClick={(e) => this.handleSortChange("nameFI", e)} xs={3}>
                            Name{this.state.sortField==="nameFI"&&(!this.state.sortOrder?' ↑':' ↓')}
                        </Grid>
                        <Grid onClick={(e) => this.handleSortChange("addressFI", e)} xs={3}>
                            Address{this.state.sortField==="addressFI"&&(!this.state.sortOrder?' ↑':' ↓')}
                        </Grid>
                        <Grid onClick={(e) => this.handleSortChange("cityFI", e)} xs={2}>
                            City{this.state.sortField==="cityFI"&&(!this.state.sortOrder?' ↑':' ↓')}
                        </Grid>
                        <Grid onClick={(e) => this.handleSortChange("operator", e)} xs={2}>
                            Operator{this.state.sortField==="operator"&&(!this.state.sortOrder?' ↑':' ↓')}
                        </Grid>
                        <Grid onClick={(e) => this.handleSortChange("capacity", e)} xs={2}>
                            Capacity{this.state.sortField==="capacity"&&(!this.state.sortOrder?' ↑':' ↓')}
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider/>
                {stations}
            </ListWithPagination>
            {/*<Pagination style={{margin:'auto', width:'fit-content'}} count={this.state.pageCount} page={this.state.page} onChange={this.handlePageChange} />*/}
        </div>)
    }

}

export default JourneyList;