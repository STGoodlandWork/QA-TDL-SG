let id = document.getElementById("id-input");
let todoId = "";
id.addEventListener("input", (event) => {
  todoId = event.target.value;
});
let task = document.getElementById("task-input");
let todoTask = "";
task.addEventListener("input", (event) => {
  todoTask = event.target.value;
});

let createButton = document.getElementById("createButton");
let readButton = document.getElementById("readButton");
let readAllButton = document.getElementById("readAllButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");

createButton.onclick = async () => {
  await create(todoTask);
};
readButton.onclick = async () => {
  await readById(todoId);
};
readAllButton.onclick = async () => {
  await readAll();
};
updateButton.onclick = async () => {
  await updateById(todoId, todoTask);
};
deleteButton.onclick = async () => {
  await deleteById(todoId);
};

async function create(data) {
  let response = await fetch(`http://localhost:9092/person/create`, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `New task has been created!`;
}

async function readById(id) {
  let response = await fetch(`http://localhost:9092/person/read/${id}`, {
    method: "get",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
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
  let listItemName = `TASK : ${data.name}<br>`;
  let listItemTasks = [];
  if (data.tasks !== undefined) {
    for (let j = 0; j < data.tasks.length; j++) {
      let listItemTask = `<li>${data.tasks[j]}</li>`;
      listItemTasks.push(listItemTask);
    }
  }
  let listItem = `<li>${listItemId}${listItemName}${listItemTasks}<br><br></li>`;
  listItems.push(listItem);
  let unorderedList = `<ul>${listItems.join("")}</ul>`;
  div.innerHTML = unorderedList;
}

async function readAll() {
  let response = await fetch(`http://localhost:9092/person/read`, {
    method: "get",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
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
  for (let i = 0; i < data.length; i++) {
    let data_i = data[i];
    let listItemId = `ID : ${data_i.id}<br>`;
    let listItemName = `TASK : ${data_i.name}<br>`;
    let listItemTasks = [];
    if (data_i.tasks !== undefined) {
      for (let j = 0; j < data_i.tasks.length; j++) {
        let listItemTask = `<li>${data_i.tasks[j]}</li>`;
        listItemTasks.push(listItemTask);
      }
    }
    let listItem = `<li>${listItemId}${listItemName}${listItemTasks}<br><br></li>`;
    listItems.push(listItem);
  }
  let unorderedList = `<ul>${listItems.join("")}</ul>`;
  div.innerHTML = unorderedList;
}

async function updateById(id, data) {
  let response = await fetch(`http://localhost:9092/person/update/${id}`, {
    method: "put",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
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
  div.innerText = `${id} has been updated!`;
}

async function deleteById(id) {
  let response = await fetch(`http://localhost:9092/person/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    console.log(
      `Looks like there was a problem. Status Code: ${response.status}`
    );
    return;
  }

  let div = document.getElementById("myDiv");
  div.innerText = `${id} has been deleted!`;
}
