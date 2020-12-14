let id = document.getElementById("input");
let todo = "";
id.addEventListener("input", (event) => {
  todo = event.target.value;
});

let createButton = document.getElementById("createButton");
let readButton = document.getElementById("readButton");
let readAllButton = document.getElementById("readAllButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");

createButton.onclick = async () => {
  await create(todo);
};
readButton.onclick = async () => {
  await readById(todo);
};
readAllButton.onclick = async () => {
  await readAll();
};
updateButton.onclick = async () => {
  await updateAll(todo);
};
deleteButton.onclick = async () => {
  await deleteById(todo);
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
  let response = await fetch(`http://localhost:9092/person/read/${id}`);

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
  let listItemTasks = [];
  if (data.tasks !== undefined) {
    for (let j = 0; j < data.tasks.length; j++) {
      let listItemTask = `<li>${data.tasks[j]}</li>`;
      listItemTasks.push(listItemTask);
    }
    listItemTasks = `TASKS : <ul>${listItemTasks.join("")}</ul>`;
  }
  let listItem = `<li>${listItemId}${listItemName}${listItemTasks}<br><br></li>`;
  listItems.push(listItem);
  let unorderedList = `<ul>${listItems.join("")}</ul>`;
  div.innerHTML = unorderedList;
}

async function readAll() {
  let response = await fetch(`http://localhost:9092/person/read`);

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
    let listItemName = `NAME : ${data_i.name}<br>`;
    let listItemTasks = [];
    if (data_i.tasks !== undefined) {
      for (let j = 0; j < data_i.tasks.length; j++) {
        let listItemTask = `<li>${data_i.tasks[j]}</li>`;
        listItemTasks.push(listItemTask);
      }
      listItemTasks = `TASKS : <ul>${listItemTasks.join("")}</ul>`;
    }
    let listItem = `<li>${listItemId}${listItemName}${listItemTasks}<br><br></li>`;
    listItems.push(listItem);
  }
  let unorderedList = `<ul>${listItems.join("")}</ul>`;
  div.innerHTML = unorderedList;
}

async function updateById(id) {
  let response = await fetch(`http://localhost:9092/person/update/${id}`, {
    method: "update",
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
