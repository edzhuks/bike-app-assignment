package com.assignment.bikeapp.repositories;

import com.assignment.bikeapp.entities.Journey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface JourneyRepository extends JpaRepository<Journey, Long> {
}
