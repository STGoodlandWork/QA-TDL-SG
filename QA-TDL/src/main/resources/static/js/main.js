let idElement = document.getElementById("id-input");
let personId = "";
idElement.addEventListener("input", (event) => {
  personId = event.target.value;
});

let nameElement = document.getElementById("name-input");
let personName = "";
nameElement.addEventListener("input", (event) => {
  personName = event.target.value;
});

let taskIdElement = document.getElementById("task-id-input");
let taskId = "";
taskIdElement.addEventListener("input", (event) => {
  taskId = event.target.value;
});

let taskNameElement = document.getElementById("task-name-input");
let taskName = "";
taskNameElement.addEventListener("input", (event) => {
  taskName = event.target.value;
});

let createButton = document.getElementById("createPersonButton");
let readButton = document.getElementById("readButton");
let readAllButton = document.getElementById("readAllButton");
let updatePersonButton = document.getElementById("updatePersonButton");
let deletePersonButton = document.getElementById("deletePersonButton");

let createTaskButton = document.getElementById("createTaskButton");
let updateTaskButton = document.getElementById("updateTaskButton");
let deleteTaskButton = document.getElementById("deleteTaskButton");

createButton.onclick = async () => {
  await createPerson(personName, taskName);
};
readButton.onclick = async () => {
  await readPersonById(personId);
};
readAllButton.onclick = async () => {
  await readAllPeople();
};
updatePersonButton.onclick = async () => {
  await updatePersonById(personId, personName);
};
deletePersonButton.onclick = async () => {
  await deletePersonById(personId);
};

createTaskButton.onclick = async () => {
  await createTask(personId, taskName);
};
updateTaskButton.onclick = async () => {
  await updateTaskById(taskId, taskName);
};
deleteTaskButton.onclick = async () => {
  await deleteTaskById(taskId);
};

async function createPerson(personName, taskName) {
  let response = await fetch(`http://localhost:9092/person/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json ",
    },
    body: JSON.stringify({ name: personName, tasks: [taskName] }),
  });

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `New name has been added!`;
}

async function readPersonById(personId) {
  let response = await fetch(`http://localhost:9092/person/read/${personId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json ",
    },
  });

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let data = await response.json();
  console.log(data);

  let div = document.getElementById("myDiv");
  let personID = `Person ID: ${data.id}<br>`;
  let personName = `Name: ${data.name}<br>`;
  let personTasks = [];

  for (let task of data.tasks) {
    personTasks.push(`(${task.id}: ${task.name})`);
  }

  personTasks = "Tasks: " + personTasks.join(", ") + "<br><br>";

  let listItem = `${personID}${personName}${personTasks}`;
  div.innerHTML = listItem;
}

async function readAllPeople() {
  let response = await fetch(`http://localhost:9092/person/read`, {
    method: "GET",
    headers: {
      "Content-type": "application/json ",
    },
  });

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let data = await response.json();
  console.log(data);

  let div = document.getElementById("myDiv");
  let people = [];

  for (let data_i of data) {
    let person = `Person ID: ${data_i.id}<br>Name: ${data_i.name}<br>Tasks: `;
    let task_strings = [];
    if (data_i.tasks !== undefined) {
      for (let task_j of data_i.tasks) {
        task_strings.push(`(${task_j.id}: ${task_j.name})`);
      }
    }
    person += task_strings.join(", ") + "<br><br>";
    people.push(person);
  }
  div.innerHTML = people.join("");
}

async function updatePersonById(personId, personName) {
  let response = await fetch(
    `http://localhost:9092/person/update/${personId}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json ",
      },
      body: JSON.stringify({ name: personName }),
    }
  );

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `Entry with Person ID ${personId} has been updated!`;
}

async function deletePersonById(personId) {
  let response = await fetch(
    `http://localhost:9092/person/delete/${personId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json ",
      },
    }
  );

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `Entry with Person ID ${personId} has been deleted!`;
}

async function createTask(personId, taskName) {
  let personIdInt = parseInt(personId);
  let response = await fetch(`http://localhost:9092/todolist/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json ",
    },
    body: JSON.stringify({
      name: taskName,
      person: {
        id: personIdInt,
      },
    }),
  });

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }
  let div = document.getElementById("myDiv");
  div.innerText = `New task has been added!`;
}

async function updateTaskById(taskId, taskName) {
  let response = await fetch(
    `http://localhost:9092/todolist/update/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json ",
      },
      body: JSON.stringify({ name: taskName }),
    }
  );

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `Entry with Task ID ${taskId} has been updated!`;
}

async function deleteTaskById(taskId) {
  let response = await fetch(
    `http://localhost:9092/todolist/delete/${taskId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json ",
      },
    }
  );

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `Entry with Task ID ${taskId} has been deleted!`;
}
