import StationListItem from "./StationListItem";
import {Divider, Grid, Paper, Typography} from "@mui/material";
import ListWithPagination from "./ListWithPagination";
import {Outlet, useLoaderData, useSearchParams, useOutlet} from "react-router-dom";
import ListHeader from "./ListHeader";
import {MapContainer, TileLayer} from "react-leaflet";


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

    const outlet = useOutlet()

    let {pageCount, stations} = useLoaderData()

    let [searchParams, setSearchParams] = useSearchParams();

    const handleItemCountChange = (selectedOption) => {
        setSearchParams(searchParams => {
            searchParams.set("page", 0);
            searchParams.set("itemsPerPage", selectedOption.props.value);
            return searchParams
        })
    };

    const handlePageChange = (value) => {
        setSearchParams(searchParams => {
            searchParams.set("page", value - 1);
            return searchParams
        })
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
            return searchParams
        })
    };

    const headers = [{
        searchField: "nameFI", name: "Name", size: 3
    }, {
        searchField: "addressFI", name: "Address", size: 4
    }, {
        searchField: "cityFI", name: "City", size: 2
    }, {
        searchField: "operator", name: "Operator", size: 2
    }, {
        searchField: "capacity", name: "Cap.", size: 1
    },]

    return (
        <Grid container>
            <Grid item xs={6} paddingX={4}>
                <Paper sx={{p: 4}}>
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
                        {stations.map((station) => <StationListItem key={station.id}
                                                                    station={station}
                                                                    linkTo={`/stations/${station.id}?${searchParams}`}/>)}
                    </ListWithPagination>
                </Paper>
            </Grid>
            <Grid item xs={6} paddingRight={5}>
                {outlet ? <Outlet/> :
                    <>
                        <Paper sx={{p: 4, height: 380, justifyContent: "center", display: "flex"}}>
                            <Typography sx={{position: "relative", top: "43%"}}>Select a station</Typography>
                        </Paper>
                        <Paper sx={{p: 4, mt: 4}}>
                            <MapContainer style={{height: 400, width: '100%'}}
                                          center={[60.1699, 24.9384]} // Helsinki
                                          zoom={13}
                                          scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />


                            </MapContainer>
                        </Paper>
                    </>
                }
            </Grid>
        </Grid>
    )


}

export default StationList;