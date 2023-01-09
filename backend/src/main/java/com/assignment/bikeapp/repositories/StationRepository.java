package com.assignment.bikeapp.repositories;


import com.assignment.bikeapp.entities.Station;
import org.springframework.data.repository.CrudRepository;

public interface StationRepository extends CrudRepository<Station, Long> {
    Station getById(long departure_station_id);
}
