package com.assignment.bikeapp.controllers;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.services.JourneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class JourneyController {

    @Autowired
    JourneyService journeyService;

    @GetMapping(path = "/api/journeys")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getSomeJourneys(@RequestParam int page,
                                                               @RequestParam int itemsPerPage,
                                                               @RequestParam String sortField,
                                                               @RequestParam String sortOrder,
                                                               @RequestParam(required = false) String departureName,
                                                               @RequestParam(required = false) String returnName,
                                                               @RequestParam(required = false) String eitherName,
                                                               @RequestParam(required = false) Integer distanceMin,
                                                               @RequestParam(required = false) Integer distanceMax,
                                                               @RequestParam(required = false) Integer durationMin,
                                                               @RequestParam(required = false) Integer durationMax){
        Page<Journey> journeyPage= journeyService.getSomeJourneysWithFilter(page, itemsPerPage, sortField,
                sortOrder.equals("asc"), departureName, returnName, eitherName,
                distanceMin, distanceMax, durationMin, durationMax);
        Map<String, Object> response = new HashMap<>();
        response.put("journeys", journeyPage.getContent());
        response.put("pageCount", journeyPage.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
