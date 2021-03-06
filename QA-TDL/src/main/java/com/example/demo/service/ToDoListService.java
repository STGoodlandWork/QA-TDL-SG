package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ToDoListDto;
import com.example.demo.exceptions.ToDoListNotFoundException;
import com.example.demo.persistence.domain.ToDoList;
import com.example.demo.persistence.repo.ToDoListRepo;
import com.example.demo.util.SpringBeanUtil;

@Service
public class ToDoListService {

	// this is where our business logic will happen

    // this is also where CRUD logic will take place.

	// implements are crud functionality
	private ToDoListRepo repo;

	// makes object mapping easy by automatically determining how one object model
	// maps to another.
	private ModelMapper mapper;

	// we create our mapToDto

	private ToDoListDto mapToDTO(ToDoList toDoList) {
		return this.mapper.map(toDoList, ToDoListDto.class);
	}

	@Autowired
	public ToDoListService(ToDoListRepo repo, ModelMapper mapper) {
		this.repo = repo;
		this.mapper = mapper;
	}

	// Create
	public ToDoListDto create(ToDoList toDoList) {
		return this.mapToDTO(this.repo.save(toDoList));
	}

	// read all method
	public List<ToDoListDto> readAll() {
		return this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
		// stream - returns a sequential stream considering collection as its source
		// map - used to map each element to its corresponding result
		// :: - for each e.g. Random random = new Random();
		// random.ints().limit(10).forEach(System.out::println);
		// Collectors - used to return a list or string
	}

	// read one method
	public ToDoListDto readOne(Long id) {
		return this.mapToDTO(this.repo.findById(id).orElseThrow(ToDoListNotFoundException::new));
	}

	// update
	public ToDoListDto update(ToDoListDto toDoListDto, Long id) {
		// check if record exists
		ToDoList toUpdate = this.repo.findById(id).orElseThrow(ToDoListNotFoundException::new);
		// set the record to update
		toUpdate.setName(toDoListDto.getName());
		// check update for any nulls
		SpringBeanUtil.mergeNotNull(toDoListDto, toUpdate);
		// retun the method from repo
		return this.mapToDTO(this.repo.save(toUpdate));

	}

	// what happenes when you try to merge null stuff?

	// Delete
	public boolean delete(Long id) {
		this.repo.deleteById(id);// true
		return !this.repo.existsById(id);// true
	}

}
