package com.example.demo.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.example.demo.dto.ToDoListDto;
import com.example.demo.persistence.domain.ToDoList;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
// SQL runs in order schema followed by data file
@Sql(scripts = { "classpath:person-schema.sql",
		"classpath:person-data.sql" }, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
@ActiveProfiles(profiles = "dev")
public class ToDoListControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper jsonifier;

	@Autowired
	private ModelMapper mapper;

	private ToDoListDto mapToDTO(ToDoList toDoList) {
		return this.mapper.map(toDoList, ToDoListDto.class);
	}

	// This is the data we're giving it to use during the test
	private final ToDoList testToDoList1 = new ToDoList(1L,"Testing");
	private final ToDoList testToDoList2 = new ToDoList(2L,"TestingAgain");
	private final ToDoList testToDoList3 = new ToDoList(3L,"TestingYetAgain");


	// I also want to create a list of people that I can use later (? Come back to this)
	private final List<ToDoList> LISTOFTODOS = List.of(testToDoList1, testToDoList2, testToDoList3);

	private final String URI = "/todolist";

	// Create test
	@Test
	void createTest() throws Exception {
		ToDoListDto testDTO = mapToDTO(new ToDoList(1L,"Testing"));
		String testDTOAsJSON = this.jsonifier.writeValueAsString(testDTO);

		RequestBuilder request = post(URI + "/create").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isCreated();

		ToDoListDto testSavedDTO = mapToDTO(new ToDoList(1L, "Testing"));
		testSavedDTO.setId(1L);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(testSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);


	}

	// Update test
	@Test
	void updateTest() throws Exception {
		ToDoListDto testDTO = mapToDTO(new ToDoList(1L,"Testing"));
		String testDTOAsJSON = this.jsonifier.writeValueAsString(testDTO);

		RequestBuilder request = put(URI + "/update/1").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isAccepted();

		ToDoListDto testSavedDTO = mapToDTO(new ToDoList(1L, "Testing"));
		testSavedDTO.setId(1L);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(testSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);


	}
	
	// Read test
	@Test
	void updateReadOne() throws Exception {
		ToDoListDto testDTO = mapToDTO(new ToDoList(1L,"Testing"));
		String testDTOAsJSON = this.jsonifier.writeValueAsString(testDTO);

		RequestBuilder request = get(URI + "/read/1").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isOk();

		ToDoListDto testSavedDTO = mapToDTO(new ToDoList(1L,"Testing"));
		testSavedDTO.setId(1L);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(testSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);


	}
	
	// Read All test
	@Test
	void updateReadAll() throws Exception {
		ToDoListDto testDTO = mapToDTO(new ToDoList(1L,"Testing"));
		ToDoListDto testDTO2 = mapToDTO(new ToDoList(2L,"TestingAgain"));
		ToDoListDto testDTO3 = mapToDTO(new ToDoList(3L, "TestingYetAgain"));
		List<ToDoListDto> listDTO = new ArrayList<>();
		listDTO.add(testDTO);
		listDTO.add(testDTO2);
		listDTO.add(testDTO3);

		String testDTOAsJSON = this.jsonifier.writeValueAsString(listDTO);

		RequestBuilder request = get(URI + "/read").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isOk();

		ToDoListDto testSavedDTO = mapToDTO(new ToDoList(1L,"Testing"));
		ToDoListDto testSavedDTO2 = mapToDTO(new ToDoList(2L,"TestingAgain"));
		ToDoListDto testSavedDTO3 = mapToDTO(new ToDoList(3L,"TestingYetAgain"));
		List<ToDoListDto> listSavedDTO = new ArrayList<>();
		testSavedDTO.setId(1L);
		testSavedDTO2.setId(2L);
		testSavedDTO3.setId(3L);
		listSavedDTO.add(testSavedDTO);
		listSavedDTO.add(testSavedDTO2);
		listSavedDTO.add(testSavedDTO3);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(listSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);

//		this.mvc.perform(post(URI + "/create").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON))
//				.andExpect(status().isCreated()).andExpect(content().json(testSavedDTOAsJSON));
	}
	
	// Delete test
	@Test
	void deleteTest() throws Exception {

		RequestBuilder request = delete(URI + "/delete/1").contentType(MediaType.APPLICATION_JSON);

		ResultMatcher checkStatus = status().isNoContent();

		this.mvc.perform(request).andExpect(checkStatus);


	}
	
	
////	// Read Name test
////	@Test
////	void testFindName() throws Exception {
////		ToDoListDto testDTO = mapToDTO(new ToDoList(1L,"Testing"));
////		String testDTOAsJSON = this.jsonifier.writeValueAsString(testDTO);
////		List<ToDoListDto> listDTO = new ArrayList<>();
////		listDTO.add(testDTO);
////
////		RequestBuilder request = get(URI + "/findByName/Testing").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);
////
////		ResultMatcher checkStatus = status().isOk();
////
////		ToDoListDto testSavedDTO = mapToDTO(new ToDoList(1L,"Testing"));
////		testSavedDTO.setId(1L);
////		List<ToDoListDto> listSavedDTO = new ArrayList<>();
////		listSavedDTO.add(testSavedDTO);
////		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(listSavedDTO);
////
////		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);
////
////		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);
//
////		this.mvc.perform(post(URI + "/create").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON))
////				.andExpect(status().isCreated()).andExpect(content().json(testSavedDTOAsJSON));
////	}
}