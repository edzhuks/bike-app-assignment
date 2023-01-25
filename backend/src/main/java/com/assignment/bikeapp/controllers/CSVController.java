package com.assignment.bikeapp.controllers;

import com.assignment.bikeapp.services.CSVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class CSVController {

    @Autowired
    CSVService csvService;

    @PostMapping(path = "/stations/csv")
    public ResponseEntity<String> uploadStationCSV(@RequestParam("file") MultipartFile file) {

        try {
            csvService.saveStations(file);
            return ResponseEntity.status(HttpStatus.OK).body("Uploaded station data succesfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not upload file. Error: " + e.getMessage());
        }

    }

    @PostMapping(path = "/journeys/csv")
    public ResponseEntity<String> uploadJourneyCSV(@RequestParam("file") MultipartFile file) {

        try {
            csvService.saveJourneys(file);
            return ResponseEntity.status(HttpStatus.OK).body("Uploaded journey data succesfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not upload file. Error: " + e.getMessage());
        }

    }

}
