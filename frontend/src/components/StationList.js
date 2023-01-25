import React, {Component} from 'react';
import StationListItem from "./StationListItem";
import {Divider, Grid, ListItem} from "@mui/material";
import ListWithPagination from "./ListWithPagination";
import {Link, Outlet, useLoaderData, useSearchParams} from "react-router-dom";
import ListHeader from "./ListHeader";


export async function loader({request}) {
    const url = new URL(request.url);
    console.log(url)
    return fetch(`http://localhost:8080/stations${url.search}`)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            return data
        });
}

const StationList = () => {

    let {pageCount, stations} = useLoaderData()

    let [searchParams, setSearchParams] = useSearchParams();

    const handleItemCountChange = (selectedOption) => {
        searchParams.set("page", 0);
        searchParams.set("itemsPerPage", selectedOption.props.value);
        setSearchParams(searchParams);
    };

    const handlePageChange = (value) => {
        searchParams.set("page", value - 1);
        setSearchParams(searchParams);
        console.log(searchParams.get("page"))
    };

    const newSortOrder = (newSortField) => {
        if (newSortField !== searchParams.get("sortField")) {
            return searchParams.get("sortOrder")
        } else {
            if (searchParams.get("sortOrder") === "asc") {
                return "desc"
            } else {
                return "asc"
            }
        }
    }

    const handleSortChange = (sortField, e) => {
        searchParams.set("sortOrder", newSortOrder(sortField))
        searchParams.set("sortField", sortField)
        setSearchParams(searchParams)
    };

    function handleStationSelect(station, e) {
        console.log(station)
    }

    let stationItems = stations.map((station) => <StationListItem key={station.id} station={station}
                                                                  linkTo={`/stations/${station.id}?${searchParams}`}/>)
    const headers = [
        {
            searchField: "nameFI",
            name: "Name",
            size: 3
        },
        {
            searchField: "addressFI",
            name: "Address",
            size: 4
        },
        {
            searchField: "cityFI",
            name: "City",
            size: 2
        },
        {
            searchField: "operator",
            name: "Operator",
            size: 2
        },
        {
            searchField: "capacity",
            name: "Capacity",
            size: 1
        },
    ]
    return (
        <Grid container>
            <Grid item xs={6} paddingX={5}>
                <ListWithPagination itemName="Station" itemsPerPage={searchParams.get("itemsPerPage")}
                                    page={parseInt(searchParams.get("page")) + 1}
                                    pageCount={pageCount} onItemCountChange={handleItemCountChange}
                                    onPageChange={handlePageChange}>
                    <ListHeader
                        handleSortChange={handleSortChange}
                        currentSortField={searchParams.get("sortField")}
                        currentlySortDescending={searchParams.get("sortOrder") === "desc"}
                        headers={headers}/>
                    <Divider/>
                    {stationItems}
                </ListWithPagination>
            </Grid>
            <Grid item xs={6} paddingRight={5}>
                <Outlet/>
            </Grid>
        </Grid>)


}

export default StationList;