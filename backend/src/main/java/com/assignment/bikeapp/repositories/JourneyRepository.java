package com.assignment.bikeapp.repositories;

import com.assignment.bikeapp.entities.Journey;
import org.springframework.data.repository.CrudRepository;

public interface JourneyRepository extends CrudRepository<Journey, Long> {
}
