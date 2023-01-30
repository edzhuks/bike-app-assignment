import {useState} from 'react';
import Journey from "./Journey";
import {Button, Divider, Grid, Paper, TextField, Typography} from "@mui/material";
import ListWithPagination from "./ListWithPagination";
import {useLoaderData, useSearchParams} from "react-router-dom";
import ListHeader from "./ListHeader";
import {Search} from "@mui/icons-material";
import {DurationSlider, DistanceSlider} from './Sliders'


export async function loader({request}) {
    const url = new URL(request.url);
    return fetch(`http://localhost:8080/journeys${url.search}`)
        .then((res) => res.json())
        .then(data => {
            return data
        });
}


const JourneyList = () => {

    const [searchFieldValues, setSearchFieldValues] = useState({departureName: "", returnName: "", eitherName: ""})

    const {pageCount, journeys} = useLoaderData()

    const [searchParams, setSearchParams] = useSearchParams();

    const handleItemCountChange = (selectedOption) => {
        setSearchParams(searchParams => {
            searchParams.set("page", 0);
            searchParams.set("itemsPerPage", selectedOption.props.value);
            return searchParams;
        });
    };

    const handlePageChange = (value) => {
        setSearchParams(searchParams => {
            searchParams.set("page", value - 1);
            return searchParams;
        });
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
        setSearchParams(searchParams => {
            searchParams.set("sortOrder", newSortOrder(sortField))
            searchParams.set("sortField", sortField)
            return searchParams;
        });
    };

    const handleDistanceSliderChange = (e, newValue) => {
        setSearchParams(searchParams => {
            if (newValue[0] > 0) {
                searchParams.set("distanceMin", (10 ** newValue[0]).toFixed(0))
            } else {
                searchParams.delete("distanceMin")
            }
            if (newValue[1] < 5) {
                searchParams.set("distanceMax", (10 ** newValue[1]).toFixed(0))
            } else {
                searchParams.delete("distanceMax")
            }
            return searchParams;
        });
    }

    const handleDurationSliderChange = (e, newValue) => {
        setSearchParams(searchParams => {
            if (newValue[0] > 0) {
                searchParams.set("durationMin", (60 ** newValue[0]).toFixed(0))
            } else {
                searchParams.delete("durationMin")
            }
            if (newValue[1] < 3) {
                searchParams.set("durationMax", (60 ** newValue[1]).toFixed(0))
            } else {
                searchParams.delete("durationMax")
            }
            return searchParams;
        });
    }

    const handleSearch = (searchField, e) => {
        if (e.key === "Enter") {
            submitSearch()
        } else {
            setSearchFieldValues(searchFieldValues => {
                searchFieldValues[searchField] = e.target.value
                return searchFieldValues
            })
        }
    }

    const submitSearch = () => {
        setSearchParams(searchParams => {
            for (let searchFieldValuesKey in searchFieldValues) {
                if (searchFieldValues[searchFieldValuesKey] !== "") {
                    searchParams.set(searchFieldValuesKey, searchFieldValues[searchFieldValuesKey])
                } else {
                    searchParams.delete(searchFieldValuesKey)
                }
            }
            return searchParams;
        });

    }

    const headers = [{
        searchField: "departureStationName", name: "Departure", size: 5
    }, {
        searchField: "returnStationName", name: "Return", size: 3
    }, {
        searchField: "duration", name: "Duration", size: 2
    }, {
        searchField: "distance", name: "Distance", size: 2
    },]

    return (
        <Grid container paddingX={4} spacing={4}>
            <Grid item xs={4}>
                <Paper sx={{p: 4}}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom
                                sx={{pb: 1}}>Search</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField id="departureSearch" label="Search for departure station" variant="outlined"
                                       fullWidth
                                       sx={{mb: 2}} onKeyUp={(e) => handleSearch("departureName", e)}/>
                            <TextField id="returnSearch" label="Search for return station" variant="outlined" fullWidth
                                       sx={{mb: 2}} onKeyUp={(e) => handleSearch("returnName", e)}/>
                            <TextField id="departureSearch" label="Search for departure or return station"
                                       variant="outlined"
                                       fullWidth sx={{mb: 0}} onKeyUp={(e) => handleSearch("eitherName", e)}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{height: '100%'}} onClick={submitSearch}><Search/></Button>
                        </Grid>
                    </Grid>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom
                                sx={{pt: 2}}>Filter</Typography>
                    <DurationSlider updateValue={handleDurationSliderChange}/>
                    <DistanceSlider updateValue={handleDistanceSliderChange}/>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper sx={{p: 4}}>
                    {journeys !== undefined && journeys.length > 0
                        ?
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
                            {journeys.map((journey) => <Journey key={journey.id}
                                                                journey={journey}
                                                                linkToDeparture={`/stations/${journey.departureStation.id}?page=0&itemsPerPage=30&sortField=capacity&sortOrder=asc`}
                                                                linkToReturn={`/stations/${journey.returnStation.id}?page=0&itemsPerPage=30&sortField=capacity&sortOrder=asc`}/>)}
                        </ListWithPagination>
                        :
                        <p>No journeys found</p>
                    }
                </Paper>
            </Grid>
        </Grid>
    )


}

export default JourneyList;