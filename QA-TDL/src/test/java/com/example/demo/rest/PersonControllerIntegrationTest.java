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

import com.example.demo.dto.PersonDto;
import com.example.demo.persistence.domain.Person;
import com.example.demo.persistence.domain.ToDoList;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
// SQL runs in order schema followed by data file
@Sql(scripts = { "classpath:person-schema.sql",
		"classpath:person-data.sql" }, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
@ActiveProfiles(profiles = "dev")
public class PersonControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper jsonifier;

	@Autowired
	private ModelMapper mapper;

	private PersonDto mapToDTO(Person person) {
		return this.mapper.map(person, PersonDto.class);
	}

	// This is the data we're giving it to use during the test
	List<ToDoList> tasks = new ArrayList<>();
	private final Person testPerson1 = new Person(1L,"Testing", tasks);
	private final Person testPerson2 = new Person(2L,"TestingAgain", tasks);
	private final Person testPerson3 = new Person(3L,"TestingYetAgain", tasks);


	// I also want to create a list of people that I can use later (? Come back to this)
	private final List<Person> LISTOFPEOPLE = List.of(testPerson1, testPerson2, testPerson3);

	private final String URI = "/person";

	// Create test
	@Test
	void createTest() throws Exception {
		List<ToDoList> tasks = new ArrayList<>();
		PersonDto testDTO = mapToDTO(new Person(1L,"Testing", tasks));
		String testDTOAsJSON = this.jsonifier.writeValueAsString(testDTO);

		RequestBuilder request = post(URI + "/create").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isCreated();

		PersonDto testSavedDTO = mapToDTO(new Person(1L, "Testing", tasks));
		testSavedDTO.setId(1L);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(testSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);


	}

	// Update test
	@Test
	void updateTest() throws Exception {
		List<ToDoList> tasks = new ArrayList<>();
		PersonDto testDTO = mapToDTO(new Person(1L,"Testing", tasks));
		String testDTOAsJSON = this.jsonifier.writeValueAsString(testDTO);

		RequestBuilder request = put(URI + "/update/1").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isAccepted();

		PersonDto testSavedDTO = mapToDTO(new Person(1L, "Testing", tasks));
		testSavedDTO.setId(1L);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(testSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);


	}
	
	// Read test
	@Test
	void updateReadOne() throws Exception {
		List<ToDoList> tasks = new ArrayList<>();
		PersonDto testDTO = mapToDTO(new Person(1L,"Testing", tasks));
		String testDTOAsJSON = this.jsonifier.writeValueAsString(testDTO);

		RequestBuilder request = get(URI + "/read/1").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isOk();

		PersonDto testSavedDTO = mapToDTO(new Person(1L,"Testing", tasks));
		testSavedDTO.setId(1L);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(testSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);


	}
	
	// Read All test
	@Test
	void updateReadAll() throws Exception {
		List<ToDoList> tasks = new ArrayList<>();
		PersonDto testDTO = mapToDTO(new Person(1L,"Testing", tasks));
		PersonDto testDTO2 = mapToDTO(new Person(2L,"TestingAgain", tasks));
		PersonDto testDTO3 = mapToDTO(new Person(3L, "TestingYetAgain", tasks));
		List<PersonDto> listDTO = new ArrayList<>();
		listDTO.add(testDTO);
		listDTO.add(testDTO2);
		listDTO.add(testDTO3);

		String testDTOAsJSON = this.jsonifier.writeValueAsString(listDTO);

		RequestBuilder request = get(URI + "/read").contentType(MediaType.APPLICATION_JSON).content(testDTOAsJSON);

		ResultMatcher checkStatus = status().isOk();

		PersonDto testSavedDTO = mapToDTO(new Person(1L,"Testing", tasks));
		PersonDto testSavedDTO2 = mapToDTO(new Person(2L,"TestingAgain", tasks));
		PersonDto testSavedDTO3 = mapToDTO(new Person(3L,"TestingYetAgain", tasks));
		List<PersonDto> listSavedDTO = new ArrayList<>();
		testSavedDTO.setId(1L);
		testSavedDTO2.setId(2L);
		testSavedDTO3.setId(3L);
		listSavedDTO.add(testSavedDTO);
		listSavedDTO.add(testSavedDTO2);
		listSavedDTO.add(testSavedDTO3);
		String testSavedDTOAsJSON = this.jsonifier.writeValueAsString(listSavedDTO);

		ResultMatcher checkBody = content().json(testSavedDTOAsJSON);

		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);


	}
	
	// Delete test
	@Test
	void deleteTest() throws Exception {

		RequestBuilder request = delete(URI + "/delete/1").contentType(MediaType.APPLICATION_JSON);

		ResultMatcher checkStatus = status().isNoContent();

		this.mvc.perform(request).andExpect(checkStatus);


	}
	
	

}