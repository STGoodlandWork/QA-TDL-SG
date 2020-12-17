package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.ToDoListDto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PersonDto {

	public Long id;
	public String name;
	private List<ToDoListDto> tasks;
	

}
