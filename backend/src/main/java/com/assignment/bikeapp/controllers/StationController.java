package com.assignment.bikeapp.controllers;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.entities.Station;
import com.assignment.bikeapp.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path = "/station")
public class StationController {

    @Autowired
    StationService stationService;

    @GetMapping(path = "/list")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getSomeStations(@RequestParam int page, @RequestParam int itemsPerPage, @RequestParam String sortField, @RequestParam String sortOrder){
        Page<Station> journeyPage= stationService.getSomeStations(page, itemsPerPage, sortField, sortOrder.equals("asc"));
        Map<String, Object> response = new HashMap<>();
        response.put("stations", journeyPage.getContent());
        response.put("pageCount", journeyPage.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
