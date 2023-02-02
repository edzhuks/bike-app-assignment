package com.assignment.bikeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
public class BikeappApplication implements ErrorController {

	public static void main(String[] args) {
		SpringApplication.run(BikeappApplication.class, args);
	}


	private static final String PATH = "/error";

	@RequestMapping(value = PATH)
	public String error() {
		return "forward:/index.html";
	}

//	@Override
//	public String getErrorPath() {
//		return PATH;
//	}
}