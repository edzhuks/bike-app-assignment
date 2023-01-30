package com.assignment.bikeapp.services;

import com.assignment.bikeapp.entities.Journey;
import com.assignment.bikeapp.entities.Station;
import com.assignment.bikeapp.repositories.JourneyRepository;
import com.assignment.bikeapp.repositories.StationRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class CSVService {
    @Autowired
    StationRepository stationRepository;
    @Autowired
    JourneyRepository journeyRepository;

    public void saveStations(MultipartFile file){
        try {
            List<Station> stations = csvToStationList(file.getInputStream());
            stationRepository.saveAll(stations);
        } catch (IOException e) {
            throw new RuntimeException("Could not save stations: " + e.getMessage());
        }
    }

    public void saveJourneys(MultipartFile file){
        try {
            List<Journey> journeys = csvToJourneyList(file.getInputStream());
            journeyRepository.saveAll(journeys);
        } catch (IOException e) {
            throw new RuntimeException("Could not save journeys: " + e.getMessage());
        }
    }

    public Station stationFromCSV(CSVRecord csvRecord) {
        return new Station(
                Long.parseLong(csvRecord.get("ID")),
                csvRecord.get("Nimi"),
                csvRecord.get("Namn"),
                csvRecord.get("Name"),
                csvRecord.get("Osoite"),
                csvRecord.get("Adress"),
                csvRecord.get("Kaupunki"),
                csvRecord.get("Stad"),
                csvRecord.get("Operaattor"),
                Integer.parseInt(csvRecord.get("Kapasiteet")),
                Double.parseDouble(csvRecord.get("x")),
                Double.parseDouble(csvRecord.get("y"))
        );
    }

    public Journey journeyFromCSV(CSVRecord csvRecord) {
        return new Journey(
                Timestamp.valueOf(csvRecord.get(0).replace('T', ' ')),
                Timestamp.valueOf(csvRecord.get("Return").replace('T', ' ')),
                stationRepository.getById(Long.parseLong(csvRecord.get("Departure station id"))),
                csvRecord.get("Departure station name"),
                stationRepository.getById(Long.parseLong(csvRecord.get("Return station id"))),
                csvRecord.get("Return station name"),
                Double.valueOf(csvRecord.get("Covered distance (m)")).intValue(),
                Double.valueOf(csvRecord.get("Duration (sec.)")).intValue()
                );
    }


    public List<Station> csvToStationList(InputStream inputStream) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        ) {
            Iterable<CSVRecord> records = CSVFormat.EXCEL.withFirstRecordAsHeader().parse(fileReader);
            List<Station> stations = new ArrayList<>();
            for (CSVRecord record : records) {
                Station station = stationFromCSV(record);
                stations.add(station);
            }
            return stations;
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse stations from CSV: " + e.getMessage());
        }
    }

    public List<Journey> csvToJourneyList(InputStream inputStream) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        ) {
            Iterable<CSVRecord> records = CSVFormat.EXCEL.withFirstRecordAsHeader().parse(fileReader);
            List<Journey> journeys = new ArrayList<>();
            for (CSVRecord record : records) {
                if(stationRepository.findById(Long.parseLong(record.get("Departure station id"))).isEmpty()){
                    Station s = stationRepository.save(new Station(Long.parseLong(  record.get("Departure station id")),
                                                                                    record.get("Departure station name")));
                }
                if(stationRepository.findById(Long.parseLong(record.get("Return station id"))).isEmpty()){
                    Station s = stationRepository.save(new Station(Long.parseLong(  record.get("Return station id")),
                                                                                    record.get("Return station name")));
                }
                Journey journey = journeyFromCSV(record);
                if (journey.isValid()) {
                    journeys.add(journey);
                }
            }
            return journeys;
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse stations from CSV: " + e.getMessage());
        }
    }
}
