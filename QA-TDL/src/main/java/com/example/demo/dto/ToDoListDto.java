package com.example.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToDoListDto {

	private Long id;
	private String name;
	// this will spit out JSON
}
