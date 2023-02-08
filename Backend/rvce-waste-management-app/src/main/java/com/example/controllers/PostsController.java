package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Post;
import com.example.models.User;
import com.example.services.PostService;
import com.example.services.UserService;

import java.util.Map;

@RestController
public class PostsController {

	@Autowired
	PostService postService;
	@Autowired
	UserService userService;
	
	@CrossOrigin(value = "http://localhost:3000")
	@PostMapping("/post/create/user/{userMailId}")
	ResponseEntity<Object> createPost(@RequestHeader(value = "sessionId") String sessionId, @PathVariable String userMailId, @RequestBody Post post) {
		if (sessionId == null)
			return ResponseEntity.status(HttpStatusCode.valueOf(400)).body("Bad Request");
		if (userService.validateUser(sessionId,userMailId)) {
			User user = userService.findUserBySessionId(sessionId);
			if(user == null)
				return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("User not found");
			else 
				post.setFullName(user.getFullName());
			return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(postService.createPost(post));
		}
		else
			return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("User not found");
	}


	@CrossOrigin(value = "http://localhost:3000")
	@PostMapping("/post/calc")
	ResponseEntity<Object> calculate(@RequestBody Map<String, Object> calc) {
		return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(postService.calculate(calc));
	}


	
	@CrossOrigin(value = "http://localhost:3000")
	@GetMapping("/posts")
	ResponseEntity<Object> getAllPosts() {
		return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(postService.getAllPosts());
	}
	
	@CrossOrigin(value = "http://localhost:3000")
	@GetMapping("/posts/user/{userMailId}")
	ResponseEntity<Object> getAllPostsByUserMailId(@RequestHeader(value = "sessionId") String sessionId, @PathVariable String userMailId) {
		if (sessionId == null)
			return ResponseEntity.status(HttpStatusCode.valueOf(400)).body("Bad Request");
		if (userService.validateUser(sessionId, userMailId))
			return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(postService.getAllPostsByUserMailId(userMailId));
		else
			return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("User not found");
	}
	
	@CrossOrigin(value = "http://localhost:3000")
	@DeleteMapping("/posts/{id}/user/{userMailId}")
	ResponseEntity<Object> deletePostByPostId(@RequestHeader(value = "sessionId") String sessionId, @PathVariable String id, @PathVariable String userMailId) throws Exception {
		if (sessionId == null)
			return ResponseEntity.status(HttpStatusCode.valueOf(400)).body("Bad Request");
		if (userService.validateUser(sessionId, userMailId)) {
			postService.deletePostByPostId(id);
			return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("Post with postId " + id + " deleted");
		}
		else
			return ResponseEntity.status(HttpStatusCode.valueOf(404)).body("User not found");
	}
}
