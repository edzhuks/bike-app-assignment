import React, { Component } from 'react';
import Journey from "./Journey";
import {Divider, Grid, ListItem} from "@mui/material";
import ListWithPagination from "./ListWithPagination";


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

    handleItemCountChange = (selectedOption) => {
        console.log(`Option selected:`, selectedOption);
        this.setState({itemsPerPage: selectedOption.props.value, page:1}, this.fetchJourneys);
    };

    handlePageChange = (value) => {
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
            <ListWithPagination itemName="Journey" itemsPerPage={this.state.itemsPerPage} page={this.state.page} pageCount={this.state.pageCount} onItemCountChange={this.handleItemCountChange} onPageChange={this.handlePageChange}>
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
            </ListWithPagination>
            {/*<Pagination style={{margin:'auto', width:'fit-content'}} count={this.state.pageCount} page={this.state.page} onChange={this.handlePageChange} />*/}
        </div>)
    }

}

export default JourneyList;