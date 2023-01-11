package com.assignment.bikeapp.repositories;


import com.assignment.bikeapp.entities.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
}
