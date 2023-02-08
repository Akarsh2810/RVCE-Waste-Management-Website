package com.example.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.models.User;
@Repository
public interface UserRepository extends MongoRepository<User, String> {
	public List<User> findBySessionId(String sessionId);
	public List<User> findByUserMailId(String userMailId);
}
