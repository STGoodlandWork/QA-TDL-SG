package com.example.demo.persistence.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // classes that represent tables in our DB
@Data
@NoArgsConstructor
public class ToDoList {

	// default constructor
	// all args constructor
	// getters
	// setters
	// toString
	// equals and hasCode

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String name;

	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;

	public ToDoList(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public ToDoList(String name) {
		this.name = name;
	}

}
