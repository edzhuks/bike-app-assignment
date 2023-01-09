package com.assignment.bikeapp.entities;

import jakarta.persistence.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

@Entity
public class Station {
    @Id
    protected Long id;

    /**
     * Station name in Finnish
     **/
    @Column(name = "name_fi", nullable = false)
    private String nameFI;
    /**
     * Station name in Swedish
     **/
    @Column(name = "name_se", nullable = false)
    private String nameSE;
    /**
     * Station name in English
     **/
    @Column(name = "name_en", nullable = true)
    private String nameEN;
    /**
     * Station address in Finnish
     **/
    @Column(name = "address_fi", nullable = false)
    private String addressFI;
    /**
     * Station address in Swedish
     **/
    @Column(name = "address_se", nullable = false)
    private String addressSE;
    /**
     * City in which the station is located, in Finnish
     **/
    @Column(name = "city_fi", nullable = true)
    private String cityFI;
    /**
     * City in which the station is located, in Swedish
     **/
    @Column(name = "city_se", nullable = true)
    private String citySE;
    /**
     * Bike station operator
     **/
    private String operator;
    /**
     * Bike capacity of the station
     **/
    private int capacity;
    /**
     * longitude of the station, x in the dataset, around 24.9 for Helsinki
     **/
    private double longitude;
    /**
     * latitude of the station, y in the dataset, around 60.1 for Helsinki
     **/
    private double latitude;

    public Station() {
    }

    public Station(Long id, String nameFI, String nameSE, String nameEN, String addressFI, String addressSE, String cityFI, String citySE, String operator, int capacity, double longitude, double latitude) {
        this.id = id;
        this.nameFI = nameFI;
        this.nameSE = nameSE;
        this.nameEN = nameEN;
        this.addressFI = addressFI;
        this.addressSE = addressSE;
        this.cityFI = cityFI;
        this.citySE = citySE;
        this.operator = operator;
        this.capacity = capacity;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public String getNameFI() {
        return nameFI;
    }

    public void setNameFI(String nameFI) {
        this.nameFI = nameFI;
    }

    public String getNameSE() {
        return nameSE;
    }

    public void setNameSE(String nameSE) {
        this.nameSE = nameSE;
    }

    public String getNameEN() {
        return nameEN;
    }

    public void setNameEN(String nameEN) {
        this.nameEN = nameEN;
    }

    public String getAddressFI() {
        return addressFI;
    }

    public void setAddressFI(String addressFI) {
        this.addressFI = addressFI;
    }

    public String getAddressSE() {
        return addressSE;
    }

    public void setAddressSE(String addressSE) {
        this.addressSE = addressSE;
    }

    public String getCityFI() {
        return cityFI;
    }

    public void setCityFI(String cityFI) {
        this.cityFI = cityFI;
    }

    public String getCitySE() {
        return citySE;
    }

    public void setCitySE(String citySE) {
        this.citySE = citySE;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }


}
