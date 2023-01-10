package com.assignment.bikeapp.controllers;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.services.JourneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping(path = "/journey")
public class JourneyController {

    @Autowired
    JourneyService journeyService;

    @GetMapping(path = "/list")
    public ResponseEntity<List<Journey>> getSomeJourneys(@RequestParam int page, @RequestParam int itemsPerPage, @RequestParam String sortField, @RequestParam String sortOrder){
        return ResponseEntity.status(HttpStatus.OK).body(journeyService.getSomeJourneys(page, itemsPerPage, sortField, sortOrder.equals("asc")));
    }

}
