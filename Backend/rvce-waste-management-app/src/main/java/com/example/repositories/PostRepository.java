package com.example.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.models.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
	public List<Post> findByFullName(String fullName);
}
