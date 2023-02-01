package com.assignment.bikeapp.controllers;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.entities.Station;
import com.assignment.bikeapp.services.JourneyService;
import com.assignment.bikeapp.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class StationController {

    @Autowired
    StationService stationService;
    @Autowired
    JourneyService journeyService;

    @GetMapping(path = "/api/stations")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getSomeStations(@RequestParam int page, @RequestParam int itemsPerPage, @RequestParam String sortField, @RequestParam String sortOrder){
        Page<Station> journeyPage= stationService.getSomeStations(page, itemsPerPage, sortField, sortOrder.equals("asc"));
        Map<String, Object> response = new HashMap<>();
        response.put("stations", journeyPage.getContent());
        response.put("pageCount", journeyPage.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/api/stations/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> setStationInfo(@PathVariable Long id){
        Optional<Station> station = stationService.getStationById(id);
        if(station.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Map<String, Object> response = new HashMap<>();
        int journeysFromStation = journeyService.getJourneysFromStation(id);
        int journeysToStation = journeyService.getJourneysToStation(id);
        Double averageDistanceOfJourneyFromStation = journeyService.getAverageDistanceOfJourneyFromStation(id);
        Double averageDistanceOfJourneyToStation = journeyService.getAverageDistanceOfJourneyToStation(id);
        Double averageDurationOfJourneyFromStation = journeyService.getAverageDurationOfJourneyFromStation(id);
        Double averageDurationOfJourneyToStation = journeyService.getAverageDurationOfJourneyToStation(id);
        List<Station> popularDestinations = stationService.get5MostPopularDestinationsFrom(id);
        List<Station> popularSources = stationService.get5MostPopularDepartureStationsTo(id);
        response.put("station", station.get());
        response.put("journeysFromStation", journeysFromStation);
        response.put("journeysToStation", journeysToStation);
        response.put("averageDistanceFrom", averageDistanceOfJourneyFromStation);
        response.put("averageDistanceTo", averageDistanceOfJourneyToStation);
        response.put("averageDurationFrom", averageDurationOfJourneyFromStation);
        response.put("averageDurationTo", averageDurationOfJourneyToStation);
        response.put("popularDestinations", popularDestinations);
        response.put("popularSources", popularSources);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
