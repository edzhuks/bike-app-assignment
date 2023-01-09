package com.assignment.bikeapp.entities;

import jakarta.persistence.*;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
public class Journey {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    /**Departure date and time, precision to seconds**/
    private Timestamp departure_time;
    /**Return date and time, precision to seconds**/
    private Timestamp return_time;


    /**Departure station, saved as ID in the database**/
    @ManyToOne
    @JoinColumn(name = "departure_station", referencedColumnName = "id")
    private Station departure_station;
    /**Return station, saved as ID in the database**/
    @ManyToOne
    @JoinColumn(name = "return_station", referencedColumnName = "id")
    private Station return_station;

    /**Distance covered in the journey, in meters**/
    private int distance;
    /**Duration of the journey, in seconds**/
    private int duration;

    public Journey() {
    }

    public Journey(Timestamp departure_time, Timestamp return_time, Station departure_station, Station return_station, int distance, int duration) {
        this.departure_time = departure_time;
        this.return_time = return_time;
        this.departure_station = departure_station;
        this.return_station = return_station;
        this.distance = distance;
        this.duration = duration;
    }

    public Timestamp getDeparture_time() {
        return departure_time;
    }

    public void setDeparture_time(Timestamp departure_time) {
        this.departure_time = departure_time;
    }

    public Timestamp getReturn_time() {
        return return_time;
    }

    public void setReturn_time(Timestamp return_time) {
        this.return_time = return_time;
    }

    public Station getDeparture_station() {
        return departure_station;
    }

    public void setDeparture_station(Station departure_station) {
        this.departure_station = departure_station;
    }

    public Station getReturn_station() {
        return return_station;
    }

    public void setReturn_station(Station return_station) {
        this.return_station = return_station;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public boolean isValid() {
        return distance >= 10 && duration >= 10;
    }
}
