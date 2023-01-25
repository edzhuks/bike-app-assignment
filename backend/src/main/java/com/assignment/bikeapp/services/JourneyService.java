package com.assignment.bikeapp.services;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.repositories.JourneyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JourneyService {

    @Autowired
    JourneyRepository journeyRepository;

    public Page<Journey> getSomeJourneys(int page, int itemsPerPage, String sortField, boolean ascending){
        Pageable journeyPage = PageRequest.of(page, itemsPerPage, Sort.by(ascending? Sort.Direction.ASC : Sort.Direction.DESC, sortField));
        return journeyRepository.findAll(journeyPage);
    }

    public int getJourneysFromStation(long stationId){
        return journeyRepository.countJourneyByDepartureStationId(stationId);
    }

    public int getJourneysToStation(long stationId){
        return journeyRepository.countJourneyByReturnStationId(stationId);
    }

    public Double getAverageDistanceOfJourneyFromStation(long stationId){
        return journeyRepository.averageDistanceOfJourneyFromStation(stationId);
    }

    public Double getAverageDistanceOfJourneyToStation(long stationId){
        return journeyRepository.averageDistanceOfJourneyToStation(stationId);
    }

    public Double getAverageDurationOfJourneyFromStation(long stationId){
        return journeyRepository.averageDurationOfJourneyFromStation(stationId);
    }

    public Double getAverageDurationOfJourneyToStation(long stationId){
        return journeyRepository.averageDurationOfJourneyToStation(stationId);
    }
}
