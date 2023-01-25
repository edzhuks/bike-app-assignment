import React, {Component} from 'react';
import Journey from "./Journey";
import {Divider, Grid, ListItem} from "@mui/material";
import ListWithPagination from "./ListWithPagination";
import {useLoaderData, useSearchParams} from "react-router-dom";
import ListHeader from "./ListHeader";


export async function loader({request}) {
    const url = new URL(request.url);
    console.log(url)
    return fetch(`http://localhost:8080/journeys${url.search}`)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            return data
        });
}

const JourneyList = () => {

    let {pageCount, journeys} = useLoaderData()

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


    let journeyitems = journeys.map((journey) => <Journey key={journey.id} journey={journey}/>)

    const headers = [
        {
            searchField: "departureStationName",
            name: "Departure",
            size: 6
        },
        {
            searchField: "returnStationName",
            name: "Return",
            size: 4
        },
        {
            searchField: "duration",
            name: "Duration",
            size: 1
        },
        {
            searchField: "distance",
            name: "Distance",
            size: 1
        },
    ]

    return (<div>
        {journeys ?
        <ListWithPagination itemName="Journey" itemsPerPage={searchParams.get("itemsPerPage")}
                            page={parseInt(searchParams.get("page")) + 1}
                            pageCount={pageCount} onItemCountChange={handleItemCountChange}
                            onPageChange={handlePageChange}>

            <ListHeader
                handleSortChange={handleSortChange}
                currentSortField={searchParams.get("sortField")}
                currentlySortDescending={searchParams.get("sortOrder") === "desc"}
                headers={headers}/>
            <Divider/>
            {journeyitems}
        </ListWithPagination>
            :
            <p>No journeys found</p>}
    </div>)


}

export default JourneyList;