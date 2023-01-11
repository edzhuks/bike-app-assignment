package com.assignment.bikeapp.services;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.entities.Station;
import com.assignment.bikeapp.repositories.JourneyRepository;
import com.assignment.bikeapp.repositories.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    StationRepository stationRepository;

    public Page<Station> getSomeStations(int page, int itemsPerPage, String sortField, boolean ascending){
        Pageable stationPage = PageRequest.of(page, itemsPerPage, Sort.by(ascending? Sort.Direction.ASC : Sort.Direction.DESC, sortField));
        return stationRepository.findAll(stationPage);
    }

}
