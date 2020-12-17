let id = document.getElementById("id-input");
let personId = "";
id.addEventListener("input", (event) => {
  personId = event.target.value;
});

let _name = document.getElementById("name-input");
let personName = "";
_name.addEventListener("input", (event) => {
  personName = event.target.value;
});

let task = document.getElementById("task-input");
let taskName = "";
task.addEventListener("input", (event) => {
  taskName = event.target.value;
});

let createButton = document.getElementById("createPersonButton");
let createTaskButton = document.getElementById("createTaskButton");
let readButton = document.getElementById("readButton");
let readAllButton = document.getElementById("readAllButton");
let updatePersonButton = document.getElementById("updatePersonButton");
let updateTaskButton = document.getElementById("updateTaskButton");
let deletePersonButton = document.getElementById("deletePersonButton");
let deleteTaskButton = document.getElementById("deleteTaskButton");

createButton.onclick = async () => {
  await createPerson(personName);
};
createTaskButton.onclick = async () => {
  await createTask(personId, taskName);
};
readButton.onclick = async () => {
  await readByPersonId(personId);
};
readAllButton.onclick = async () => {
  await readAllPeople();
};
updatePersonButton.onclick = async () => {
  await updateByPersonId(personId, personName);
};
updateTaskButton.onclick = async () => {
  await updateByTaskId(personId, taskName);
};
deletePersonButton.onclick = async () => {
  await deleteByPersonId(personId, personName);
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

async function createTask(personId, taskName) {
  let personIdInt = parseInt(personId);
  console.log(personId);
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
  console.log(taskName, personId);
  let div = document.getElementById("myDiv");
  div.innerText = `New task has been added!`;
}

async function readByPersonId(id) {
  let response = await fetch(`http://localhost:9092/person/read/${id}`, {
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
  let listItems = [];
  let listItemId = `ID : ${data.id}<br>`;
  let listItemName = `NAME : ${data.name}<br>`;
  let listItemTasks = `TASKS: ${data.tasks}<br>`;

  let listItem = `<li>${listItemId}${listItemName}${listItemTasks}<br><br></li>`;
  listItems.push(listItem);
  let unorderedList = `<ul>${listItems.join("")}</ul>`;
  div.innerHTML = unorderedList;
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
  div.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i].task.length != 0) {
      var entry = `<tr>
                  <td> PERSON ID : ${data_i.id}</td>
                  <td> NAME : ${data_i.name}</td>                  
                  </tr>`;
      div.innerHTML += entry;
      console.log(entry);

      let listItemId = `PERSON ID : ${data_i.id}<br>`;
      let listItemName = `NAME : ${data_i.name}<br>`;
      let listItemTasks = `TASKS: ${data_i.tasks}<br>`;
    }
    if (data_i.tasks !== undefined) {
      for (let j = 0; j < data_i.tasks.length; j++) {
        //let listItemTask = `<li>${data_i.tasks[j].name}</li>`;
        console.log(data_i.task_j.name);
        console.log(data_i.name);
        console.log(task[j].name);
        //listItemTasks.push(listItemTask);
        var entry = `
                  <tr>
                  <td>${data_i.id}</td>
                  <td>${data_i.name}</td>
                  <td>${data_i.task[j].name}</td>
                  </tr>
                  console.log(${data_i.task[j].name});
                    `;
        div.innerHTML += entry;
        console.log(entry);
      }
    }
  }
}

async function updateByPersonId(id, data) {
  let response = await fetch(`http://localhost:9092/person/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json ",
    },
    body: JSON.stringify({ name: data }),
  });

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `Entry with Person Id ${id} has been updated!`;
}

async function deleteByPersonId(id) {
  let response = await fetch(`http://localhost:9092/person/delete/${id}`, {
    method: "DELETE",
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

  let div = document.getElementById("myDiv");
  div.innerText = `Entry with Person Id ${id} has been deleted!`;
}
