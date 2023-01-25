package com.assignment.bikeapp.services;

import com.assignment.bikeapp.entities.Station;
import com.assignment.bikeapp.repositories.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StationService {

    @Autowired
    StationRepository stationRepository;


    public Page<Station> getSomeStations(int page, int itemsPerPage, String sortField, boolean ascending){
        Pageable stationPage = PageRequest.of(page, itemsPerPage, Sort.by(ascending? Sort.Direction.ASC : Sort.Direction.DESC, sortField));
        return stationRepository.findAll(stationPage);
    }

    public Optional<Station> getStationById(Long id){
        return stationRepository.findById(id);
    }

    public List<Station> get5MostPopularDestinationsFrom(long stationId){
        return stationRepository.get5MostPopularDestinationsFrom(stationId);
    }

    public List<Station> get5MostPopularDepartureStationsTo(long stationId){
        return stationRepository.get5MostPopularDepartureStationsTo(stationId);
    }

}
