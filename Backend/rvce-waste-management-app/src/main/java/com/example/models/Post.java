package com.example.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Post {
	@Id
	private String id;
	private String fullName;
	private String postStatement;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getPostStatement() {
		return postStatement;
	}
	public void setPostStatement(String postStatement) {
		this.postStatement = postStatement;
	}
}
