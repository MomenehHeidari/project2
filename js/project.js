 // URL  
 const url = "http://localhost:3000";

 //Select DOM Elements
 const formElement = document.querySelector("#todo-form");
 const inputEl = document.querySelector("#input-task");
 const ulListEl = document.querySelector("#task-list");

 const addTaskBtnEl = document.querySelector("#add-task-btn");
 const todoSubmitEditEl = document.querySelector(".todo-submit-edit");

 const ulListDoneEl = document.querySelector("#done-list");
 const doneItemsEl = document.querySelector("#doneitems");

 inputEl.focus();

 //CRUD ToDoList
 //create Items in todo List api
 const createElement = async function (x) {
   const data = {
     title: `${x}`,
   };
   const response = await fetch(url + "/toDoList", {
     method: "POST",
     body: JSON.stringify(data),
     headers: {
       "Content-type": "application/json",
     },
   });
 };

 //get items in todo list
 const getElement = async function () {
   const response = await fetch(url + "/toDoList");
   const items = await response.json();
   for (const item of items) {
     const liElement = document.createElement("li");
     liElement.innerHTML = `<span class='input-task-span'>${item.title}</span>
     <div><img src="../img/icons8-done-24.png" class="icons8-done" id="${item.id}">
     <img src="../img/icons8-close-50.png" class="icons8-close" id="${item.id}">
     <img src="../img/icons8-edit-32.png" class="icons8-edit" id="${item.id}"></div>`;
     ulListEl.append(liElement);
     inputEl.value = "";
   }
 };

 formElement.addEventListener("submit", function (e) {
   e.preventDefault();
   const inputTaskValue = inputEl.value.trim();
   if (inputEl.value.trim()) {
     createElement(inputTaskValue);
   } else {
     alert("Please Enter Something!");
   }
 });

 getElement();

 //delete items from todo list api
 const deleteToDoItems = async function (idTitle) {
   const response = await fetch(url + `/toDoList/${idTitle}`, {
     method: "DELETE",
   });
 };

 formElement.addEventListener("click", function (e) {
   if (e.target.classList.contains("icons8-close")) {
     const deleteConfirm = confirm("Do You Want to Delete item?");
     if (deleteConfirm) {
       const id = e.target.id;
       deleteToDoItems(id);
     }
   }
 });

 //edit Itemes in todo list api
 //get single item
 const getSingleitem = async function (id) {
   const response = await fetch(url + `/toDoList/${id}`);
   const items = await response.json();
   inputEl.value = items.title;
 };

 formElement.addEventListener("click", function (e) {
   if (e.target.classList.contains("icons8-edit")) {
     const id = e.target.id;
     getSingleitem(id);
     addTaskBtnEl.style.display = "none";
     todoSubmitEditEl.style.display = "flex";
     todoSubmitEditEl.id = id;
   }
 });

 const editToDoItems = async function (idTitle) {
   const data = {
     title: inputEl.value.trim(),
   };
   if (inputEl.value.trim()) {
     const response = await fetch(url + `/toDoList/${idTitle}`, {
       method: "PATCH",
       body: JSON.stringify(data),
       headers: {
         "Content-type": "application/json",
       },
     });
   } else {
     alert("you cant let box empty!");
   }
 };

 todoSubmitEditEl.addEventListener("click", function () {
   editToDoItems(this.id);
 });

 //transfer items from todo list to Done list
 //create Items in todo List
 const createDoneElement = async function (id) {
   const responseToDo = await fetch(url + `/toDoList/${id}`);
   const itemsDone = await responseToDo.json();
   const data = {
     title: `${itemsDone.title}`,
   };
   const response = await fetch(url + `/doneList/`, {
     method: "POST",
     body: JSON.stringify(data),
     headers: {
       "Content-type": "application/json",
     },
   });
 };

 //get
 const getElementFromTodo = async function () {
   const response = await fetch(url + `/doneList/`);
   const itemsDone = await response.json();
   for (const task of itemsDone) {
     const liElement = document.createElement("li");
     liElement.innerHTML = `<span class='input-task-span'>${task.title}</span>
     <div><img src="../img/icons8-close-50.png" class="icons8-close" id="${task.id}">
     <img src='../img/icons8-undo-alt-48.png' class="icons8-undo" id="${task.id}"></div>`;
     ulListDoneEl.append(liElement);
   }
 };

 formElement.addEventListener("click", function (e) {
   if (e.target.classList.contains("icons8-done")) {
     const titleDone = e.target.id;
     createDoneElement(titleDone);
   }
 });

 getElementFromTodo();

 formElement.addEventListener("click", function (e) {
   if (e.target.classList.contains("icons8-done")) {
     const titleDone = e.target.id;
     deleteToDoItems(titleDone);
   }
 });

 //undo from done List to todo List
 //create Items in todo List
 const createDoneFromTodo = async function (id) {
   const responseToDo = await fetch(url + `/doneList/${id}`);
   const itemsDone = await responseToDo.json();
   const data = {
     title: `${itemsDone.title}`,
   };
   const response = await fetch(url + `/toDoList/`, {
     method: "POST",
     body: JSON.stringify(data),
     headers: {
       "Content-type": "application/json",
     },
   });
 };

 doneItemsEl.addEventListener("click", function (e) {
   if (e.target.classList.contains("icons8-undo")) {
     const titleDoneItem = e.target.id;
     createDoneFromTodo(titleDoneItem);
   }
 });

 doneItemsEl.addEventListener("click", function (e) {
   if (e.target.classList.contains("icons8-undo")) {
     const titleDone = e.target.id;
     deleteDoneItems(titleDone);
   }
 });

 //delete items from done list
 const deleteDoneItems = async function (idTitle) {
   const response = await fetch(url + `/doneList/${idTitle}`, {
     method: "DELETE",
   });
 };

 doneItemsEl.addEventListener("click", function (e) {
   if (e.target.classList.contains("icons8-close")) {
     const deleteConfirm = confirm("Do You Want to Delete item?");
     if (deleteConfirm) {
       const id = e.target.id;
       deleteDoneItems(id);
     }
   }
 });