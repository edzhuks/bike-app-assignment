package com.assignment.bikeapp.repositories;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.entities.Station;
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

}
