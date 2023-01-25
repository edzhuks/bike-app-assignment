package com.assignment.bikeapp.repositories;


import com.assignment.bikeapp.entities.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StationRepository extends JpaRepository<Station, Long> {
    @Query(value = """
            select count(j.id) as c, r.*
            from station r, station d, journey j
            where j.return_station = r.id
            and j.departure_station = d.id
            and d.id=?1
            group by j.return_station
            order by c desc
            limit 5;""", nativeQuery = true)
    List<Station> get5MostPopularDestinationsFrom(long id);

    @Query(value = """
            select count(j.id) as c, d.*
            from station r, station d, journey j
            where j.return_station = r.id
            and j.departure_station = d.id
            and r.id=?1
            group by j.departure_station
            order by c desc
            limit 5;""", nativeQuery = true)
    List<Station> get5MostPopularDepartureStationsTo(long id);

}
