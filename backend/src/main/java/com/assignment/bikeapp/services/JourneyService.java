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

    public Page<Journey> getSomeJourneysWithFilter(int page,
                                                   int itemsPerPage,
                                                   String sortField,
                                                   boolean ascending,
                                                   String departureName,
                                                   String returnName,
                                                   String eitherName,
                                                   Integer distanceMin,
                                                   Integer distanceMax,
                                                   Integer durationMin,
                                                   Integer durationMax) {
        Pageable journeyPage = PageRequest.of(page, itemsPerPage, Sort.by(ascending ? Sort.Direction.ASC : Sort.Direction.DESC, sortField));
        if (departureName == null && returnName == null && eitherName == null && distanceMin == null &&
                distanceMax == null && durationMin == null && durationMax == null)  // no sorting or filtering - faster
            return getSomeJourneys(page, itemsPerPage, sortField, ascending);
        if (eitherName==null)                                                       // using departure and return station name for search
            return journeyRepository.findAllByDepartureStationNameIsLikeAndReturnStationNameIsLikeAndDistanceBetweenAndDurationBetween(journeyPage, "%" + (departureName==null?"":departureName) + "%", "%" + (returnName==null?"":returnName) + "%", distanceMin == null ? 0 : distanceMin, distanceMax == null ? Integer.MAX_VALUE : distanceMax, durationMin == null ? 0 : durationMin, durationMax == null ? Integer.MAX_VALUE : durationMax);
                                                                                    // using eitherName for search
        return journeyRepository.findAllByDepartureStationNameIsLikeAndDistanceBetweenAndDurationBetweenOrReturnStationNameIsLikeAndDistanceBetweenAndDurationBetween(journeyPage, "%" + eitherName + "%", distanceMin == null ? 0 : distanceMin, distanceMax == null ? Integer.MAX_VALUE : distanceMax, durationMin == null ? 0 : durationMin, durationMax == null ? Integer.MAX_VALUE : durationMax, "%" + eitherName + "%", distanceMin == null ? 0 : distanceMin, distanceMax == null ? Integer.MAX_VALUE : distanceMax, durationMin == null ? 0 : durationMin, durationMax == null ? Integer.MAX_VALUE : durationMax);
    }

    public Page<Journey> getSomeJourneys(int page, int itemsPerPage, String sortField, boolean ascending) {
        Pageable journeyPage = PageRequest.of(page, itemsPerPage, Sort.by(ascending ? Sort.Direction.ASC : Sort.Direction.DESC, sortField));
        return journeyRepository.findAll(journeyPage);
    }

    public int getJourneysFromStation(long stationId) {
        return journeyRepository.countJourneyByDepartureStationId(stationId);
    }

    public int getJourneysToStation(long stationId) {
        return journeyRepository.countJourneyByReturnStationId(stationId);
    }

    public Double getAverageDistanceOfJourneyFromStation(long stationId) {
        return journeyRepository.averageDistanceOfJourneyFromStation(stationId);
    }

    public Double getAverageDistanceOfJourneyToStation(long stationId) {
        return journeyRepository.averageDistanceOfJourneyToStation(stationId);
    }

    public Double getAverageDurationOfJourneyFromStation(long stationId) {
        return journeyRepository.averageDurationOfJourneyFromStation(stationId);
    }

    public Double getAverageDurationOfJourneyToStation(long stationId) {
        return journeyRepository.averageDurationOfJourneyToStation(stationId);
    }
}
