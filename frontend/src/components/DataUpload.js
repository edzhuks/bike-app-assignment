import {Button, Container, Grid, List, ListItem, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {baseUrl} from "../services/baseAddress";
const stationHeaders = ["FID","ID","Nimi","Namn","Name","Osoite","Adress","Kaupunki","Stad","Operaattor","Kapasiteet","x","y"]
const journeyHeaders = ["Departure","Return","Departure station id","Departure station name","Return station id","Return station name","Covered distance (m)","Duration (sec.)"]
const FileData = ({selectedFile, upload, headers, loading, setLoading}) => {

    const [badFile, setBadFile] = useState(false)
    useEffect(() => {
        console.log(selectedFile)
        if (selectedFile !== null) {
            const reader = new FileReader();
            reader.readAsText(selectedFile, "UTF-8 BOM");
            reader.onload = function (evt) {
                console.log(evt.target.result.split('\r\n')[0].split(','))
                if(JSON.stringify(evt.target.result.split('\r\n')[0].split(','))===JSON.stringify(headers)
                || JSON.stringify(evt.target.result.split('\n')[0].split(','))===JSON.stringify(headers)){
                    setBadFile(false)
                } else {
                    setBadFile(true)
                }
            }
            reader.onerror = function (evt) {
                setBadFile(true)
            }
        }
    },[selectedFile])

    if (selectedFile) {
        if (selectedFile.name.split('.').length > 1 && selectedFile.name.split('.').pop() === "csv" && !badFile) {

            return (
                <div>
                    <Typography sx={{mt:2}} variant="body1" component="p">{selectedFile.name}</Typography>
                    <LoadingButton loading={loading} sx={{mt:2}} variant="contained" onClick={upload}>Upload</LoadingButton>
                </div>
            )
        } else {
            return (
                <div>
                    <Typography sx={{pt:2}} component="p" variant="body1">Please choose a .csv file with headers</Typography>
                    <List dense>
                        {headers.map(header =>{
                        return <ListItem key={header}>{header}</ListItem>})}
                    </List>
                </div>
            );
        }
    }
};

const DataUpload = ({uploadableItemName, headers}) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const [uploaded, setUploaded] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFileChoice = (e) => {
        setSelectedFile(e.target.files[0])
        setUploaded(false)
        setLoading(false)
    }

    const upload = () => {
        setLoading(true)
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file
        console.log(selectedFile);

        fetch(`${baseUrl}${uploadableItemName}s/csv`, {method:'POST', body:formData})
            .then((res) => {
                console.log(res)
                setUploaded(true)
                setLoading(false)
            })

    }
    return(
        <Grid item xs={6} paddingX={4}>
            <Paper sx={{p: 4}}>
                <Typography component="h2" variant="h6" color="primary" marginBottom={2}>Upload {uploadableItemName} data</Typography>
                <Button variant="outlined" component="label">
                    Choose file
                    <input type="file" hidden onChange={handleFileChoice}/>
                </Button>
                {uploaded?
                    <Typography component="p" variant="body1" sx={{mt:2}}>Uploading done</Typography>:
                    <FileData selectedFile={selectedFile} headers={headers} upload={upload} loading={loading} setLoading={setLoading}/>}
            </Paper>
        </Grid>
    )
}

const DataUploadPage = () => {

    return (
        <Container>
            <Grid container>
                <DataUpload uploadableItemName="station" headers={stationHeaders}/>
                <DataUpload uploadableItemName="journey" headers={journeyHeaders}/>
            </Grid>
        </Container>
    )
}

export default DataUploadPage