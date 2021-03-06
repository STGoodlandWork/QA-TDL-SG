package com.example.demo.persistence.domain;

import java.util.List;
import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // classes that represent tables in our DB
@Data
@NoArgsConstructor
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;

	@NotNull
	public String name;

	@OneToMany(mappedBy = "person", fetch = FetchType.EAGER)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ToDoList> tasks;
	
	public Person(Long id, String name, List<ToDoList> tasks) {
		this.id = id;
		this.name = name;
		this.tasks = tasks;
	}


	public Person(String name, List<ToDoList> tasks) {
		this.name = name;
		this.tasks = tasks;
	}

}
