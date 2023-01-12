package com.assignment.bikeapp.entities;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Journey {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    /**Departure date and time, precision to seconds**/
    private Timestamp departureTime;
    /**Return date and time, precision to seconds**/
    private Timestamp returnTime;


    /**Departure station, saved as ID in the database**/
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "departure_station", referencedColumnName = "id")
    private Station departureStation;
    /**Return station, saved as ID in the database**/
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "return_station", referencedColumnName = "id")
    private Station returnStation;

    /**Distance covered in the journey, in meters**/
    private int distance;
    /**Duration of the journey, in seconds**/
    private int duration;

    public Journey() {
    }

    public Journey(Timestamp departure_time, Timestamp return_time, Station departure_station, Station return_station, int distance, int duration) {
        this.departureTime = departure_time;
        this.returnTime = return_time;
        this.departureStation = departure_station;
        this.returnStation = return_station;
        this.distance = distance;
        this.duration = duration;
    }

    public Timestamp getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Timestamp departure_time) {
        this.departureTime = departure_time;
    }

    public Timestamp getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(Timestamp return_time) {
        this.returnTime = return_time;
    }

    public Station getDepartureStation() {
        return departureStation;
    }

    public void setDepartureStation(Station departure_station) {
        this.departureStation = departure_station;
    }

    public Station getReturnStation() {
        return returnStation;
    }

    public void setReturnStation(Station return_station) {
        this.returnStation = return_station;
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
