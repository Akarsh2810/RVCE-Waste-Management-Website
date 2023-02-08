package com.example.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.User;
import com.example.repositories.UserRepository;

@Service
public class UserService {

	private String emailIdPattern = "^(.+)@(\\S+)$";

	@Autowired
	UserRepository userRepository;
	
	public User createUser(String fullName, String userMailId, String password) throws Exception {
		if (!patternMatches(userMailId, emailIdPattern))
			throw new Exception("Not a valid mailId, please enter a valid mailId!");
		if (!userMailId.contains("@rvce.edu.in"))
			throw new Exception("Not a valid mailId, please enter RVCE mailId only!");
		String sessionId = UUID.randomUUID().toString();
		User user = new User();
		user.setFullName(fullName);
		user.setUserMailId(userMailId);
		user.setPassword(password);
		user.setSessionId(sessionId);
		return userRepository.save(user);
	}
	
	public User loginUser(User user) throws NoSuchElementException {
		List<User> users = userRepository.findByUserMailId(user.getUserMailId());
		if (users.isEmpty())
			throw new NoSuchElementException("User not found");
		User savedUser = users.get(0);
		if (!savedUser.getPassword().equals(user.getPassword()))
			throw new NoSuchElementException("Password Incorrect");
		String sessionId = UUID.randomUUID().toString();
		savedUser.setSessionId(sessionId);
		return userRepository.save(savedUser);
	}
	
	
	public User logoutUser(String sessionId) throws NoSuchElementException {
		List<User> users = userRepository.findBySessionId(sessionId);
		if (users.isEmpty()) throw new NoSuchElementException("User not found");
		User user = users.get(0);
		user.setSessionId(null);
		return userRepository.save(user);
	}
	
	private boolean patternMatches(String emailAddress, String regexPattern) {
		return Pattern.compile(regexPattern).matcher(emailAddress).matches();
	}
	
	public Boolean validateUser(String sessionId, String userMailId) {
		List<User> users = userRepository.findBySessionId(sessionId);
		if (!users.isEmpty()) {
			User user = users.get(0);
			if(user.getUserMailId().equals(userMailId))
				return true;
		}
		return false;
	}
	
	public Boolean findUserByMailId(String emailId) {
		List<User> users = userRepository.findByUserMailId(emailId);
		if (!users.isEmpty())
			return true;
		return false;
	}
	public User findUserBySessionId(String sessionId) {
		List<User> users = userRepository.findBySessionId(sessionId);
		if (!users.isEmpty())
			return users.get(0);
		return null;
	}
}
