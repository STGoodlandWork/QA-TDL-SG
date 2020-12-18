# Practical Project Specification (SDET): To-Do List Web Application (TDL)


This project aimed to create an OOP-based web application, with utilisation of supporting tools, methodologies, 
and technologies, that encapsulates all fundamental and practical modules covered during training.
## Getting Started

This document will allow the user to run the project's software on 
their local machine for additional development, testing and use.

### Prerequisites

In order to launch the software you will require:
- Maven
- Spring Tool Suite
- JDK Version 11

### Installing

Below are a number of various way to run the project. 

## VIA SPRING TOOL SUITE

1. Open the project via File -> Open Projects from FIle System

2. Select "Directory" and navigate to where the file is stored.

3. Right-click the project folder and choose Run As -> Spring Boot App

## VIA CLONING THE REPOSITORY

1. Choose your preferred directory

2. Within it via Git Bash run 
```
git clone https://github.com/STGoodlandWork/QA-TDL-SG.git
```
## Running the tests

Integration testing was conducted via Spring. Static Analysis was conducted via SonarQube. 

### Integration Tests 
Integration Tests are used for testing on a larger scale, with the codebase 
working together more closely than unit testing. 
```

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
```




## Deployment

Please view the Documentation section within the repository for additional information. 

## Authors

* **Samuel Goodland** - [Sam Goodland](https://github.com/STGoodlandWork/)

## Acknowledgments

* CrazyHQ - Sanity Maintenance
