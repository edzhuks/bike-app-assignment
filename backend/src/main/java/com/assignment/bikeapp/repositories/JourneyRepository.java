package com.assignment.bikeapp.repositories;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.entities.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface JourneyRepository extends JpaRepository<Journey, Long> {

    int countJourneyByDepartureStationId(long id);
    int countJourneyByReturnStationId(long id);

    @Query(value = "select avg(j.distance) from Journey j where j.departure_station = ?1", nativeQuery = true)
    Double  averageDistanceOfJourneyFromStation(long id);
    @Query(value = "select avg(j.distance) from Journey j where j.return_station = ?1", nativeQuery = true)
    Double  averageDistanceOfJourneyToStation(long id);

    @Query(value = "select avg(j.duration) from Journey j where j.departure_station = ?1", nativeQuery = true)
    Double averageDurationOfJourneyFromStation(long id);
    @Query(value = "select avg(j.duration) from Journey j where j.return_station = ?1", nativeQuery = true)
    Double averageDurationOfJourneyToStation(long id);

    /**
     * Search journey by departure and return station name. Filter by duration and/or distance
     * @return journeys that fit the parameters, limited to itemsPerPage.
     */
    Page<Journey> findAllByDepartureStationNameIsLikeAndReturnStationNameIsLikeAndDistanceBetweenAndDurationBetween(Pageable pageable, String departureName, String returnName, int distanceMin, int distanceMax, int durationMin, int durationMax);

    /**
     * Search journey by departure or return station name. Filter by duration and/or distance.
     * All parameters are duplicated because of limitations in automated queries.
     * @return journeys that fit the parameters, limited to itemsPerPage.
     */
    Page<Journey> findAllByDepartureStationNameIsLikeAndDistanceBetweenAndDurationBetweenOrReturnStationNameIsLikeAndDistanceBetweenAndDurationBetween(Pageable pageable, String eitherName, int distanceMin, int distanceMax, int durationMin, int durationMax, String eitherName2, int distanceMin2, int distanceMax2, int durationMin2, int durationMax2);


}
