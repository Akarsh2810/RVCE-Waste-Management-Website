package com.example.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.User;
import com.example.utils.DemoApplicationConstants;
import com.example.services.UserService;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@CrossOrigin(value = "http://localhost:3000")
	@PostMapping("/user/create")
	ResponseEntity<Object> createUser(@RequestParam String fullName, @RequestParam String emailId, @RequestParam String password) throws Exception {
		if (userService.findUserByMailId(emailId))
			return ResponseEntity.status(HttpStatusCode.valueOf(403)).body(
					"User already exists with mail " + emailId);
		User user = null;
		try {
			user = userService.createUser(fullName, emailId, password);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatusCode.valueOf(403)).body(e.getLocalizedMessage());
		}
		Map<String, Object> result = new HashMap<>();
		result.put("user", user);
		return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(result);
	}
	
	@CrossOrigin(value = "http://localhost:3000")
	@PostMapping("/user/login")
	ResponseEntity<Object> loginUser(@RequestBody User user) {
		User loggedInUser = null;
		try {
			loggedInUser = userService.loginUser(user);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(e.getLocalizedMessage());
		}

		Map<String, Object> result = new HashMap<>();
		result.put("user", loggedInUser);
		return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(result);
	}
	
	@CrossOrigin(value = "http://localhost:3000")
	@PostMapping("/user/{userMailId}/logout")
	ResponseEntity<Object> logoutUser(@RequestHeader(value = "sessionId") String sessionId, @PathVariable String userMailId) {
		if (sessionId == null)
			return ResponseEntity.status(HttpStatusCode.valueOf(400)).body("Bad Request");
		try {
			if (Boolean.TRUE.equals(userService.validateUser(sessionId, userMailId))) {
				userService.logoutUser(sessionId);
				return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(true);
			}
			return ResponseEntity.status(HttpStatusCode.valueOf(400)).body(false);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(e.getLocalizedMessage());
		}

	}
}
